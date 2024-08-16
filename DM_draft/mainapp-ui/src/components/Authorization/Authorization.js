import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCSRFToken } from '../utils/csrf';
import Image from '../Image/Image';
import image from '../../img/image.png';
import background from '../../img/background.png';
import './style_authorization.css';
import Main from '../Main/Main'
import { login } from '../../api';

const Authorization = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); // Состояние для хранения сообщения об ошибке

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value.trim();
    const password = event.target.password.value.trim();

    // Проверка, что поля не пустые
    if (!username || !password) {
      setErrorMessage('Логин и пароль не могут быть пустыми'); // 3. Устанавливаем сообщение об ошибке для пустых полей
      setTimeout(() => setErrorMessage(''), 5000); // Устанавливаем таймер для скрытия сообщения через 5 секунд
      return;
    }

    const csrfToken = getCSRFToken();

    try {
      const response = await fetch('/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        credentials: 'include',
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Ошибка ответа:', text);
        throw new Error('Ошибка сети или сервера');
      }

      const data = await response.json();
      console.log('Response Data:', data);

      if (data.success) {
        navigate('/');
      } else {
        setErrorMessage('Неверный логин или пароль'); // Устанавливаем сообщение об ошибке
        setTimeout(() => setErrorMessage(''), 5000); // Устанавливаем таймер для скрытия сообщения через 5 секунд

      }
    } catch (error) {
      setErrorMessage('Ошибка сети или сервера'); // Устанавливаем сообщение об ошибке
      setTimeout(() => setErrorMessage(''), 5000); // Устанавливаем таймер для скрытия сообщения через 5 секунд
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
          {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Отображение ошибки */}
        </form>
      </div>
    </div>
  );
};

export default Authorization;
