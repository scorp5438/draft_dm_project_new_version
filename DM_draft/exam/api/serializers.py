from rest_framework import serializers

from exam.models import Exam
from users.models import User
from users.api.serializers import UserSerializer


'''
Сериализаторы для создания JSON объектов для отображения по адресу http://127.0.0.1:8000/api/...
'''


class ExamSerializer(serializers.ModelSerializer):
    # company = serializers.CharField(source='cc.name', readonly=True)
    """
    Настройка подстановки данных в поле nameexaminer по фильтру company=1 (ДМ), post='okk'
    """
    # name_examiner = UserSerializer()

    # name_examiner = serializers.PrimaryKeyRelatedField(
    #     queryset=User.objects.filter(company__id=1, post='OKK')
    # )
    name_examiner_name = serializers.CharField(source='name_examiner.full_name', read_only=True)

    class Meta:
        model = Exam
        # fields = ['id', 'date_exam', 'name_intern', 'company', 'time_exam', 'name_examiner', 'result_exam', 'comment_exam']
        fields = '__all__'


class AddInternSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['date_exam', 'name_intern', 'cc']

    def validate(self, data):
        # Создаем экземпляр модели с данными
        instance = Exam(**data)
        print(instance)
        try:
            # Вызываем full_clean() для проверки ошибок модели
            instance.full_clean()

        except serializers.ValidationError as e:
            print(e.message_dict)
            # Обрабатываем ошибки и возвращаем их как ошибки сериализатора
            raise serializers.ValidationError(e.message_dict)

        return data


class EditInternSerializer(AddInternSerializer):
    class Meta(AddInternSerializer.Meta):
        model = Exam
        fields = ['id', 'date_exam', 'name_intern', 'cc']
