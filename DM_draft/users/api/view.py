from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import UserListAllSerializer, CompanySerializer, UserSerializer
from ..models import User, Companies


class UsersView(viewsets.ModelViewSet):
    '''
    Представление для отображения списка всех пользователей
    '''
    queryset = User.objects.all()
    serializer_class = UserListAllSerializer


class CompaniesView(viewsets.ModelViewSet):
    '''
    Представление для отображения списка всех компаний
    '''
    queryset = Companies.objects.exclude(name='DM')
    serializer_class = CompanySerializer


class UsersLoginView(viewsets.ModelViewSet):
    '''
    Представление для отображения залогиненого пользователя
    '''
    serializer_class = UserListAllSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Фильтруем пользователей по username текущего авторизованного пользователя
        return User.objects.filter(username=self.request.user.username)


class OkkUsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer

    def get_queryset(self):
        # Вы можете добавлять логику для динамического выбора queryset
        return User.objects.filter(company__id=self.request.user.company.id, post=self.request.user.post)
