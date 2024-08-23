from django.urls import path

from .views import login_view, index, exam_view
from django.contrib.auth import views as auth_views
app_name = 'mainapp'

urlpatterns = [
    path('', index, name='index'),
    path('login/', login_view, name='auth'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('exam/', exam_view, name='exam')  # Маршрут для Exam.js
]

