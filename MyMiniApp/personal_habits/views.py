from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import PersonalHabits
from .serializers import PersonalHabitsSerializer

class PersonalHabitsViewSet(viewsets.ModelViewSet):
    queryset = PersonalHabits.objects.all()
    serializer_class = PersonalHabitsSerializer

    @action(detail=True, methods=['post'])
    def toggle(self, request, pk=None):
        habit = self.get_object()
        habit.is_completed = not habit.is_completed
        habit.save()

        serializer = self.get_serializer(habit)
        return Response(serializer.data, status=status.HTTP_200_OK)