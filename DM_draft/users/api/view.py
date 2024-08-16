from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .serializers import UserListAllSerializer
from ..models import User


class UsersView(viewsets.ModelViewSet):
    '''
    Представление для отображения списка всех пользователей
    '''
    queryset = User.objects.all()
    serializer_class = UserListAllSerializer


class UsersLoginView(viewsets.ModelViewSet):
    '''
    Представление для отображения залогиненого пользователя
    '''
    serializer_class = UserListAllSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Фильтруем пользователей по username текущего авторизованного пользователя
        return User.objects.filter(username=self.request.user.username)


