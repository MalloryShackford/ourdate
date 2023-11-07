import logging
import json
import requests


class SlackHandler(logging.Handler):
    
    def emit(self, record):
        API_ERRORS_WEBHOOK = 'https://hooks.slack.com/services/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'

        try:
            log_entry = self.format(record)
            payload = { 'text': log_entry }

            response = requests.post(
                API_ERRORS_WEBHOOK,
                data=json.dumps(payload),
                headers={ 'Content-Type': 'application/json' }
            )
            if response.status_code != 200:
                raise ValueError(f"Request to Slack returned an error {response.status_code}, the response is:\n{response.text}")
        except Exception as e:
            # pass  # Handle exceptions here
            print(f"Error in SlackHandler: {str(e)}")