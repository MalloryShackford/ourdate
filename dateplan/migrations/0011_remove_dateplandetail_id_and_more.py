# Generated by Django 4.2.3 on 2023-07-25 22:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("dateplan", "0010_remove_dateplan_plan_dateplandetail"),
    ]

    operations = [
        migrations.RemoveField(model_name="dateplandetail", name="id",),
        migrations.AlterField(
            model_name="dateplandetail",
            name="date_plan",
            field=models.OneToOneField(
                on_delete=django.db.models.deletion.CASCADE,
                primary_key=True,
                related_name="plan",
                serialize=False,
                to="dateplan.dateplan",
            ),
        ),
    ]
