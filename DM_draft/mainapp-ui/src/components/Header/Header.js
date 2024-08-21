import React, { useState, useEffect } from "react";
import Image from '../Image/Image';
import test from '../../img/test.svg';
import checklist from '../../img/checklist.svg';
import person from '../../img/person.svg';
import image from '../../img/image.png';
import './style_header.css';
import Clock from '../Clock/Clock';
import axios from 'axios';
import routes from '../../context/Url';

function Header() {
 const [user, setUser] = useState(null);

  useEffect(() => {
    // Очистка localStorage перед загрузкой данных
    localStorage.removeItem('user');

    // Выполнение запроса к API при монтировании компонента
    axios({
      method: "GET",
      url: 'http://127.0.0.1:8000/api/user_login/'
    })
    .then(response => {
      const userData = response.data[0]; // Предполагаем, что response.data - это массив, и берем первый элемент
      setUser(userData);
      // Сохраняем данные в localStorage
      localStorage.setItem('user', JSON.stringify(userData));
    })
    .catch(error => {
      console.error("Ошибка при запросе пользователя:", error);
    });
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
  };
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
                <a href='#'><button className="header-nav-button" title="Раздел по тестированию">
                  <Image image={test} alt="test" />
                </button></a>
              </div>
                  <div className="header-nav-item">
                    <a href='#'><button className="header-nav-button" title="Раздел по чек-листам">
                      <Image image={checklist} alt="checklist" />
                    </button></a>
                  </div>
                          <div className="header-nav-item ">
                            <button className="header-nav-button person" title="Ваш личный кабинет"  onClick={toggleMenu}>

                            <div><Image image={person} alt="person" className="person" /></div>
                              <div><p>{user ? user.username : "Личный кабинет"}</p></div>

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
