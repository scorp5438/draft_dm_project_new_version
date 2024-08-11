
from django.urls import path

from .views import login_view

app_name = 'mainapp'

urlpatterns = [
    path('', login_view, name='index'),
]
