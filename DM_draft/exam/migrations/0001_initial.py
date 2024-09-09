# Generated by Django 4.2.15 on 2024-09-09 08:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import exam.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('users', '0002_alter_user_post'),
    ]

    operations = [
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_exam', models.DateField(validators=[exam.models.validate_date_exam], verbose_name='Дата зачета')),
                ('name_intern', models.CharField(max_length=60, validators=[exam.models.validate_name_intern], verbose_name='Фамилия Имя стажера')),
                ('time_exam', models.TimeField(blank=True, default='00:00', verbose_name='Время зачета')),
                ('result_exam', models.CharField(blank=True, choices=[('Не допущен', 'Не допущен'), ('Допущен', 'Допущен'), ('Неявка', 'Неявка'), ('Отмена', 'Отмена'), ('Не состоялось', 'Не состоялось')], default='', max_length=25, verbose_name='Результат')),
                ('comment_exam', models.TextField(blank=True, max_length=2000, verbose_name='комментарий')),
                ('cc', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='users.companies', verbose_name='Компания')),
                ('name_examiner', models.ForeignKey(blank=True, limit_choices_to={'post': 'OKK'}, null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='ФИ сотрудника')),
            ],
            options={
                'verbose_name': 'Зачет',
                'verbose_name_plural': 'Зачеты',
            },
        ),
    ]
