from django.urls import path
from .views import StripeCheckoutView, SavePaymentView, verify_payment

urlpatterns = [
    path('create-checkout-session/', StripeCheckoutView.as_view()),
    path('save/', SavePaymentView.as_view()),
    path('verify-payment/', verify_payment, name='verify_payment')
    
    ]