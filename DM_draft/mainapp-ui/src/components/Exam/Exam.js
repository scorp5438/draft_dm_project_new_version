// src/components/Exam/Exam.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style_exam.css';
import { useUser } from '../utils/get_user';
import Header from '../Header/Header';
import Image from '../Image/Image';
import cross from '../../img/cross.svg';
import { useLocation } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import AddInternButton from '../AddInternButton/AddInternButton'; // Импорт нового компонента

function Exam() {
  const [examData, setExamData] = useState([]);
  const user = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCompany = queryParams.get('company');
  const company = user ? user.company.name : '----';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    console.log("Кнопка нажата, меняем состояние модального окна");
    console.log("Предыдущее состояние:", isModalOpen);
    setIsModalOpen(prevState => !prevState);
    console.log("Новое состояние:", !isModalOpen);
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/exam/')
      .then(response => {
        setExamData(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
      });
  }, []);

  if (!user) {
    return <div>Загрузка...</div>;
  }

  const currentCompany = selectedCompany || company;
  const filteredData = examData.filter(exam => exam.company === currentCompany);

  return (
    <div className="header-content">
      <Header />
      <div className="exam-container">
        <table className="exam-table">
          <thead>
            <tr>
              <th>Дата зачета</th>
              <th>Фамилия Имя стажера</th>
              <th>Время зачета</th>
              <th>ФИ сотрудника</th>
              <th>Результат</th>
              <th>Комментарий</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(exam => (
                <tr key={exam.id || exam.name_intern}>
                  <td>{new Date(exam.date_exam).toLocaleDateString()}</td>
                  <td>{exam.name_intern}</td>
                  <td>{exam.time_exam}</td>
                  <td>{exam.name_examiner || '----'}</td>
                  <td>{exam.result_exam || '----'}</td>
                  <td>{exam.comment_exam || company}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Нет данных для отображения</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AddInternButton onClick={toggleModal} />

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={toggleModal}><Image image={cross} alt="cross" className="cross" /></button>
            <ModalWindow />
          </div>
        </div>
      )}
    </div>
  );
}

export default Exam;
