# Generated by Django 4.2.3 on 2023-09-11 23:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0002_payment_email'),
    ]

    operations = [
        migrations.RenameField(
            model_name='payment',
            old_name='email',
            new_name='user_email',
        ),
    ]