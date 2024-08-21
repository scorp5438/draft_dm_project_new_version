from rest_framework import serializers

from exam.models import Exam

from users.api.serializers import CompanySerializer

'''
Сериализаторы для создания JSON объектов для отображения по адресу http://127.0.0.1:8000/api/...
'''


class ExamSerializer(serializers.ModelSerializer):
    company = serializers.CharField(source='cc.name', read_only=True)
    # cc = CompanySerializer()

    class Meta:
        model = Exam
        fields = ['date_exam', 'name_intern', 'company', 'time_exam', 'name_examiner', 'result_exam', 'comment_exam']
        # fields = '__all__'
