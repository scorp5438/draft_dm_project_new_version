# Generated by Django 4.2.15 on 2024-08-31 13:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('exam', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='exam',
            name='cc',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='users.companies', verbose_name='Компания'),
        ),
        migrations.AddField(
            model_name='exam',
            name='name_examiner',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='ФИ сотрудника'),
        ),
    ]
