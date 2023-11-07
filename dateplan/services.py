import openai
import json
import logging
from django.conf import settings
from prompts.models import Prompt
from prompts.helper import build_messages
import requests

logger = logging.getLogger('django')

class GooglePlaceDetailsMissing(Exception):
    pass
    
def get_google_place(date):
    base_url = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"

    place = date.get('place')
    address = date.get('address')
    cityState = date.get('cityState')
    params = {
        'key': settings.GOOGLE_MAPS_API_KEY,
        'input': f'{place},{address},{cityState}', 
        'inputtype': 'textquery',
        'fields': 'place_id,photos',
    }
    result  = {'place_id': None, 'photo_ref': None}
    try:
        response = requests.get(base_url, params=params)
        data = response.json()
        if data['status'] == 'OK' and 'candidates' in data:
            candidate = data['candidates'][0]
            result['place_id'] = candidate['place_id']
            if 'photos' in candidate:
                result['photo_ref'] = candidate['photos'][0]['photo_reference']
            else:
                logger.warning("Photos not found for this place.")
            return result
            # result['photo_ref'] = candidate['photos'][0]['photo_reference']
            # return result
        else:
            logger.error("place_id and photo_reference not found. Check if the location details are correct.")
            raise GooglePlaceDetailsMissing("Google place details not found")
    except requests.RequestException as e:
        logger.error(f"Error while making the Google Places API request: {e}")
        return None

def get_place_details(place_id):
    base_url = 'https://maps.googleapis.com/maps/api/place/details/json'
    params = {
        'key': settings.GOOGLE_MAPS_API_KEY,
        'place_id': place_id,
        'fields': 'website,formatted_phone_number',
    }
    try:
        response = requests.get(base_url, params=params)
        data = response.json().get('result')
        return data
    except requests.RequestException as e:
        print(f"Error while making the Google Places API request: {e}")
        return None

# Configure the logging module to print error messages to the console
# logging.basicConfig(level=logging.ERROR)
# Create a logger
logger = logging.getLogger('django')
slack_logger = logging.getLogger('slack')
openai.api_key = settings.OPENAI_API_KEY

def generate_date_plan(dateplaninfo):
    all_active_prompts = Prompt.objects.filter(active=True)
    prompt = all_active_prompts.first()
    messages_array, index_of_template_message = build_messages(prompt, dateplaninfo)

    try:
        response = openai.ChatCompletion.create(
            model = prompt.model,
            messages = messages_array,
            max_tokens = prompt.max_tokens,
            temperature = float(prompt.temperature),
        )
        
        # logger.info(f"OpenAI Response: {response}")
        
        # Now parse the response into JSON format
        response_data = json.loads(response['choices'][0]['message']['content'].strip())
        # chatgpt does not always return consistent format of response
        # 1. {'dates' : [{}, {}]} 2. [{}, {}]. unify to the second option
        if 'dates' in response_data:
            response_data = response_data['dates']

        plans = []
        for plan in response_data: # plan is a {}
            try:
                google_place = get_google_place(plan)
                if google_place and google_place['place_id']:
                    plan['googlePlaceId'] = google_place['place_id']
                    plan['googlePlacePhotoRef'] = google_place['photo_ref']
                place_details = get_place_details(google_place['place_id'])
                if place_details:
                    plan['phoneNumber'] = place_details.get('formatted_phone_number', None)
                    plan['website'] = place_details.get('website', None)
            except GooglePlaceDetailsMissing:
                logger.warning("Regenerating date plan due to missing Google place details")
                return regenerate_date_plan(dateplaninfo)

            plans.append(plan)
        
        # generate_date_plan will be called in signals.py
        # and this result will be used to generate DatePlan objects
        plan = {
            'plans': plans,
            'ai_model' : prompt.model,
            'prompt': messages_array[index_of_template_message]['content']
        }
        return plan

    except Exception as e:
        logger.critical(f"Error while generating date plan: {str(e)}", exc_info=True)  # This will also log the traceback
        slack_logger.error(f":warning: {e}")
        return None
   
def regenerate_date_plan(dateplaninfo, retry_count=0):
    MAX_RETRIES = 2
    
    all_active_prompts = Prompt.objects.filter(active=True)
    prompt = all_active_prompts.first()
    messages_array, index_of_template_message = build_messages(prompt, dateplaninfo)

    try:
        response = openai.ChatCompletion.create(
            model = prompt.model,
            messages = messages_array,
            max_tokens = prompt.max_tokens,
            temperature = float(1),
        )
        
        # Now parse the response into JSON format
        response_data = json.loads(response['choices'][0]['message']['content'].strip())
        # chatgpt does not always return consistent format of response
        # 1. {'dates' : [{}, {}]} 2. [{}, {}]. unify to the second option
        if 'dates' in response_data:
            response_data = response_data['dates']

        plans = []
        for plan in response_data: # plan is a {}
            try:
                google_place = get_google_place(plan)
                if google_place and google_place['place_id']:
                    plan['googlePlaceId'] = google_place['place_id']
                    plan['googlePlacePhotoRef'] = google_place['photo_ref']
                place_details = get_place_details(google_place['place_id'])
                if place_details:
                    plan['phoneNumber'] = place_details.get('formatted_phone_number', None)
                    plan['website'] = place_details.get('website', None)
            except GooglePlaceDetailsMissing:
                logger.warning("Regenerated dateplan, missing GooglePlaceDetails")
                

            plans.append(plan)
            
        plans_valid = all(plan.get('googlePlaceId') for plan in plans)
        
        if not plans_valid and retry_count < MAX_RETRIES:
            logger.warning(f"Plans not valid on attempt {retry_count}. Retrying...")
            return regenerate_date_plan(dateplaninfo, retry_count + 1)
        
        plan = {
            'plans': plans,
            'ai_model' : prompt.model,
            'prompt': messages_array[index_of_template_message]['content']
        }
        return plan

    except Exception as e:
        logger.critical(f"Error while generating date plan: {str(e)}", exc_info=True)  # This will also log the traceback
        slack_logger.error(f":warning: {e}")
        return None
