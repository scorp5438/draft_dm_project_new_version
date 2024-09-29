import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Image from '../Image/Image'
import Test from '../AllIcons/Test/Test';
import CheckList from '../AllIcons/CheckList/CheckList';
import Person from '../AllIcons/Person/Person';
import person from '../../img/person.svg';
import image from '../../img/image.svg';
import './style_header.css';
import Clock from '../Clock/Clock';
import routes from '../../context/Url';
import { useUser } from '../utils/get_user';
import axios from 'axios';
import { createUrlWithParams } from '../utils/urlHelper';

function Header() {
  const user = useUser();
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
    navigate(url);
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

  if (!user) {
    return <div>Загрузка...</div>;
  }

  const username = user.username;
  const userCompany = user.company.name;
  const handleButtonClick = () => {
    if (userCompany === 'DM') {
      if (companies.length === 0) {
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
      navigate(routes.exam);
    }
  };
    const handleLogoClick = () => {
    navigate(routes.main);
  };

  return (
    <div className="container-img">
      <div className="background" />
      <div className="header-container">
        <div className="header-logo">
          <a className="logo" onClick={handleLogoClick}><Image image={image} classNames={{ image: 'logo-image' }}/></a>
        </div>

        <div className="header-navigation">
          <div className="clock-time">
            <Clock />
          </div>
          <div className="header-nav-item">
            <input
              type="checkbox"
              id="hamburgerMenuToggle"
              checked={isHamburgerMenuOpen}
              onChange={toggleHamburgerMenu}
              style={{ display: 'none' }}
            />
            <label htmlFor="hamburgerMenuToggle">
              <button className="header-nav-button" title="Раздел по тестированию" onClick={handleButtonClick}>
                <Test width="32px" height="32px" fill="#0068E2" /><p>Тестирование</p>
              </button>
            </label>
            {isHamburgerMenuOpen && (
              <div className="hamburger-menu" ref={hamburgerMenuRef}>
                {companies.map(company => (
                  <div key={company.id} onClick={() => handleCompanyChange(company.slug)}>
                    <a>{company.name}</a>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="header-nav-item">
            <a href="#">
              <button className="header-nav-button" title="Раздел по чек-листам">
                <CheckList width="32px" height="32px" fill="#0068E2" /><p>Чек-лист</p>
              </button>
            </a>
          </div>
           <div className="header-nav-item">
            <input
              type="checkbox"
              id="personalMenuToggle"
              checked={isMenuOpen}
              onChange={toggleMenu}
              style={{ display: 'none' }}
            />
            <label
              htmlFor="personalMenuToggle"
              className="header-nav-button_person"
              title="Ваш личный кабинет"
            >
              <div><Person width="32px" height="32px" fill="none" /></div>
              <div><p>{user ? username : "Личный кабинет"}</p></div>
            </label>
            <div ref={personalMenuRef} className={`menu-active ${isMenuOpen ? 'show' : 'hidden'}`}>
              <div><a href={routes.admin}>Админ панель</a></div>
              <div><a href={createUrlWithParams(routes.exam, { mode: 'my_exams' })} key={user.id}>Мои зачёты</a></div>
              <div><a href={routes.logout}>Выход</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;