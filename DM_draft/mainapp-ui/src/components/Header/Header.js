import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Image from '../Image/Image';
import test from '../../img/test.svg';
import checklist from '../../img/checklist.svg';
import person from '../../img/person.svg';
import image from '../../img/image.png';
import './style_header.css';
import Clock from '../Clock/Clock';
import routes from '../../context/Url';
import { useUser } from '../utils/get_user';

function Header() {
  const user = useUser(); // Получаем все данные пользователя

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Проверка на наличие данных пользователя
  if (!user) {
    return <div>Загрузка...</div>;
  }

  // Извлечение конкретных данных, например username
  const username = user.username;

  return (
    <div className="container_img">
      <div className="background" />
      <div className="header-container">
        <div className="header-logo">
          <a><Image image={image} alt="Logo" className="logo" /></a>
        </div>

        <div className="header-navigation">
          <div className="clock-time">
            <Clock />
          </div>
          <div className="header-nav-item">
            <Link to={routes.exam}>
              <button className="header-nav-button" title="Раздел по тестированию">
                <Image image={test} alt="test" />
              </button>
            </Link>
          </div>
          <div className="header-nav-item">
            <a href="#">
              <button className="header-nav-button" title="Раздел по чек-листам">
                <Image image={checklist} alt="checklist" />
              </button>
            </a>
          </div>
          <div className="header-nav-item">
            <button className="header-nav-button person" title="Ваш личный кабинет" onClick={toggleMenu}>
              <div><Image image={person} alt="person" className="person" /></div>
              <div><p>{user ? username : "Личный кабинет"}</p></div>
            </button>
          </div>
          <div className={`menu-active ${isMenuOpen ? '' : 'hidden'}`}>
            <div><a href={routes.admin}>Админ панель</a></div>
            <div><a href={routes.logout}>Выход</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
