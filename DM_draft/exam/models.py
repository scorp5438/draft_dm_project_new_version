from django.db import models
from django.core.exceptions import ValidationError

from users.models import Companies, User


class Exam(models.Model):
    # examiner_list = [
    #     ("Иванов", "Иванов"),
    #     ("Петров", "Петров"),
    #     ("Васечкин", "Васечкин"),
    # ]
    result_list = [
        ("Не допущен", "Не допущен"),
        ("Допущен", "Допущен"),
        ("Неявка", "Неявка"),
        ("Отмена", "Отмена"),
        ("Не состоялось", "Не состоялось"),
    ]

    date_exam = models.DateField(blank=False, verbose_name="Дата зачета")
    name_intern = models.CharField(max_length=60, blank=False, verbose_name="Фамилия Имя стажера")
    cc = models.ForeignKey(Companies, on_delete=models.PROTECT, verbose_name='Компания', null=False)
    time_exam = models.TimeField(blank=True, default="00:00", verbose_name="Время зачета")
    name_examiner = models.ForeignKey(User, blank=True, null=True, on_delete=models.PROTECT,
                                      verbose_name="ФИ сотрудника", limit_choices_to={'post': 'OKK'})
    result_exam = models.CharField(max_length=25, blank=True, choices=result_list, default="",
                                   verbose_name="Результат")
    comment_exam = models.TextField(max_length=2000, blank=True, verbose_name="комментарий")

    class Meta:
        verbose_name = 'Зачет'
        verbose_name_plural = 'Зачеты'

    def __str__(self):
        return f"{self.name_intern} {self.cc} {self.result_exam}"

    def validate_unique_exam(self):
        # Проверка на наличие экзамена с тем же проверяющим, датой и временем
        if Exam.objects.filter(
            date_exam=self.date_exam,
            time_exam=self.time_exam,
            name_examiner=self.name_examiner
        ).exclude(id=self.id).exists():
            raise ValidationError({"name_examiner": "Проверяющий уже записан на эту дату и время"})

    def clean(self):
        # Вызываем метод validate_unique_exam для выполнения уникальной проверки
        self.validate_unique_exam()

    def save(self, *args, **kwargs):
        # Вызываем метод clean() перед сохранением, чтобы убедиться, что валидация прошла
        self.clean()
        super().save(*args, **kwargs)
