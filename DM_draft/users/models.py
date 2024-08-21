from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    company = models.ForeignKey('Companies', on_delete=models.PROTECT, verbose_name='Компания', null=False, default=1)
    post = models.CharField(max_length=20, verbose_name='Должность', null=True, blank=True)

    class Meta:
        verbose_name = 'Пользователя'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return self.username


class Companies(models.Model):
    name = models.CharField(max_length=20, verbose_name='Компания')
    slug = models.SlugField(db_index=True, unique=True, verbose_name='url')

    class Meta:
        verbose_name = 'Компанию'
        verbose_name_plural = 'Компании'

    def __str__(self):
        return self.name
