# Generated by Django 4.2.11 on 2024-03-25 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_matatu_fare'),
    ]

    operations = [
        migrations.AddField(
            model_name='matatu',
            name='time_it_take',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
