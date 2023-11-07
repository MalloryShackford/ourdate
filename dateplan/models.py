from django.db import models
# from django.contrib.auth.models import User

from user.models import User
import uuid


class DatePlanInfo(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    budget = models.CharField(max_length=100)
    date = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    time = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    vibe = models.CharField(max_length=100)
    reviewed = models.BooleanField(default=False)
    need_babysitter = models.BooleanField(default=False)
    class Meta:
        indexes = [models.Index(fields=['uuid', ]), ]
    def __str__(self):
        return str(self.location) + ' ' + str(self.vibe) + ' ' + str(self.budget)

class DatePlan(models.Model):
    PLAN_STATUS = [
        ('VE', 'Verified'),
        ('VG', 'Verifying'),
        ('UV', 'Unverified'),
        ('SH', 'Shared'),
        ('IN', 'Invalid')
    ]
    QUALITY = [
        ('Good', 'Good'),
        ('Fair', 'Fair'),   
        ('Poor', 'Poor'),
    ]

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    status = models.CharField(max_length=2, choices=PLAN_STATUS, default='UV')
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True) 
    prompt = models.TextField(default = '')
    ai_model = models.CharField(max_length=100, default='gpt-3.5-turbo')
    plan_info = models.ForeignKey(DatePlanInfo, on_delete=models.CASCADE, null=True)
    quality = models.CharField(max_length=100, choices=QUALITY, null=True, blank=True)
    favorite = models.BooleanField(default=False)
    need_babysitter = models.BooleanField(default=False)

    class Meta:
        indexes = [models.Index(fields=['status', 'plan_info', 'favorite']), ]

    def __str__(self):
        return str(self.uuid)

class DatePlanDetail(models.Model):
    date_plan = models.OneToOneField(DatePlan, on_delete=models.CASCADE, primary_key=True, related_name='plan')
    place = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    cityState = models.CharField(max_length=100)
    description = models.TextField()
    approximatedCost = models.CharField(max_length=5)
    openDateAndTime = models.CharField(max_length=100)
    datePlanStart = models.CharField(max_length=100, blank=True, null=True)
    datePlanEnd = models.CharField(max_length=100, blank=True, null=True)
    googlePlaceId = models.CharField(max_length=100, blank=True, null=True)
    googlePlacePhotoRef = models.CharField(max_length=255, blank=True, null=True)
    bookingLink = models.URLField(blank=True, null=True)
    phoneNumber = models.CharField(max_length=15, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    socialMediaLink = models.URLField(blank=True, null=True)
    transportationOptions = models.TextField(blank=True, null=True)
    parkingOptions = models.TextField(blank=True, null=True)
    nearbyAttractions = models.TextField(blank=True, null=True)
    need_babysitter=models.BooleanField(blank=True, null=True)

    class Meta:
        indexes = [models.Index(fields=['place']), ]

    def __str__(self):
        return self.place