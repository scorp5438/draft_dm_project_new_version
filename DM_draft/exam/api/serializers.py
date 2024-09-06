from rest_framework import serializers
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as RestFrameworkValidationError

from exam.models import Exam
from users.models import User

'''
# Сериализаторы для создания JSON объектов
'''


class ExamSerializer(serializers.ModelSerializer):
    """
    Сериализатор для модели Exam с подстановкой данных в поле name_examiner
    по фильтру company=1 (ДМ), post='OKK'.
    """
    name_examiner = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(company__id=1, post='OKK'),
        allow_null=True
    )
    name_examiner_name = serializers.CharField(source='name_examiner.full_name', read_only=True)

    class Meta:
        model = Exam
        fields = '__all__'

    def save(self, **kwargs):
        try:
            instance = super().save(**kwargs)
            return instance
        except ValidationError as e:
            raise RestFrameworkValidationError(e.message_dict)


class AddInternSerializer(serializers.ModelSerializer):
    """
    Сериализатор для добавления стажера.
    """

    class Meta:
        model = Exam
        fields = ['date_exam', 'name_intern', 'cc']

    def validate(self, data):
        instance = Exam(**data)
        try:
            instance.full_clean()
        except serializers.ValidationError as e:
            raise serializers.ValidationError(e.message_dict)
        return data


class EditInternSerializer(AddInternSerializer):
    """
    Сериализатор для редактирования стажера.
    """

    class Meta(AddInternSerializer.Meta):
        model = Exam
        fields = ['id', 'date_exam', 'name_intern', 'cc']
