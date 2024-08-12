import React from 'react';
import { useNavigate } from 'react-router-dom';  // Импортируйте useNavigate из react-router-dom
import { getCSRFToken } from '../utils/csrf';  // Убедитесь, что этот файл существует и возвращает CSRF токен
import Image from '../Image/Image';  // Убедитесь, что компонент Image существует и работает
import image from '../../img/image.png';  // Убедитесь, что пути к изображениям правильные
import background from '../../img/background.png';  // Убедитесь, что пути к изображениям правильные
import './style_authorization.css';  // Убедитесь, что путь к CSS правильный

const Authorization = () => {
  const navigate = useNavigate();  // Инициализация useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    const csrfToken = getCSRFToken();  // Получение CSRF токена

    try {
      const response = await fetch('/auth/', {  // Убедитесь, что URL правильный
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
        }),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/main');  // Перенаправление на главную страницу
      } else {
        console.error('Ошибка при входе:', data.message);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return (
    <div className="container_img">
      <div className="background">
        <Image background={background} alt="background" className="background" />
      </div>
      <div className="start-glass-bg">
        <Image image={image} alt="Logo" className="logo" />
        <form className="registration-form" onSubmit={handleSubmit}>
          <h2>Вход в личный кабинет</h2>
          <input type="hidden" name="csrfmiddlewaretoken" value={getCSRFToken()} />
          <label htmlFor="username"></label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Логин"
            autoFocus
          />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Пароль"
          />
          <button type="submit">Войти</button>
          <p>Если забыли логин и пароль, напишите менеджеру</p>
        </form>
      </div>
    </div>
  );
};

export default Authorization;
