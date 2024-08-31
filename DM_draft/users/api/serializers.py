from rest_framework import serializers

from users.models import User, Companies

'''
Сериализаторы для создания JSON объектов для отображения по адресу http://127.0.0.1:8000/api/...
'''


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'full_name', 'post', 'company']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = ['id', 'name']


class UserListAllSerializer(serializers.ModelSerializer):
    company = CompanySerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'company']
