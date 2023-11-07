from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import uuid
from .constants import PROMPT_HELP_TEXTS, PROMPT_MSGS_HELP_TEXTS

class Prompt(models.Model):
    MODEL_CHOICES = [
        ('gpt-3.5-turbo', 'GPT-3.5 Turbo'),
        ('gpt-4', 'GPT-4'),
    ]

    AI_SERVICE_CHOICES = [
        ('ChatGPT', 'ChatGPT'),
        ('Llama2', 'Llama2'),
        ('Bard', 'Bard'),
        ('SageMaker', 'SageMaker'),
    ]

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    model = models.CharField(default='gpt-3.5-turbo', max_length=100, choices=MODEL_CHOICES, help_text=PROMPT_HELP_TEXTS['model'])
    max_tokens = models.IntegerField(default=1000, validators=[MinValueValidator(1), MaxValueValidator(4097)], help_text=PROMPT_HELP_TEXTS['max_tokens'])
    temperature = models.DecimalField(default=0.7, max_digits=2, decimal_places=1, validators=[MinValueValidator(0.0), MaxValueValidator(1.0)], help_text=PROMPT_HELP_TEXTS['temperature'])
    ai_service = models.CharField(default='ChatGPT', max_length=100, choices=AI_SERVICE_CHOICES)
    active = models.BooleanField(default=True)
    
    class Meta:
        indexes = [models.Index(fields=['uuid', ]), ]

    def __str__(self):
        return str(self.uuid)


class PromptMessage(models.Model):
    ROLE_CHOICES = [
        ('system', 'system'),
        ('user', 'user'),
        ('assistant', 'assistant'),
    ]
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    prompt = models.ForeignKey(Prompt, on_delete=models.CASCADE, related_name='messages', null=True) # to inline the Prompt model
    order = models.IntegerField(validators=[MinValueValidator(1)], help_text=PROMPT_MSGS_HELP_TEXTS['order'])
    role = models.CharField(max_length=100, choices=ROLE_CHOICES)
    content = models.TextField(help_text=PROMPT_MSGS_HELP_TEXTS['content'])

    class Meta:
        indexes = [models.Index(fields=['uuid', ]), ]

    def __str__(self):
        return str(self.uuid)
    