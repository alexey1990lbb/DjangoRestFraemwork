from django.shortcuts import render
from rest_framework import viewsets
from .models import PersonalHabits
from .serializers import PersonalHabitsSerializer

class PersonalHabitsViewSet(viewsets.ModelViewSet):
    queryset = PersonalHabits.objects.all()
    serializer_class = PersonalHabitsSerializer