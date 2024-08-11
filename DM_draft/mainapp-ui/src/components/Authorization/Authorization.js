import React from "react";
import Image from '../Image/Image';
import image from '../../img/image.png';
import background from '../../img/background.png';
import './style_authorization.css';
import { getCSRFToken } from '../utils/csrf';


class Authorization extends React.Component {



  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = event.target.elements;
    const csrfToken = this.getCookie('csrftoken');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        this.props.onLogin();
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  render() {
    return (
      <div className="container_img">
        <div className="background">
          <Image background={background} alt="background" className="background" />
        </div>
        <div className="start-glass-bg">
          <Image image={image} alt="Logo" className="logo" />
          <form className="registration-form" onSubmit={this.handleSubmit} method="POST">
            <h2>Вход в личный кабинет</h2>
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