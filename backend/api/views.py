import dotenv
import os
import google.generativeai as genai
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response

from .serializers import UserSerializer, NoteSerializer, ComplexEventSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, ComplexEvent, Task


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class EventListCreate(generics.ListCreateAPIView):
    serializer_class = ComplexEventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = ComplexEvent.objects.all()
        user = self.request.user
        self_filter = self.request.query_params.get("self_filter")
        event_id_filter = self.request.query_params.get("event_id")

        if self_filter:
            queryset = queryset.filter(author=user)

        if event_id_filter:
            queryset = queryset.filter(id=event_id_filter)

        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print("L")
            print(serializer.errors)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

class EventDelete(generics.DestroyAPIView):
    serializer_class = ComplexEventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ComplexEvent.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GetCurrentUserId(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        return Response({'user_id': user_id})

class GetEventDetails(generics.RetrieveAPIView):
    queryset = ComplexEvent.objects.all()
    serializer_class = ComplexEventSerializer
    permission_classes = [IsAuthenticated]

class ToggleAttendance(generics.UpdateAPIView):
    queryset = ComplexEvent.objects.all()
    serializer_class = ComplexEventSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        event = self.get_object()
        user = request.user

        if user in event.attendees.all():
            event.attendees.remove(user)
            attending = False
        else:
            event.attendees.add(user)
            attending = True

        event.save()  # Ensure any changes are saved to the database.
        return Response({'attending': attending})

class AddCollaborator(generics.UpdateAPIView):
    queryset = ComplexEvent.objects.all()
    serializer_class = ComplexEventSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        event = self.get_object()
        username = request.data.get("collaborators")
        user = get_object_or_404(User, username=username)

        print("user:", user)

        if user == self.request.user:
            return Response({'response': "Can't add yourself as collaborator"})

        if user in event.collaborators.all():
            print("not adding")
            response = "User is already added!"
        else:
            print("adding")
            event.collaborators.add(user)
            response = "User has been added"

        event.save()  # Ensure any changes are saved to the database.
        return Response({'response': response})

class IsAttending(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        event = ComplexEvent.objects.get(id=pk)
        user = request.user
        attending = user in event.attendees.all()
        return Response({'attending': attending})

class TaskListCreate(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Assuming you have the 'event' field in the URL or request data
        event_id = self.kwargs.get('event_id')  # Adjust this based on your URL pattern
        return Task.objects.filter(event_id=event_id)

    def perform_create(self, serializer):
        # Assuming you pass the 'event_id' in the request data or URL
        event_id = self.request.get('event_id')
        serializer.save(event_id=event_id, author=self.request.user)


class GeminiPrompt(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("req data", request.data)
        dotenv.load_dotenv()
        api_key = os.getenv("GOOGLE_API_KEY")
        prompt = request.data.get("prompt")
        genai.configure(api_key=api_key)
        # Set up the model
        generation_config = {
            "temperature": 0.9,
            "top_p": 1,
            "top_k": 1,
            "max_output_tokens": 2048,
        }

        safety_settings = [
            {
                "category": "HARM_CATEGORY_HARASSMENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_HATE_SPEECH",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            },
        ]

        model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                      generation_config=generation_config,
                                      safety_settings=safety_settings)

        prompt_parts = [
            "put date and time into ISO 8601 format",
            "input: I want to have a birthday party for my cousin Felix's birthday on the fourteenth of may 2024",
            "output: Title: Felix's Birthday\nDescription: Join us to celebrate Felix's birthday on \nDate: 05/14/2024\nTime: 12:00 PM\nItems: Cake, tables, plates, cups, decorations, pizza",
            "input: I want to have a BBQ party at my house on may 4th 2024",
            "output: Title: BBQ Party\nDescription: Join us for a BBQ party at my place!\nDate: 05/04/2024\nTime: 12:00 PM\nItems: Grill, charcoal, meat, vegetables, plates, cups, napkins",
            "input: I want to host a volunteer cleanup of the local Farmginton park tommorow morning",
            "output: Title: Farmington Park Clean Up\nDescription: Join us for a volunteer cleanup of Farmington Park! Tomorrow morning, 9:00 AM - 12:00 PM.\nDate: 05/03/2024\nTime: 9:00 AM\nItems: Gloves, trash bags, water bottles, snacks",
            "input: NHS induction ceremony on june 1st 2024 at the Avon High School at 6 PM",
            "output: Title: NHS Induction Ceremony\nDescription: NHS induction ceremony on June 1st 2024 at the Avon High School at 6 PM\nDate: 06/01/2024\nTime: 6:00 PM\nItems: chairs, podium, decorations",
            "input: Game night at my house for 3 hours from 6pm on saturday may 4th",
            "output: Title: Game Night\nDescription: Join us for a game night at my house!\nDate: 05/04/2024\nTime: 6:00 PM\nItems: Games, snacks, drinks",
            "input: Boxing match may 3rd at 3 pm at my place",
            "output: Title: Boxing match\nDescription: Join us for a boxing match at my place!\nDate: 05/03/2024\nTime: 3:00 PM\nItems: Boxing gloves, punching bag",
            "input: Potluck at the FVAMC mosque this friday at 7 PM",
            "output: Title: Potluck at the FVAMC mosque\nDescription: Join us for a potluck at the FVAMC mosque this Friday at 7 PM!\nDate: 05/05/2024\nTime: 7:00 PM\nItems: Food to share, plates, cups, napkins",
            f"input: {prompt}", # Use user prompt as input for the model
            "output: ",
        ]

        response = model.generate_content(prompt_parts)
        print("prompt", prompt)
        print(response.text)

        return Response({"response": response.text})

