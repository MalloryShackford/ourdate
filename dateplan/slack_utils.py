import requests, json, logging


def send_to_slack(message):
    DATEPLAN_REVIEW_WEBHOOK = 'https://hooks.slack.com/services/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'

    payload = { 'text': message }
    response = requests.post(
        DATEPLAN_REVIEW_WEBHOOK, data=json.dumps(payload),
        headers={'Content-Type': 'application/json'}
    )
    if response.status_code != 200:
        raise ValueError(
            f"Request to Slack returned an error {response.status_code}, the response is:\n{response.text}"
        )
