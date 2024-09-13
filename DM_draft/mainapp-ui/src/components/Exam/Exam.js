import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style_exam.css';
import { getCSRFToken } from '../utils/csrf';
import { useUser } from '../utils/get_user';
import { formatTime } from '../utils/formatTime';
import { add30Minutes } from '../utils/formatTime';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import DmExamEdit from '../DmExamEdit/DmExamEdit';
import AddInternButton from '../AddInternButton/AddInternButton';
import HandleEditClick from '../HandleEditClick/HandleEditClick';
import DeleteExam from '../DeleteExam/DeleteExam';
import { companies } from '../Header/Header';
import fetchCompanies from '../utils/getCompany';

function Exam() {
  const [examData, setExamData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const user = useUser();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get('mode');// Получаем параметр mode
  const selectedCompany = queryParams.get('company');
  const company = user ? user.company : '----';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
  const [selectedExamData, setSelectedExamData] = useState(null);
  const csrfToken = getCSRFToken();
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState('');


  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Переключаем состояние модального окна
    if (isModalOpen) {
      setIsEditing(false); // Сбрасываем isEditing при закрытии модального окна
      setSelectedExamData(null); // Сбрасываем выбранные данные экзамена
    }
  };
console.log(mode);
 const fetchExamData = () => {
    axios.get('http://127.0.0.1:8000/api/exam/')
      .then(response => {
        const data = response.data;

        if (mode === 'my_exams') {

          // Фильтр для отображения только "Моих зачётов"

          const filtered = data.filter(exam =>
            new Date(exam.date_exam).toLocaleDateString() === new Date().toLocaleDateString() &&
            exam.name_examiner === user.id
          );

          setFilteredData(filtered);
        } else if (user.company.name === 'DM') {
          // Если компания DM, загружаем полный список и фильтруем по выбранной компании
          const filtered = selectedCompanyId
            ? data.filter(exam => exam.cc === selectedCompanyId)
            : data; // Если компания не выбрана, отображаем весь список
          setFilteredData(filtered);
        } else {
          // Фильтр по компании для обычных пользователей
          const filtered = data;
          setFilteredData(filtered);
        }

        setExamData(data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
      });
  };
   console.log('олдпдлвпадл', user ? user.id : 'fjdlkjglkds');
   useEffect(() => {
  fetchCompanies().then(companiesData => {
    setCompanies(companiesData);
    const companySlug = queryParams.get('company'); // получаем slug из URL
    if (companySlug) {
      const selected = companiesData.find(company => company.slug === companySlug); // ищем компанию по slug
      if (selected) {
        setSelectedCompanyId(selected.id);
        setSelectedCompanyName(selected.name);
      }
    }
  });
}, [location.search]);
  useEffect(() => {
    fetchExamData();
  }, [selectedCompanyId, company]);
    console.log(companies);
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
  <div className="exam-table">
    <div className="header-content">
      <Header />
    </div>
    <div className="exam-content">
      <div className='company'>
        {user.company.name === "DM" && (<h1>{selectedCompanyName}</h1>)}
      </div>
      <div className='exam-fixed'>
      <div className="exam-container">
        <div className="table-wrapper">
          <table className="exam-table">
            <thead>
              <tr>
                {mode === 'my_exams' && <th>Компания</th>}
                <th>Дата зачета</th>
                <th>Фамилия Имя стажера</th>
                <th>Время зачета</th>
                <th>ФИ сотрудника</th>
                <th>Результат</th>
                <th>Комментарий</th>
                <th className="hidden-header">Действия</th>
              </tr>
            </thead>
          </table>
          <div className="scroll-table-body">
            <table className="exam-table">
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map(exam => (
                    <tr key={exam.id || exam.name_intern}>
                        {mode === 'my_exams' && <td>{exam.сс_name}</td>}
                      <td>{new Date(exam.date_exam).toLocaleDateString()}</td>
                      <td>{exam.name_intern}</td>
                      <td>{formatTime(exam.time_exam) === '00:00' ? '----' : `${formatTime(exam.time_exam)} - ${add30Minutes(exam.time_exam)}`}</td>
                      <td>{exam.name_examiner_name || '----'}</td>
                      <td>{exam.result_exam || '----'}</td>
                      <td className="td_scroll">{exam.comment_exam || exam.сс_name}</td>
                      <td className="edit-button-cell">
                        <HandleEditClick
                          onClick={() => handleEditClick(exam.id)}
                          style={{ position: 'relative', left: '20px' }}
                        />
                         {user.company.name === 'DM' && <DeleteExam onClick={() => handleDeleteClick(exam.id)} />}
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
        {/* Кнопка добавления стажера */}
        {user.company.name !== 'DM' && <AddInternButton onClick={toggleModal} className='add-intern' />}
      </div>
    </div>
</div>
    {/* Модальное окно */}
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