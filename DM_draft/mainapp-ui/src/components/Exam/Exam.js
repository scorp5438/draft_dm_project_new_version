import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style_exam.css';
import { useUser } from '../utils/get_user';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import AddInternButton from '../AddInternButton/AddInternButton';
import HandleEditClick from '../HandleEditClick/HandleEditClick';
import SearchBar from '../SearchBar/SearchBar';

function Exam() {
  const [examData, setExamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCompany = queryParams.get('company');
  const company = user ? user.company.name : '----';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedExamData, setSelectedExamData] = useState(null);


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Переключаем состояние модального окна
    if (isModalOpen) {
      setIsEditing(false); // Сбрасываем isEditing при закрытии модального окна
      setSelectedExamData(null); // Сбрасываем выбранные данные экзамена
    }
  };

  const filterData = (data) => {
    const currentCompany = selectedCompany || company;
    return data.filter(exam => exam.cc.name === currentCompany);
  };

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

  useEffect(() => {
    fetchExamData();
  }, [selectedCompany, company]);

  const handleInternAdded = () => {
    fetchExamData();
  };

  const handleEditClick = (id) => {
    axios.get(`http://127.0.0.1:8000/api/add_intern/${id}/`)
      .then(response => {
        setSelectedExamData(response.data);
        setSelectedExamId(id);
        toggleModal();
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
      });
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

return (
    <div className="exam__background">
      <div className="header-content">
        <Header />
      </div>
      <div className="exam-container">
        <div className="table-wrapper">
          <table className="exam-table">
            <thead>
              <tr>
                <th>Дата зачета</th>
                <th>Фамилия Имя стажера</th>
                <th>Время зачета</th>
                <th>ФИ сотрудника</th>
                <th>Результат</th>
                <th>Комментарий</th>
                <th>Действия</th>
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
                    <td className="edit-button-cell">
                      <HandleEditClick
                        onClick={() => handleEditClick(exam.id)}
                        style={{ position: 'relative', left: '20px' }}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Нет данных для отображения</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


      <AddInternButton onClick={toggleModal} />

      {isModalOpen && (
        <div className="modal-overlay">
          <ModalWindow
            onClose={toggleModal}
            onInternAdded={handleInternAdded}
            examData={selectedExamData}
            user={user}
            isEditing={Boolean(selectedExamData)}
          />
        </div>
      )}
    </div>
  );
}

export default Exam;
