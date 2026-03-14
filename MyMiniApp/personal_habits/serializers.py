from rest_framework import serializers
from .models import PersonalHabits

class PersonalHabitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalHabits
        fields = '__all__'