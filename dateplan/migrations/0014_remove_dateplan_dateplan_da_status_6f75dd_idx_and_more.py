# Generated by Django 4.2.3 on 2023-08-10 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dateplan', '0013_remove_dateplan_dateplan_da_status_851047_idx_and_more'),
    ]

    operations = [
        migrations.RemoveIndex(
            model_name='dateplan',
            name='dateplan_da_status_6f75dd_idx',
        ),
        migrations.RenameField(
            model_name='dateplan',
            old_name='saved',
            new_name='favorite',
        ),
        migrations.AddIndex(
            model_name='dateplan',
            index=models.Index(fields=['status', 'plan_info', 'favorite'], name='dateplan_da_status_daad8d_idx'),
        ),
    ]
