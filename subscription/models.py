from django.db import models
from user.models import User


class Session(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
class Subscription(models.Model):
    session_id = models.CharField(max_length=255, default='')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3)
    status = models.CharField(max_length=10)
    user_email = models.EmailField(max_length=254, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    isActive = models.BooleanField(default=False)
    renewal_date = models.DateField(null=True, blank=True)
    is_subscribed = models.BooleanField(default=False)

    def __str__(self):
        return f"${self.amount} {self.currency} - {self.created_at}"
