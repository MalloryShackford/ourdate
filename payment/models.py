from django.db import models

class Payment(models.Model):
    session_id = models.CharField(max_length=255, default='')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3)
    status = models.CharField(max_length=10)
    user_email = models.EmailField(max_length=254, default='')
    created_at = models.DateTimeField(auto_now_add=True)
    coupon_code = models.CharField(max_length=50, blank=True, null=True)
    
    def __str__(self):
        return f"${self.amount} {self.currency} - {self.created_at}"