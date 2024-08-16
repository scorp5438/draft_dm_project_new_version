from django.urls import path

from rest_framework import routers
from .view import UsersView, UsersLoginView

'''
Адреса по которым будут доступны данные в формате JSON
'''
router = routers.SimpleRouter()
router.register('users', UsersView, basename='users')
router.register('user_login', UsersLoginView, basename='user_login')

urlpatterns = []
urlpatterns += router.urls
