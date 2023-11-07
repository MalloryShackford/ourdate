from rest_framework import serializers
from .models import DatePlan, DatePlanInfo, DatePlanDetail

class DatePlanDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatePlanDetail
        fields = '__all__'

class DatePlanSerializer(serializers.ModelSerializer):
    plan = DatePlanDetailSerializer()
    class Meta:
        model = DatePlan
        fields = ['uuid', 'plan', 'plan_info', 'status', 'user', 'favorite', 'need_babysitter']

class DatePlanInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatePlanInfo
        fields = ['uuid', 'budget', 'date', 'location', 'time', 'user', 'vibe', ]