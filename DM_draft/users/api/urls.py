from django.urls import path

from rest_framework import routers
from .view import UsersView, UsersLoginView, CompaniesView, OkkUsersView

'''
Адреса по которым будут доступны данные в формате JSON
'''
router = routers.SimpleRouter()
router.register(r'users', UsersView, basename='users')
router.register(r'companies', CompaniesView, basename='companies')
router.register(r'user_login', UsersLoginView, basename='user_login')
router.register(r'users_okk', OkkUsersView, basename='users_okk')

urlpatterns = []
urlpatterns += router.urls
