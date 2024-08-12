# Команды для начала работы
### Перед началом свяжись с руководителем чтобы тебя добавили в коллабу!
## Подключение репозитория
* ВАЖНО! git init
* git remote add origin https://github.com/scorp5438/draft_dm_project_new_version.git
## Смена основной ветки на "main"
* git branch -M main
## Загрузка проекта на компьютер
* git pull https://github.com/scorp5438/draft_dm_project_new_version.git main
* ВАЖНО! Первое получение обновлений происходит командой git pull в терминале
## Установка ПО для работы (проверь что в строке приглашения ты в корне всего проекта)
* pip install -r moduls.txt

## Установка `Node.js и npm` на Windows
1. **Установить Node.js и npm проще с официального сайта :**

https://nodejs.org/

![Создание и обьединение файлов](/img_readme/Screenshot_1.jpg)

Скачаваеь последнюю LTS (Long-Term Support) версию.
Запускаем установщик и следуем инструкциям. Нужно убедиться, что опция "Установить npm" выбрана.

2. **После того как Node.js и npm установлены, надо открыть терминал в PyCharm и проверить версии:**

        node --version
        npm --version


Эти команды должны вернуть установленные версии Node.js и npm, что будет означать успешную установку.

3. **Создание React приложения:**

          npx create-react-app mainapp-ui !!!(ДЕЛАТЬ НЕ НАДО, ДЕЛАЕТСЯ ОДИН РАЗ ПРИ СОЗДАНИИ ПРИЛОЖЕНИЯ)
          npm install react-scripts
          npm run build

В директории с файлом manage.py выполняется команда в терминале:

         python manage.py collectstatic --noinput

Данная команда собирает все статические файлы из разных приложений (в нашем случае из приложения `React`) и модулей и помещает в одну общую папку проекта `Django`.

4. **Команда для старта сервера на Django:**

         python manage.py runserver

После запуска наш проект работает на http://127.0.0.1:8000/

