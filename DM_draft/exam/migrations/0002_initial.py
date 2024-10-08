# Generated by Django 4.2.15 on 2024-09-16 13:45

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('exam', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='exam',
            name='cc',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='users.companies', verbose_name='Компания'),
        ),
        migrations.AddField(
            model_name='exam',
            name='internal_test_examiner',
            field=models.ForeignKey(limit_choices_to={'post': 'admin'}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='internal_test_exams', to=settings.AUTH_USER_MODEL, verbose_name='ФИ принимающего внутреннее ТЗ'),
        ),
        migrations.AddField(
            model_name='exam',
            name='name_examiner',
            field=models.ForeignKey(blank=True, limit_choices_to={'post': 'OKK'}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='name_examiner', to=settings.AUTH_USER_MODEL, verbose_name='ФИ сотрудника'),
        ),
        migrations.AddField(
            model_name='exam',
            name='name_train',
            field=models.ForeignKey(limit_choices_to={'post': 'admin'}, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='name_train', to=settings.AUTH_USER_MODEL, verbose_name='ФИ обучающего/обучающих'),
        ),
        migrations.AlterUniqueTogether(
            name='exam',
            unique_together={('date_exam', 'time_exam', 'name_examiner')},
        ),
    ]
