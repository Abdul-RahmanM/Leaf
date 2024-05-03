from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("events/", views.EventListCreate.as_view(), name="event-list"),
    path("events/<int:pk>", views.EventListCreate.as_view(), name="patch-event"),
    path("events/delete/<int:pk>/", views.EventDelete.as_view(), name="delete-event"),
    path('get_current_user_id/', views.GetCurrentUserId.as_view(), name='get_current_user_id'),
    path("events/eventDetails/<int:pk>/", views.GetEventDetails.as_view(), name="get-event-details"),
    path('events/toggle-attendance/<int:pk>/', views.ToggleAttendance.as_view(), name='toggle-attendance'),
    path('events/add-collaborator/<int:pk>/', views.AddCollaborator.as_view(), name="add-collaborator"),
    path('events/is-attending/<int:pk>/', views.IsAttending.as_view(), name='get-attendance'),
    path('events/tasks/', views.TaskListCreate.as_view(), name="task-list"),
    path('events/GeminiPrompt/', views.GeminiPrompt.as_view(), name='gemini-prompt')
]
