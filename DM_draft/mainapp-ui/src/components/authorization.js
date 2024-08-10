import React from "react";
import Image from './image';
import image from '../img/image.png';
import background from '../img/background.png';
import '../css/style_authorization.css';

class Authorization extends React.Component {
 render() {
  return (
<div className="container_img">
  <div className="background">
  <Image background={background} alt="background" className="background"/>
  </div>
    <div className="start-glass-bg">
    <Image image={image} alt="Logo" className="logo"/>
        <form className="registration-form">
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
