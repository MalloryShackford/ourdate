from django.contrib import admin
from dateplan.models import (
    DatePlanInfo,
    DatePlan,
    DatePlanDetail,
)

class DatePlanInline(admin.StackedInline):
    model = DatePlan
    readonly_fields = ('user','prompt', 'plan', 'ai_model', 'favorite')
    extra = 0

    # This will help you to disbale add functionality
    def has_add_permission(self, request, obj=None):
        return False
    # This will help you to disable delete functionaliyt
    def has_delete_permission(self, request, obj=None):
        return False

class DatePlanDetailInline(admin.StackedInline):
    model = DatePlanDetail
    readonly_fields = ('date_plan',)
    extra = 1

@admin.register(DatePlan)
class DatePlan(admin.ModelAdmin):
    inlines = [DatePlanDetailInline]
    readonly_fields = ('user','prompt', 'plan', 'plan_info', 'ai_model', 'favorite')
    list_display = ('uuid', 'status', 'ai_model', 'favorite', 'need_babysitter')

    def has_add_permission(self, request, obj=None):
        return False
    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(DatePlanInfo)
class DatePlanAdmin(admin.ModelAdmin):
    inlines = [DatePlanInline]
    sortable_by = ('reviewed', 'date', 'user', 'location', 'vibe',)
    readonly_fields = ('budget', 'date', 'location', 'time', 'user', 'vibe',)
    list_display = ('uuid', 'budget', 'date', 'reviewed','location', 'time', 'user', 'vibe',)

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(DatePlanDetail)
class DatePlanDetailAdmin(admin.ModelAdmin):
    list_display = ('date_plan', 'place','address', 'cityState', 'description', 'approximatedCost', 'openDateAndTime', 'googlePlaceId', 'googlePlacePhotoRef')
    readonly_fields = ('date_plan',)

    def has_add_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
