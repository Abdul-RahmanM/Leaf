# Generated by Django 5.0.3 on 2024-04-24 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_complexevent_event_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='complexevent',
            name='image',
            field=models.ImageField(default='C:/Cloud/Programming/Python/CodingProjects/Leaf/backend/placeholder.jpg', upload_to=''),
        ),
    ]
