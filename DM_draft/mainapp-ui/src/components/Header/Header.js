import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Image from '../Image/Image';
import test from '../../img/test.svg';
import checklist from '../../img/checklist.svg';
import person from '../../img/person.svg';
import image from '../../img/image.svg';
import './style_header.css';
import Clock from '../Clock/Clock';
import routes from '../../context/Url';
import { useUser } from '../utils/get_user';
import axios from 'axios';
import { createUrlWithParams } from '../utils/urlHelper';

function Header() {
  const user = useUser(); // Получаем все данные пользователя
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const hamburgerMenuRef = useRef(null);
  const personalMenuRef = useRef(null);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
  };

  const handleCompanyChange = (company) => {
    const url = createUrlWithParams(routes.exam, { company });
    navigate(url); // Переход на страницу с выбранной компанией
    setIsHamburgerMenuOpen(false);
  };
useEffect(() => {
    function handleClickOutside(event) {
      if (hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target)) {
        setIsHamburgerMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hamburgerMenuRef]);

  // Закрытие меню личного кабинета при клике вне его области
  useEffect(() => {
    function handleClickOutside(event) {
      if (personalMenuRef.current && !personalMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [personalMenuRef]);

  // Проверка на наличие данных пользователя
  if (!user) {
    return <div>Загрузка...</div>;
  }

  // Извлечение данных пользователя
  const username = user.username;
  const userCompany = user.company.name; // Имя компании пользователя

  // Функция обработки клика по кнопке
  const handleButtonClick = () => {
    if (userCompany === 'DM') {
      // Показать гамбургер-меню с выбором компаний
      if (companies.length === 0) {
        // Загружаем список компаний
        axios.get('http://127.0.0.1:8000/api/companies/')
          .then(response => {
            setCompanies(response.data);
          })
          .catch(error => {
            console.error("Ошибка при загрузке списка компаний:", error);
          });
      }
      toggleHamburgerMenu();
    } else {
      // Переход по фиксированной ссылке
      navigate(routes.exam);
    }
  };

  return (
    <div className="container_img">
      <div className="background" />
      <div className="header-container">
        <div className="header-logo">
          <a><Image image={image} alt="Logo"/></a>
        </div>

        <div className="header-navigation">
          <div className="clock-time">
            <Clock />
          </div>
          <div className="header-nav-item">
            <button className="header-nav-button" title="Раздел по тестированию" onClick={handleButtonClick}>
              <Image image={test} alt="test" />
            </button>
            {isHamburgerMenuOpen && (
              <div className="hamburger-menu" ref={hamburgerMenuRef}>
                {companies.map(company => (
                  <div key={company.id} onClick={() => handleCompanyChange(company.name)}>
                    <a>{company.name}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="header-nav-item">
            <a href="#">
              <button className="header-nav-button" title="Раздел по чек-листам">
                <Image image={checklist} alt="checklist" />
              </button>
            </a>
          </div>
          <div className="header-nav-item">
            <button className="header-nav-button_person" title="Ваш личный кабинет" onClick={toggleMenu}>
              <div><Image image={person} alt="person" className="person" /></div>
              <div><p>{user ? username : "Личный кабинет"}</p></div>
            </button>
          </div>
          <div ref={personalMenuRef}  className={`menu-active ${isMenuOpen ? '' : 'hidden'}`}>
            <div><a href={routes.admin}>Админ панель</a></div>
            <div><a href={routes.logout}>Выход</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
