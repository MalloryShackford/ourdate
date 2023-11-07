# Generated by Django 4.2.2 on 2023-07-07 07:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dateplan', '0005_dateplan_ai_model_dateplan_prompt'),
    ]

    operations = [
        migrations.CreateModel(
            name='DatePlanInfo',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('budget', models.CharField(max_length=100)),
                ('date', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=100)),
                ('time', models.CharField(max_length=100)),
                ('vibe', models.CharField(max_length=100)),
                ('plans', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='dateplan.dateplan')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'indexes': [models.Index(fields=['uuid'], name='dateplan_da_uuid_82118d_idx')],
            },
        ),
    ]
