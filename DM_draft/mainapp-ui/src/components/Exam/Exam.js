import React, {useCallback, useEffect, useRef, useState} from 'react';
import axios from 'axios';
import './style_exam.css';
import { getCSRFToken } from '../utils/csrf';
import { useUser } from '../utils/get_user';
import { formatTime } from '../utils/formatTime';
import { add30Minutes } from '../utils/formatTime';
import Header from '../Header/Header';
import { useLocation } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow';
import InfoIcon from '../AllIcons/InfoIcon/InfoIcon'
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
  const lastRowRef = useRef(null); // Реф для последней строки

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Переключаем состояние модального окна
    if (isModalOpen) {
      setIsEditing(false); // Сбрасываем isEditing при закрытии модального окна
      setSelectedExamData(null); // Сбрасываем выбранные данные экзамена
    }
  };

 const fetchExamData = () => {
    axios.get('http://127.0.0.1:8000/api/exam/', {
      headers: {
        'X-company-id': selectedCompanyId // Добавляем заголовок, например для авторизации
      }
    })
      .then(response => {
        const data = response.data;

        if (mode === 'my_exams') {

          // Фильтр для отображения только "Моих зачётов"

          const filtered = data.filter(exam =>
            new Date(exam.date_exam).toLocaleDateString() === new Date().toLocaleDateString() &&
            exam.name_examiner === user.id
          );

          setFilteredData(filtered);
        } else if (user && user.company.name === 'DM') {
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

  const handleInternAdded = () => {
    fetchExamData();
  };

  const handleEditClick = (id) => {
  console.log("Editing exam with ID:", id); // Проверка id
    let url = '';
    if (user.company.name === 'DM') {
      url = `http://127.0.0.1:8000/api/exam/${id}/`;
    } else {
      url = `http://127.0.0.1:8000/api/add_intern/${id}/`;
    }


    axios.get(url)
      .then(response => {
      const examDataWithId = {
         ...response.data,
       id: id // Добавляем id в объект
         };
        setSelectedExamData(examDataWithId);
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
  // Убедимся, что ref привязан корректно к последнему элементу
  const setLastRowRef = useCallback((element) => {
    lastRowRef.current = element; // Привязываем реф к элементу
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.focus(); // Устанавливаем фокус на элемент
    }
  }, []);
  if (!user) {
    return <div>Загрузка...</div>;
  }

  const isButtonDisabled = (exam) => {
    const currentDate = new Date(new Date().toDateString());
    const examDate = new Date(exam.date_exam);

    // Если компания НЕ "DM", проверяем наличие заполненных полей
    if (user.company.name !== "DM") {
      return exam.time_exam !== "00:00:00" && exam.name_examiner_name;
    }

    // Если компания "DM", проверяем дату экзамена
    if (user.company.name === "DM") {
      return examDate < currentDate;
    }

    return false; // В остальных случаях кнопка активна
  };
  console.log(selectedExamData ? selectedExamData : "hfdbbflajsdliujf");


return (
  <div className="exam-header">
    <div className="header-content">
      <Header />

    <div className="exam-content">
      <div className='company'>
        {user.company.name === "DM" && (<h1>{selectedCompanyName}</h1>)}
      </div>
      <div className="exam-container">
        <div className="padding">
        <table className="exam-table">
            <thead className="scroll-thead">
              <tr>
                {mode === 'my_exams' && <th className="th">Компания</th>}
                <th className="th">Дата зачета</th>
                <th className="th">Фамилия Имя стажера</th>
                <th className="th">Форма обучения</th>
                <th className="th">Попытка</th>
                <th className="th">Время зачета</th>
                <th className="th">ФИ сотрудника</th>
                <th className="th">Результат</th>
                <th className="th">Комментарий</th>
                <th className="th">ФИ обучающего</th>
                <th className="th">ФИ принимающего внутренее ТЗ</th>
                <th className="hidden-header"> </th>
              </tr>
            </thead>
              <tbody className="scroll-tbody">
                {filteredData.length > 0 ? (
                  filteredData.map((exam, index) => (
                    <tr key={exam.id || exam.name_intern} ref={index === filteredData.length - 1 ? setLastRowRef : null} tabIndex="-1">
                      {mode === 'my_exams' && <td className="td">{exam.cc_name}</td>}
                      <td className="td">{new Date(exam.date_exam).toLocaleDateString()}</td>
                      <td className="td">
                        {exam.name_intern}
                        {exam.note ? (
                            <div className="custom-tooltip">
                              <button className="note-info">
                                <InfoIcon/>
                              </button>
                              <span className="tooltip-text">{exam.note}</span>
                            </div>
                        ) : ""}
                      </td>
                      <td className="td">{exam.training_form}</td>
                      <td className="td">{exam.try_count}</td>
                      <td className="td">{formatTime(exam.time_exam) === '00:00' ? '----' : `${formatTime(exam.time_exam)} - ${add30Minutes(exam.time_exam)}`}</td>
                      <td className="td">{exam.name_examiner_name || '----'}</td>
                      <td className="td">{exam.result_exam || '----'}</td>
                      <td className="td comments">{exam.comment_exam || company.name}</td>
                      <td className="td">{exam.name_train_name}</td>
                      <td className="td">{exam.internal_test_examiner_name}</td>

                      <td className="edit-button-cell">
                           <HandleEditClick
                              onClick={() => handleEditClick(exam.id)}
                              disabled={isButtonDisabled(exam)} // передаем значение disabled
                              style={{ position: 'relative', left: '20px' }}
                            />
                         {user.company.name === 'DM' && <DeleteExam onClick={() => handleDeleteClick(exam.id)} />}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan= {mode === 'my_exams' ? "11" : "10"} className="td">Нет данных для отображения</td>
                  </tr>
                )}
              </tbody>
            </table>
        </div>
      </div>
        {/* Кнопка добавления стажера */}
        {user.company.name !== 'DM' && <AddInternButton onClick={toggleModal} className='add-intern' />}

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
  </div>
);
}

export default Exam;