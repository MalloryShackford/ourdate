from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
from stripe.error import StripeError
from .models import Payment
from payment.serializer import PaymentSerializer
import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST


stripe.api_key = settings.STRIPE_SECRET_KEY
STRIPE_PAYMENT_PRICE = os.getenv("STRIPE_PAYMENT_PRICE")
if not STRIPE_PAYMENT_PRICE:
    raise ValueError("STRIPE_PAYMENT_PRICE is not set in the environment")

class StripeCheckoutView(APIView):
    def post(self, request):
        try:
            coupon_code = request.data.get('coupon_code')  # Get coupon code from the request
            
            # Create a dictionary to hold the session creation parameters
            session_params = {
                'line_items': [
                    {
                        'price': STRIPE_PAYMENT_PRICE,
                        'quantity': 1,
                    },
                ],
                'mode': 'payment',
                'success_url': settings.PAYMENT_SUCCESS_URL + "?session_id={CHECKOUT_SESSION_ID}",
                'cancel_url': settings.PAYMENT_CANCEL_URL,
            }

            # Apply the coupon code if provided
            if coupon_code:
                session_params['discounts'] = [{'coupon': coupon_code}]

            checkout_session = stripe.checkout.Session.create(**session_params)
            return redirect(checkout_session.url, code=303)
            
        except StripeError as e:
            error_message = str(e)
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            error_message = str(e)
            return Response({"error": error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SavePaymentView(APIView):
    def post(self, request):
        try:
            session_id = request.data.get('session_id')
            coupon_code = request.data.get('coupon_code')
            
            existing_payment = Payment.objects.filter(session_id=session_id).first()
            if existing_payment:
                return Response({'error': 'Payment with this session_id already exists.'}, status=400)

            checkout_session = stripe.checkout.Session.retrieve(session_id)

            # Check if a coupon code was provided and apply it to the payment
            if coupon_code:
                try:
                    payment_intent = stripe.PaymentIntent.retrieve(checkout_session.payment_intent)
                    payment_intent = stripe.PaymentIntent.modify(
                        payment_intent.id,
                        promotion_code=coupon_code
                    )
                except StripeError as e:
                    return Response({'error': str(e)}, status=400)

            payment = Payment.objects.create(
                session_id=session_id,
                amount=checkout_session.amount_total / 100.0,
                currency=checkout_session.currency,
                status=checkout_session.payment_status,
                user_email=checkout_session.customer_details.email,
                coupon_code=coupon_code,  # Store the coupon code in the Payment model
            )
            serializer = PaymentSerializer(payment)
            return Response({'payment': serializer.data})

        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=400)

        except Exception as e:
            return Response({'error': str(e)}, status=500)
        
@csrf_exempt
@require_POST
def verify_payment(request):
    try:
        body = json.loads(request.body)
        session_id = body.get('session_id')

        if not session_id:
            return JsonResponse({'error': 'Session ID is missing'}, status=400)

        session = stripe.checkout.Session.retrieve(session_id)

        # TODO: Update the user's subscription status in db

        return JsonResponse({'status': 'success'})
    except stripe.error.StripeError as e:
        return JsonResponse({'error': str(e)}, status=400)
    except Exception as e:
        return JsonResponse({'error': 'Internal Server Error'}, status=500)