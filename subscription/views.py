from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import stripe
from stripe.error import StripeError
from .models import Subscription
from django.shortcuts import redirect, get_object_or_404
from subscription.serializer import SubscriptionSerializer
from user.models import Profile, User
from .models import Session, Subscription
from django.http import JsonResponse
from django.views import View

webhook_secret = settings.STRIPE_WEBHOOK_SECRET
stripe.api_key = settings.STRIPE_SECRET_KEY
stripe_subscription_price = settings.STRIPE_SUBSCRIPTION_PRICE


class GetSubscriptionBySessionId(APIView):
    def get(self, request):
        session_id = request.query_params.get("session_id")
        if not session_id:
            return Response({"error": "Session ID is required"}, status=400)

        try:
            session_id = int(session_id)
        except ValueError:
            return Response({"error": "Invalid session ID"}, status=400)

        session = get_object_or_404(Session, id=session_id)
        subscription = get_object_or_404(Subscription, session=session)

        data = {
            "isActive": subscription.isActive,
            "renewalDate": subscription.renewal_date,
        }
        return Response(data)


class GetSubscription(APIView):
    def get(self, request):
        session_id = request.query_params.get("session_id")
        status_filter = request.query_params.get("status")

        if session_id:
            view = GetSubscriptionBySessionId()
            subscription = view.get_subscription(session_id)
            if subscription:
                return Response(
                    {
                        "isActive": subscription.isActive,
                        "renewalDate": subscription.renewal_date,
                        "isSubscribed": False,
                    }
                )
            else:
                return Response(
                    {"error": "Subscription not found"},
                    status=status.HTTP_404_NOT_FOUND,
                )

        user = request.user
        if not user.is_authenticated:
            return Response(
                {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
            )

        profile = get_object_or_404(Profile, user=user)

        if status_filter:
            subscription = Subscription.objects.filter(
                user=user, status=status_filter
            ).first()
        else:
            subscription = Subscription.objects.filter(user=user).first()

        if subscription:
            return Response(
                {
                    "isActive": subscription.isActive,
                    "renewalDate": subscription.renewal_date,
                    "isSubscribed": profile.is_subscribed,
                }
            )
        else:
            return Response(
                {
                    "isActive": False,
                    "isSubscribed": profile.is_subscribed,
                }
            )


class CreateSubscriptionView(APIView):
    def post(self, request):
        try:
            checkout_session = stripe.checkout.Session.create(
                line_items=[{"price": stripe_subscription_price, "quantity": 1}],
                mode="subscription",
                success_url=settings.SUBSCRIPTION_SUCCESS_URL
                + "?session_id={CHECKOUT_SESSION_ID}",
                cancel_url=settings.SUBSCRIPTION_CANCEL_URL,
            )
            return redirect(checkout_session.url, code=303)

        except StripeError as e:
            error_message = str(e)
            return Response(
                {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            error_message = str(e)
            return Response(
                {"error": error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@method_decorator(csrf_exempt, name="dispatch")
class WebHook(APIView):
    def post(self, request):
        # if webhook_secret:
        webhook_secret = settings.STRIPE_WEBHOOK_SECRET
        payload = request.data
        sig_header = request.headers.get("Stripe-Signature")
        event = None
        # sig_header = request.META["HTTP_STRIPE_SIGNATURE"]

        if not sig_header:
            print("Sig-header:", sig_header)
            return JsonResponse(
                {"error": "Missing Stripe-Signature header"}, status=400
            )
        try:
            event = stripe.Webhook.construct_event(
                payload,
                sig_header,
                webhook_secret,
            )
        except ValueError as e:
            print("Invalid payload")
            return JsonResponse({"error": str(e)}, status=400)
        except stripe.error.SignatureVerificationError as e:
            print("Invalid signature")
            return JsonResponse({"error": str(e)}, status=400)

        if event["type"] == "customer.created":
            customer = event["data"]["object"]
            email = customer.get("email")
            stripe_customer_id = customer.get("id")

            if email:
                try:
                    user = User.objects.get(email=email)
                    user.stripe_customer_id = stripe_customer_id
                    user.save()
                    print(
                        f"Updated user {user.username} with Stripe customer ID {stripe_customer_id}"
                    )
                except User.DoesNotExist:
                    print(f"User with email {email} does not exist")
            else:
                print("No email provided in customer data")
        else:
            print("Unhandled event type {}".format(event["type"]))

        return JsonResponse({"success": True, "safe": False})


class SaveSubscriptionView(APIView):
    def get(self, request):
        try:
            session_id = request.GET.get("session_id")
            existing_subscription = Subscription.objects.filter(
                session_id=session_id
            ).first()
            if existing_subscription:
                return Response(
                    {"error": "Subscription with this session_id already exists."},
                    status=400,
                )

            checkout_session = stripe.checkout.Session.retrieve(session_id)
            subscription = Subscription.objects.create(
                session_id=session_id,
                amount=checkout_session.amount_total,
                currency=checkout_session.currency,
                status=checkout_session.status,
                user_email=checkout_session.customer_details.email,
            )
            serializer = SubscriptionSerializer(subscription)
            return Response({"subscription": serializer.data})

        except stripe.error.StripeError as e:
            return Response({"error": str(e)}, status=400)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
