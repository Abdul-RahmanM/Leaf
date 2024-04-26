import datetime

from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title

class ComplexEvent(models.Model):
    title = models.CharField(max_length=50)
    image = models.ImageField(default="../assets/placeholder.jpg", upload_to="images/")
    content = models.TextField()
    RSVP = models.BooleanField()
    event_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")

    def __str__(self):
        return self.title