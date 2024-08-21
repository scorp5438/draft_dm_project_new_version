from django.urls import path

from .views import login_view, index
from django.contrib.auth import views as auth_views
app_name = 'mainapp'

urlpatterns = [
    path('', index, name='index'),
    path('login/', login_view, name='auth'),
    path('logaut/', auth_views.LogoutView.as_view(), name='logaut')
]

