FORMATTING_INSTRUCTION = "Format the response as a well-formatted JSON array of two dates, each containing the following details: \
    - place (name of the place) \
    - address (address of the place) \
    - cityState (city and state) \
    - description (description of the place) \
    - approximatedCost (approximated cost to spend in the number of dollar signs) \
    - openDateAndTime (the time that the place opens and closes on that specific day, formatted strictly with only the times) \
    - datePlanStart (the start time of this date plan mentioned previously, include the local timezone) \
    - datePlanEnd (the end time of this date plan, including any additional time you'd like to allocate, include the local timezone, and make sure to end the date before the place closes)\
    - socialMediaLink (link to the social media page related to the date plan idea, if available) \
    - transportationOptions (transportation options available to reach the date location) \
    - parkingOptions (specific parking options or details for the date location) \
    - nearbyAttractions (nearby attractions or points of interest during the date) \
    - bookingLink (a direct link to book the experience, such as OpenTable, Resy reservation page, or the official website for reservations)"

DEFAULT_PROMPT = "I am planning a date. Please plan two date options. Both dates \
    the vibe should be {vibe}, the location should be near {location}, my budget \
    is {budget}, the date is {date}, and the time is {time}. One of the date \
    plans should be a typical date in one's \
    comfort zone. The other date plans should be adventurous. \
    What is a good date place and location?"

DEFAULT_SYSTEM_MSG = "You are a helpful assistant."

PROMPT_HELP_TEXTS = {
    'model': 'Model used by the AI service.',
    'max_tokens': 'Token limits of the response from AI. Maximum 4097.',
    'temperature': 'Ranges from 0.0 to 1.0. Lower values for temperature result in more consistent outputs, while higher values generate more diverse and creative results.',
}

PROMPT_MSGS_HELP_TEXTS = {
    'order': 'The order of this message being passed in to the AI service. Must be a positive integer.',
    'content': 'The text of the message. e.g. You are a helpful assistant. If you are including parameters, please make sure they are wrapped in { } individually.',
}
