# Generated by Django 4.2.3 on 2023-10-26 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "subscription",
            "0002_subscription_isactive_subscription_renewaldate_and_more",
        ),
    ]

    operations = [
        migrations.RenameField(
            model_name="subscription",
            old_name="renewalDate",
            new_name="renewal_date",
        ),
        migrations.AddField(
            model_name="subscription",
            name="is_subscribed",
            field=models.BooleanField(default=False),
        ),
    ]
