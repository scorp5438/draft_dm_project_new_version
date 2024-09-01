import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style_exam.css';
import { getCSRFToken } from '../utils/csrf';
import { useUser } from '../utils/get_user';
import { formatTime } from '../utils/formatTime';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import DmExamEdit from '../DmExamEdit/DmExamEdit';
import AddInternButton from '../AddInternButton/AddInternButton';
import HandleEditClick from '../HandleEditClick/HandleEditClick';
import DeleteExam from '../DeleteExam/DeleteExam';

function Exam() {
  const [examData, setExamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCompany = queryParams.get('company');
  const company = user ? user.company : '----';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedExamData, setSelectedExamData] = useState(null);
  const csrfToken = getCSRFToken();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Переключаем состояние модального окна
    if (isModalOpen) {
      setIsEditing(false); // Сбрасываем isEditing при закрытии модального окна
      setSelectedExamData(null); // Сбрасываем выбранные данные экзамена
    }
  };

  const filterData = (data) => {
    if (company.id === 1) {
    console.log(company.id)
        const currentCompany = +selectedCompany;
        return data.filter(exam => exam.cc === currentCompany);
    }
    return data
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
    let url = '';
    if (user.company.name === 'DM') {
      url = `http://127.0.0.1:8000/api/exam/${id}/`;
    } else {
      url = `http://127.0.0.1:8000/api/add_intern/${id}/`;
    }

    axios.get(url)
      .then(response => {
        setSelectedExamData(response.data);
        setSelectedExamId(id);
        toggleModal();
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
      });
  };
const handleDeleteClick = (id) => {
  axios.delete(`http://127.0.0.1:8000/api/exam/${id}/`, {
    headers: {
      'X-CSRFToken': csrfToken
    }
  })
  .then(() => {
    fetchExamData();
  })
  .catch(error => {
    if (error.response) {
      console.error("Ошибка при удалении данных:", error.response.data);
    } else if (error.request) {
      console.error("Ответ не получен:", error.request);
    } else {
      console.error("Ошибка:", error.message);
    }
  });
};
  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
  <div className="exam-content">
  <Header />
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
      </table>
      <div className="scroll-table-body">
        <table className="exam-table">
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map(exam => (
                <tr key={exam.id || exam.name_intern}>
                  <td>{new Date(exam.date_exam).toLocaleDateString()}</td>
                  <td>{exam.name_intern}</td>
                  <td>{formatTime(exam.time_exam)}</td>
                  <td>{exam.name_examiner_name || '----'}</td>
                  <td>{exam.result_exam || '----'}</td>
                  <td>{exam.comment_exam || company.name}</td>
                  <td className="edit-button-cell">
                    <HandleEditClick
                      onClick={() => handleEditClick(exam.id)}
                      style={{ position: 'relative', left: '20px' }}
                    />
                    <DeleteExam onClick={() => handleDeleteClick(exam.id)} />
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
   </div>
{user.company.name !== 'DM' && <AddInternButton onClick={toggleModal} />}
  {isModalOpen && (
    <div className="modal-overlay">
      {user.company.name === 'DM' ? (
        <DmExamEdit
          onClose={toggleModal}
          onInternAdded={handleInternAdded}
          examData={selectedExamData}
        />
      ) : (
        <ModalWindow
          onClose={toggleModal}
          onInternAdded={handleInternAdded}
          examData={selectedExamData}
          user={user}
          isEditing={Boolean(selectedExamData)}
        />
      )}
    </div>
  )}
</div>
  );
}

export default Exam;