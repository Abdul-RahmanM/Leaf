# Generated by Django 5.0.3 on 2024-04-24 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_complexevent_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='complexevent',
            name='RSVP',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='complexevent',
            name='event_time',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='complexevent',
            name='image',
            field=models.TextField(),
        ),
    ]
