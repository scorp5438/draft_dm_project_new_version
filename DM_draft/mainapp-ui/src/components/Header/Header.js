import React, { useState, useEffect } from "react";
import Image from '../Image/Image';
import test from '../../img/test.svg';
import checklist from '../../img/checklist.svg';
import image from '../../img/image.png';
import './style_header.css';
import Clock from '../Clock/Clock'
import axios from 'axios';


function Header() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверяем наличие пользователя в localStorage
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Выполнение запроса к API при монтировании компонента
      axios({
        method: "GET",
        url: 'http://127.0.0.1:8000/api/user_login/'
      })
      .then(response => {
        // Предполагаем, что response.data - это массив, и берем первый элемент
        const userData = response.data[0];
        setUser(userData);
        // Сохраняем данные в localStorage
        localStorage.setItem('user', JSON.stringify(userData));
      })
      .catch(error => {
        console.error("Ошибка при запросе пользователя:", error);
      });
    }
  }, []);

  return (
    <div className="container_img">
      <div className="background" />
      <div className="header-container">
        <div className="header-logo">
         <a><Image image={image} alt="Logo" className="logo" /></a></div>

        <div className="header-navigation">
         <div className="clock-time">
         <Clock /></div>
          <div className="header-nav-item">
            <button className="header-nav-button" title="Раздел по тестированию">
              <Image image={test} alt="test"/>Тестирование</button>
          </div>
          <div className="header-nav-item">
            <button className="header-nav-button" title="Раздел по чек-листам">
              <Image image={checklist} alt="checklist" />Чек листы</button>
          </div>
          <div className="header-nav-item">
            <button className="header-nav-button" title="Ваш личный кабинет">
              <h2>{user ? user.username : "Личный кабинет"}</h2>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
