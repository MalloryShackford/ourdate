from django.urls import path
from .views import CreateSubscriptionView, SaveSubscriptionView, GetSubscription, GetSubscriptionBySessionId
from .views import WebHook

urlpatterns = [
    path('create-subscription/', CreateSubscriptionView.as_view()),
    path('save/', SaveSubscriptionView.as_view()),
    path('stripe-webhook/', WebHook.as_view()), 
    path('', GetSubscription.as_view(), name='get_subscription'),
    path('get-subscription/', GetSubscriptionBySessionId.as_view(), name='get_subscription_by_session_id'),
    # path('webhook-test/', WebHook.as_view()), 
]