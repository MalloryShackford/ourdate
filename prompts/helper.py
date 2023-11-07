from .constants import FORMATTING_INSTRUCTION
import re


def extract_prompt_message(prompt_message):
    data = {
        'role': prompt_message.role,
        'content': prompt_message.content
    }
    return data

def clean_text(text):
    unwanted_chars = ['\n', '\r', '\t']
    cleaned_text = ''.join(' ' if char in unwanted_chars else char for char in text)
    return cleaned_text

def build_messages(prompt, dateplaninfo):
    params = {
        'vibe': dateplaninfo.vibe,
        'location': dateplaninfo.location,
        'budget': dateplaninfo.budget,
        'date': dateplaninfo.date,
        'time': dateplaninfo.time
    }

    messages = []
    index_of_template_message = 0
    for i in range(len(prompt.messages.all())):
        data = extract_prompt_message(prompt.messages.all()[i])
        data['content'] = clean_text(data['content'])
        
        expected_params = ['vibe', 'location', 'budget', 'date', 'time']
        pattern = r'\{(' + '|'.join(re.escape(param) for param in expected_params) + r')\}'
        matches = re.findall(pattern, data['content'])
        if len(matches) == 5:
            index_of_template_message = i
            formatted_content = data['content'].format(**params)
            data['content'] = formatted_content + FORMATTING_INSTRUCTION

        messages.append(data)
    
    return messages, index_of_template_message
