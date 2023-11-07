# Generated by Django 4.2.3 on 2023-08-16 16:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dateplan', '0014_remove_dateplan_dateplan_da_status_6f75dd_idx_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='dateplandetail',
            name='bookingLink',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='dateplandetail',
            name='nearbyAttractions',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='dateplandetail',
            name='parkingOptions',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='dateplandetail',
            name='phoneNumber',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='dateplandetail',
            name='socialMediaLink',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='dateplandetail',
            name='transportationOptions',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='dateplandetail',
            name='website',
            field=models.URLField(blank=True, null=True),
        ),
    ]
