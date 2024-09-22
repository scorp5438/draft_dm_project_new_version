from pprint import pprint

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
        allow_null=True,
        label="ФИ сотрудника"
    )

    name_train = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.none(),  # Переопределим queryset ниже
        label="ФИ обучающего/обучающих"
    )

    internal_test_examiner = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.none(),  # Переопределим queryset ниже
        label="ФИ принимающего внутреннее ТЗ"
    )
    name_examiner_name = serializers.CharField(source='name_examiner.full_name', read_only=True)
    cc_name = serializers.CharField(source='cc.name', read_only=True)
    name_train_name = serializers.CharField(source='name_train.full_name', read_only=True)
    internal_test_examiner_name = serializers.CharField(source='internal_test_examiner.full_name', read_only=True)


    class Meta:
        model = Exam
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(ExamSerializer, self).__init__(*args, **kwargs)

        # Получаем текущего пользователя из контекста
        user = self.context['request'].user

        cc_id = self.context['request'].headers.get('X-company-id')
        pprint(self.context['request'].headers)
        print(f'{user.company.name != "DM" = }')
        if user.company.name != 'DM':
            company_id = user.company.id
            print(f'{type(company_id) = }, {company_id = }')
        else:

            company_id = int(cc_id) if cc_id else self.instance.cc.id if self.instance and hasattr(self.instance,
                                                                                                   'cc') else None

        if company_id:
            print(f"Текущий пользователь: {user}, компания: {user.company}, post: {user.post}")
            # Фильтруем queryset для поля name_train
            self.fields['name_train'].queryset = User.objects.filter(
                company=company_id, post='Admin'
            )

            print(f"Пользователи для name_train: {User.objects.filter(company=company_id, post='Admin')}")
            # Фильтруем queryset для поля internal_test_examiner
            self.fields['internal_test_examiner'].queryset = User.objects.filter(
                company=company_id, post='Admin'
            )
            print(f"Пользователи для internal_test_examiner: {User.objects.filter(company=company_id, post='Admin')}")

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
        fields = ['date_exam', 'name_intern', 'cc', 'training_form', 'try_count', 'name_train',
                  'internal_test_examiner', 'note']


class EditInternSerializer(ExamSerializer):
    """
    Сериализатор для редактирования стажера.
    """

    class Meta(ExamSerializer.Meta):
        model = Exam
        fields = ['date_exam', 'name_intern', 'cc', 'training_form', 'try_count', 'name_train',
                  'internal_test_examiner', 'note']
