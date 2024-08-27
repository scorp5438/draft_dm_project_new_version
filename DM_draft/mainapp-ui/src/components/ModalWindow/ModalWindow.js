import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf'; // Убедитесь, что этот метод правильно реализован
import "./style_modal_window.css";
import { useUser } from '../utils/get_user';


function ModalWindow({ onClose }) {
    const user = useUser();
    const company_id = user ? user.company.id: '';
    const [formData, setFormData] = useState({
        date_exam: '',
        name_intern: '',
        cc: '',
    });
    useEffect(() => {
        if (user) {
            setFormData(prevData => ({
                ...prevData,
                cc: user.company.id
            }));
        }
    }, [user]);
    // Обработка изменений в форме
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const csrfToken = getCSRFToken(); // Получение CSRF токена

            const response = await axios.post('http://127.0.0.1:8000/api/add_intern/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Включение CSRF токена в заголовке
                }
            });
            console.log('Данные успешно отправлены:', response.data);
            onClose(); // Закрытие модального окна после успешной отправки
        } catch (error) {
            console.error('Ошибка при отправке данных:', error.response ? error.response.data : error.message);
        }
    };

    return (
       <div className="modal-content">
        <div className="modal-top">
        <div>{company_id}</div>
            <form onSubmit={handleSubmit}>
                <label>
                    Дата экзамена:
                    <input
                        type="date"
                        name="date_exam"
                        value={formData.date_exam}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Имя стажера:
                    <input
                        type="text"
                        name="name_intern"
                        value={formData.name_intern}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button onClick={onClose} type="submit">Добавить</button>
            </form>
      </div>
      </div>
    );
}

export default ModalWindow;
