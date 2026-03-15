from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonalHabitsViewSet

router = DefaultRouter()
router.register(r'habits', PersonalHabitsViewSet, basename='habit')

urlpatterns = [
    path('', include(router.urls)),
]