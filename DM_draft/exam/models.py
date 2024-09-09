import re
from datetime import datetime
from django.db import models
from django.core.exceptions import ValidationError

from users.models import Companies, User

FULL_NAME_PATTERN = "^[А-Я][а-я]+ [А-Я][а-я]+$"


def validate_name_intern(value):
    if not re.search(FULL_NAME_PATTERN, value):
        raise ValidationError("Введены некорректные данные, введите значение в формате: Фамилия Имя")


def validate_date_exam(value):
    if value < datetime.today().date():
        raise ValidationError("Дата зачета не может быть в прошлом")


class Exam(models.Model):
    result_list = [
        ("Не допущен", "Не допущен"),
        ("Допущен", "Допущен"),
        ("Неявка", "Неявка"),
        ("Отмена", "Отмена"),
        ("Не состоялось", "Не состоялось"),
    ]

    date_exam = models.DateField(blank=False, verbose_name="Дата зачета", validators=[validate_date_exam])
    name_intern = models.CharField(max_length=60, blank=False, verbose_name="Фамилия Имя стажера",
                                   validators=[validate_name_intern])
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
        unique_together = ["date_exam", "time_exam", "name_examiner"]

    def __str__(self):
        return f"{self.name_intern} {self.cc} {self.result_exam}"

    def validate_unique_exam(self, errors):
        if self.name_examiner is None:
            return
        if Exam.objects.filter(
                date_exam=self.date_exam,
                time_exam=self.time_exam,
                name_examiner=self.name_examiner
        ).exclude(id=self.pk).exists():
            errors.setdefault('name_examiner', []).append("Проверяющий уже записан на эту дату и время")
    #
    # def clean(self):
    #     errors = {}
    #     try:
    #         super().clean()
    #     except ValidationError as e:
    #         errors.update(e.message_dict)
    #
    #     self.validate_unique_exam(errors)
    #
    #     if errors:
    #         raise ValidationError(errors)
    #
    # def save(self, *args, **kwargs):
    #     self.full_clean()
    #     super().save(*args, **kwargs)

    # Альтернативный вариант метода save

    # def save(self, *args, **kwargs):
    #     try:
    #         self.clean()
    #     except ValidationError as e:
    #         raise
    #     super().save(*args, **kwargs)
