import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style_exam.css';
import { useUser } from '../utils/get_user';

function Exam() {
  // Хуки на верхнем уровне
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [examData, setExamData] = useState([]);

  // Получаем данные пользователя
  const user = useUser();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/exam/')
      .then(response => {
        setExamData(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
      });
  }, []);

  // Проверка на наличие данных пользователя
  if (!user) {
    return <div>Загрузка...</div>;
  }

  // Извлечение конкретных данных, например company
  const company = user.company.name || '----'; // Добавляем значение по умолчанию
  const filteredData = examData.filter(exam => exam.company === company);

  return (
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
              <tr key={exam.id || exam.name_intern}> {/* Используем id или другое уникальное значение */}
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
  );
}

export default Exam;
