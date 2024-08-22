import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style_exam.css';

function Exam() {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: 'http://127.0.0.1:8000/api/exam/'
      })
      .then(response => {
        setExamData(response.data);
      })
      .catch(error => {
        console.error("Ошибка при загрузке данных:", error);
      });
  }, []);

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
          {examData.map((exam, index) => (
            <tr key={index}>
              <td>{new Date(exam.date_exam).toLocaleDateString()}</td>
              <td>{exam.name_intern}</td>
              <td>{exam.time_exam}</td>
              <td>{exam.name_examiner || '----'}</td>
              <td>{exam.result_exam || '----'}</td>
              <td>{exam.comment_exam || '----'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Exam;
