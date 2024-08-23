from django.urls import path

from .views import exam_view, add_intern
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', exam_view, name='exam'),  # Маршрут для Exam.js
    path('add/', add_intern, name='add'),
]