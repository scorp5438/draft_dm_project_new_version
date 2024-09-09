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

    def validate(self, data):
        try:
            return super().validate(data)
        except ValidationError as e:
            raise RestFrameworkValidationError(e.detail)


class AddInternSerializer(ExamSerializer):
    """
    Сериализатор для добавления стажера.
    """

    class Meta(ExamSerializer.Meta):
        model = Exam
        fields = ['date_exam', 'name_intern', 'cc']


class EditInternSerializer(ExamSerializer):
    """
    Сериализатор для редактирования стажера.
    """

    class Meta(ExamSerializer.Meta):
        model = Exam
        fields = ['id', 'date_exam', 'name_intern', 'cc']
