import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { getCSRFToken, setCSRFToken } from '../utils/csrf';
import routes from '../../context/Url';
import Image from '../Image/Image';
import image from '../../img/image.svg';
import background from '../../img/background.png';
import './style_authorization.css';


const Authorization = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value.trim();
    const password = event.target.password.value.trim();

    if (!username || !password) {
      setErrorMessage('Логин и пароль не могут быть пустыми');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    const csrfToken = getCSRFToken();

    try {
      const response = await fetch(routes.login, {
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
        console.log('Form submission response:', response);
        const text = await response.text();
        console.error('Ошибка ответа:', text);
        throw new Error('Ошибка сети или сервера');
      }

      const data = await response.json();
      console.log('submitForm() called with data:', data);
      if (data.success) {
          if (data.csrfToken) {
          setCSRFToken(data.csrfToken);
        }
        navigate(routes.main);
      } else {
        setErrorMessage('Неверный логин или пароль');
        setTimeout(() => setErrorMessage(''), 5000);
      }
    } catch (error) {
      setErrorMessage('Ошибка сети или сервера');
      setTimeout(() => setErrorMessage(''), 5000);
    }

  };

  return (
    <div className="container_auto">
      <div className="background">
        <Image background={background} alt="background" className="background" />
      </div>
      <div className="start-glass-bg">
        <Image image={image} alt="logo"/>
        <h2>Вход в личный кабинет</h2>
        <form className="registration-form" onSubmit={handleSubmit}>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <input type="hidden" name="csrfmiddlewaretoken" value={getCSRFToken()}/>
          <label htmlFor="username">
            <input className="input-auth"
                   type="text"
                   id="username"
                   name="username"
                   required
                   placeholder="Логин"
                   autoFocus
            /></label>
          <label htmlFor="password">
            <input className="input-auth"
                   type="password"
                   id="password"
                   name="password"
                   required
                   placeholder="Пароль"
            /></label>
          <button type="submit">Войти</button>
          <p>Если забыли логин и пароль, напишите менеджеру</p>
        </form>
      </div>
    </div>
  );
};

export default Authorization;
