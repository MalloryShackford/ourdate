# Generated by Django 4.2.2 on 2023-06-25 23:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dateplan', '0002_alter_dateplan_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dateplan',
            name='plan',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
