from django.contrib import admin
from prompts.models import Prompt, PromptMessage


class PromptMessageInline(admin.StackedInline):
    model = PromptMessage
    extra = 0

@admin.register(Prompt)
class PromptAdmin(admin.ModelAdmin):
    inlines = [PromptMessageInline]
    list_display = ['model', 'max_tokens', 'temperature', 'ai_service', 'active']

@admin.register(PromptMessage)
class PromptMessageAdmin(admin.ModelAdmin):
    list_display = ['order', 'role', 'content']
