from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import DatePlan, DatePlanInfo, DatePlanDetail
from .services import generate_date_plan
from .slack_utils import send_to_slack
import logging
import json
from django.db import transaction
import rollbar

logger = logging.getLogger('django')
slack_logger = logging.getLogger('slack')

from django.db import transaction

@receiver(post_save, sender=DatePlanInfo)
def create_date_plans(sender, instance, created, **kwargs):
    rollbar.report_message(f"Signal fired for instance {instance} after save.", "info")
    if created:
        transaction.on_commit(call_create_date_plans(instance, created))

def call_create_date_plans(instance, created):
    def wrapper():
        _create_date_plans(instance, created)
    return wrapper

def _create_date_plans(instance, created):
    
    try:
        if created:
            dateinfo = DatePlanInfo.objects.get(uuid=instance.uuid)
            if not dateinfo.uuid:
                rollbar.report_message("Detected empty or null UUID for dateplan", "warning")
                return
            dateplan = generate_date_plan(instance) # {'plans' : [{}, {}], 'ai_model': '', 'prompt': ''}
        
            if dateplan:
              for idea in dateplan['plans']: # idea = {}
                plan = DatePlan.objects.create(
                    ai_model = dateplan['ai_model'],
                    prompt = dateplan['prompt'],
                    status='UV' if idea['googlePlaceId'] else 'IN',
                    plan_info = instance,
                    user = instance.user,
                )
                planDetail = DatePlanDetail.objects.create(
                    date_plan = plan,
                    place = idea.get('place'),
                    address = idea.get('address'),
                    cityState = idea.get('cityState'),
                    description = idea.get('description'),
                    approximatedCost = idea.get('approximatedCost'),
                    openDateAndTime = idea.get('openDateAndTime'),
                    datePlanStart = idea.get('datePlanStart', None),
                    datePlanEnd = idea.get('datePlanEnd', None),
                    googlePlaceId = idea.get('googlePlaceId'),
                    googlePlacePhotoRef = idea.get('googlePlacePhotoRef'),
                    bookingLink = idea.get('bookingLink', None),
                    phoneNumber = idea.get('phoneNumber', None),
                    website = idea.get('website', None),
                    socialMediaLink = idea.get('socialMediaLink', None),
                    transportationOptions = idea.get('transportationOptions', None),
                    parkingOptions = idea.get('parkingOptions', None),
                    nearbyAttractions = idea.get('nearbyAttractions', None),
                )
                
                # send message via slackbot on every dateplan created
                plan_url = f"https://api.gurufox.ai/admin/dateplan/dateplan/{plan.uuid}/change/"
                send_to_slack(f"New date plan created: {plan_url}")
        else:
            logger.error("Invalid or empty date_plan data received.")
            slack_logger.error(":x: Invalid or empty date_plan data received.")

    except Exception as e:
        logger.error(f"Error while processing plan: {idea}. Exception: {e}")
        slack_logger.error(":x: Invalid or empty date_plan data received.")