# Generated by Django 5.0.3 on 2024-04-23 22:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_complexevent_rsvp_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='complexevent',
            name='image',
            field=models.ImageField(default=None, upload_to=''),
            preserve_default=False,
        ),
    ]
