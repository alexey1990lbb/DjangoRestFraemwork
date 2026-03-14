from django.db import models

class PersonalHabits(models.Model):
    title = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title