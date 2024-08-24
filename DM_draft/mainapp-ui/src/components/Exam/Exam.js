import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style_exam.css';
import { useUser } from '../utils/get_user';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import Image from '../Image/Image';
import plus from '../../img/plus.svg';
import ModalWindow from '../ModalWindow/ModalWindow';

function Exam() {
  const [examData, setExamData] = useState([]);

  const user = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCompany = queryParams.get('company');
  const company = user ? user.company.name : '----';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
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

      <div className="add_intern">
      <button title="Добавить стажёра" className="add_intern_button" onClick={toggleModal}>
      <div>
        <Image image={plus} alt="plus" className="img" />
      </div>
        </button>
        </div>

      {/* Проверка отображения состояния */}
      <div>
        {isModalOpen ? 'Модальное окно открыто' : 'Модальное окно закрыто'}
      </div>

      {/* Условный рендеринг модального окна */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={toggleModal}>Закрыть</button>
            <ModalWindow />
          </div>
        </div>
      )}
    </div>
  );
}

export default Exam;
