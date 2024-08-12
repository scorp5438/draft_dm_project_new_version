from django.urls import path

from .views import login_view, index

app_name = 'mainapp'

urlpatterns = [
    path('', index, name='index'),
    path('auth/', login_view, name='auth')
]

