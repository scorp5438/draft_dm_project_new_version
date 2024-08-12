import React from "react";
import { getCSRFToken } from '../../utils/csrf';
import Image from '../Image/Image';
import image from '../../img/image.png';
import background from '../../img/background.png';
import './style_authorization.css';

class Authorization extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();

    const csrfToken = getCSRFToken();

    // Пример отправки запроса с CSRF-токеном
    fetch('/your-login-url/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value
      })
    })
    .then(response => response.json())
    .then(data => {
      // Обработка ответа от сервера
      if (data.success) {
        this.props.onLogin();
      } else {
        // Обработка ошибки
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
    });
  };

  render() {
    return (
      <div className="container_img">
        <div className="background">
          <Image background={background} alt="background" className="background" />
        </div>
        <div className="start-glass-bg">
          <Image image={image} alt="Logo" className="logo" />
          <form className="registration-form" onSubmit={this.handleSubmit}>
            <h2>Вход в личный кабинет</h2>
            <input type="hidden" name="csrfmiddlewaretoken" value={getCSRFToken()} />
            <label htmlFor="username"></label>
            <input type="text" id="username" name="username" required placeholder="Логин" autoFocus />
            <label htmlFor="password"></label>
            <input type="password" id="password" name="password" required placeholder="Пароль" />
            <button type="submit">Войти</button>
            <p>Если забыли логин и пароль, напишите менеджеру</p>
          </form>
        </div>
      </div>
    );
  }
}

export default Authorization;
