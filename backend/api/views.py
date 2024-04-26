from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response

from .serializers import UserSerializer, NoteSerializer, ComplexEventSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note, ComplexEvent


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

        if self_filter:
            queryset = queryset.filter(author=user)

        return queryset

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print("L")
            print(serializer.errors)

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
