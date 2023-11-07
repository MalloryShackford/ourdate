import time
import os
import stripe
import dotenv
import requests
import simplejson as json

webhook_payload = ("""
{
  "id": "evt_1O7JjiJ83XLvJcVcrK9uEKn3",
  "object": "event",
  "api_version": "2023-08-16",
  "created": 1698765609,
  "data": {
    "object": {
      "id": "cus_OvA3kNXgEGbV6v",
      "object": "customer",
      "address": {
        "city": null,
        "country": "US",
        "line1": null,
        "line2": null,
        "postal_code": "01778",
        "state": null
      },
      "balance": 0,
      "created": 1698765608,
      "currency": "usd",
      "default_source": null,
      "delinquent": false,
      "description": null,
      "discount": null,
      "email": "mallory.shackford@gmail.com",
      "invoice_prefix": "9AD6B2A6",
      "invoice_settings": {
        "custom_fields": null,
        "default_payment_method": null,
        "footer": null,
        "rendering_options": null
      },
      "livemode": true,
      "metadata": {
      },
      "name": "Mallory Shackford",
      "next_invoice_sequence": 2,
      "phone": null,
      "preferred_locales": [
        "en-US"
      ],
      "shipping": null,
      "tax_exempt": "none",
      "test_clock": null
    },
    "previous_attributes": {
      "currency": null
    }
  },
  "livemode": true,
  "pending_webhooks": 1,
  "request": {
    "id": null,
    "idempotency_key": null
  },
  "type": "customer.updated"
}""")

webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
url = "http://localhost:8000/subscription/stripe-webhook/"

def generate_header(**kwargs):
    timestamp = kwargs.get("timestamp", int(time.time()))
    payload = kwargs.get("payload", webhook_payload)
    secret = kwargs.get("secret", webhook_secret)
    scheme = kwargs.get("scheme", stripe.WebhookSignature.EXPECTED_SCHEME)
    signature = kwargs.get("signature", None)
    if signature is None:
        payload_to_sign = "%d.%s" % (timestamp, payload)
        signature = stripe.WebhookSignature._compute_signature(
            payload_to_sign, secret
        )
    header = "t=%d,%s=%s" % (timestamp, scheme, signature)
    return header

header = generate_header()

event = stripe.Webhook.construct_event(webhook_payload, header, webhook_secret)



data = webhook_payload
headers = {'Content-Type': 'application/json', "Stripe-Signature": header}
r = requests.post(url, headers=headers, data=json.dumps(data))
print(r)
obj_vars = vars(r)
print(obj_vars)
