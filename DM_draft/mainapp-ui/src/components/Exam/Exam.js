import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style_exam.css';
import { useUser } from '../utils/get_user';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import AddInternButton from '../AddInternButton/AddInternButton';

function Exam() {
  const [examData, setExamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCompany = queryParams.get('company');
  const company = user ? user.company.name : '----';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  // Фильтрация данных после загрузки с сервера или обновления
  const filterData = (data) => {
    const currentCompany = selectedCompany || company;
    return data.filter(exam => exam.company === currentCompany);
  };

  // Функция для обновления данных с сервера
  const fetchExamData = () => {
    axios.get('http://127.0.0.1:8000/api/exam/')
      .then(response => {
        setExamData(response.data);
        setFilteredData(filterData(response.data));
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
      });
  };

  // Загружаем данные с сервера при монтировании компонента
  useEffect(() => {
    fetchExamData();
  }, [selectedCompany, company]);

  // Функция для добавления нового стажера в таблицу
  const handleInternAdded = () => {
    // После добавления нового стажера, вызываем fetchExamData для обновления данных
    fetchExamData();
  };


  if (!user) {
    return <div>Загрузка...</div>;
  }

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

           <ModalWindow onClose={toggleModal} onInternAdded={handleInternAdded} />

        </div>
      )}
    </div>
  );
}

export default Exam;
