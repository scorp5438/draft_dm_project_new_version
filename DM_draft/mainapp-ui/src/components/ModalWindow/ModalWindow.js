import React, { useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf'; // Предполагаем, что у вас есть этот метод для получения CSRF токена
import "./style_modal_window.css";
function ModalWindow() {
    const [formData, setFormData] = useState({
        date_exam: '',
        name_intern: ''
    });

    // Обработка изменения формы
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = getCSRFToken(); // Получаем CSRF токен

            const response = await axios.post('/api/add_intern/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken  // Используем CSRF токен в заголовке
                }
            });
            console.log('Data submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting data:', error.response ? error.response.data : error.message);
        }
    };

    return (
       <div className="modal-content">
        <div className="modal-top">
            <form onSubmit={handleSubmit}>
                <label>
                    Date Exam:
                    <input
                        type="date"
                        name="date_exam"
                        value={formData.date_exam}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Name Intern:
                    <input
                        type="text"
                        name="name_intern"
                        value={formData.name_intern}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Добавить</button>
            </form>
        </div>
      </div>
    );
}

export default ModalWindow;
