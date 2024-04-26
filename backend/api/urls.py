from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("events/", views.EventListCreate.as_view(), name="event-list"),
    path("events/delete/<int:pk>/", views.EventDelete.as_view(), name="delete-event"),
    path('get_current_user_id/', views.GetCurrentUserId.as_view(), name='get_current_user_id')
]
