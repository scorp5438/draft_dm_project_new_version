import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Image from '../Image/Image'
import Testing from '../AllIcons/Testing/Testing';
import CheckList from '../AllIcons/CheckList/CheckList';
import Person from '../AllIcons/Person/Person';
import person from '../../img/person.svg';
import image from '../../img/image.svg';
import CircleIcon from '../AllIcons/CircleIcon/CircleIcon'
import './style_header.css';
import Clock from '../Clock/Clock';
import routes from '../../context/Url';
import { useUser } from '../utils/get_user';
import axios from 'axios';
import { createUrlWithParams } from '../utils/urlHelper';
import moment from 'moment-timezone';
import au from './alert.mp3';

function Header() {
  const user = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const hamburgerMenuRef = useRef(null);
  const personalMenuRef = useRef(null);
  const [examData, setExamData] = useState(null); // Новое состояние для данных экзамена
  const [hasExam, setHasExam] = useState(false); // Новое состояние для hasExam
  const [examCountByCompany, setExamCountByCompany] =  useState({});
  const [dataArray, setDataArray] = useState([]);
  const [hasEmptyFields, setHasEmptyFields] = useState(false);
  const [companyCounts, setCompanyCounts] = useState({});
  let [currentExams, setCurrentExams] = useState(0);

  const checkExamTime = (exam) => {
    const examTime = moment.tz(exam.time_exam, 'HH:mm', 'Europe/Moscow'); // время зачета в московском часовом поясе
    console.log(examTime ? examTime : "examTime")
    const moscowTime = moment.tz('Europe/Moscow'); // текущее время в московском часовом поясе
    console.log(moscowTime ? moscowTime : "moscowTime")
    const diff = examTime.diff(moscowTime, 'minutes');
    if (diff <= 30 && diff >= 0) {
      // отображаем уведомление и звуковой сигнал
      var audio = new Audio(au);
      // audio.play();
      // alert(`Уведомление: до зачета со стажером ${exam.name_intern} осталось ${diff} минут!`);
    }
  };
  
  
  
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
  // Запрос к API на получение данных экзамена
  console.log(user ? user.company : 'Компания');

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.company.name !== "DM"){
      return;
    }

    const fetchApiData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/exam/');
        const data = response.data;
        const dataArray = data;
        let hasEmptyFields = false;
        dataArray.forEach(item => {
          if (!item.name_examiner || !item.time_exam) {
            hasEmptyFields = true;
          }
        });
        const companyCounts = {};
        dataArray.forEach(item => {
          if (!item.name_examiner || !item.time_exam) {
            if (!companyCounts[item.cc]) {
              companyCounts[item.cc] = 0;
            }
            companyCounts[item.cc]++;
          }
        });
        let currentExams = 0;
        if (user) {
          dataArray.forEach(item => {
            if (item.name_examiner === user.id &&
                new Date(item.date_exam).toLocaleDateString() === new Date().toLocaleDateString()) {
              if (!item.result_exam) {
                currentExams++;

              }
            }
          });
        };

        dataArray.forEach((exam) => {
          if (exam.name_examiner === user.id && new Date(exam.date_exam).toLocaleDateString() === new Date().toLocaleDateString()) {
            checkExamTime(exam);
          }
        });
        setCurrentExams(currentExams);
        setHasEmptyFields(hasEmptyFields);
        setCompanyCounts(companyCounts);

      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    fetchApiData();

    const intervalId = setInterval(fetchApiData, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [user, dataArray]);


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
              <div className="signal-test">
                {hasEmptyFields && (
                    <div className="circle"><CircleIcon/></div>)}
                <button className="header-nav-button" title="Раздел по тестированию" onClick={handleButtonClick}>
                  <Testing/><p> Тестирование </p></button>
              </div>
            </label>
            {isHamburgerMenuOpen && (
                <div className="hamburger-menu" ref={hamburgerMenuRef}>
                  {companies.map(company => (
                      <div className="link-counter">
                        <div key={company.id} onClick={() => handleCompanyChange(company.slug)}><a>{company.name}</a></div>
                        <div>{(companyCounts[company.id] ?? null) && (<span className="count-my-exam">{companyCounts[company.id]}</span>)}</div>
                            < /div>
                          ))}
                        </div>
            )}
          </div>
          <div className="header-nav-item">
            <a href="#">
              <button className="header-nav-button" title="Раздел по чек-листам">
                <div><CheckList /></div><p>Чек-лист</p>
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

              title="Ваш личный кабинет">
              <div className="signal-test">
                {currentExams > 0 && (
                    <div className="circle"><CircleIcon/></div>)}
                <div className="header-nav-button_person">
                <div><Person/></div>
                <div><p>{user ? username : "Личный кабинет"}</p></div></div>
              </div>

            </label>
             <div ref={personalMenuRef} className={`menu-active ${isMenuOpen ? 'show' : 'hidden'}`}>
              <div><a href={routes.admin}>Админ панель</a></div>
               <div className="num-exam"><a href={createUrlWithParams(routes.exam, {mode: 'my_exams'})} key={user.id}>Мои зачёты</a><span>
                 {currentExams > 0 && (<span className="count-my-exam">{currentExams}</span>)}</span></div>
               <div><a href={routes.logout}>Выход</a></div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Header;