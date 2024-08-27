import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';
import "./style_modal_window.css";
import { useUser } from '../utils/get_user';
import Image from '../Image/Image';
import cross from '../../img/cross.svg';

function ModalWindow({ onClose, onInternAdded }) {
    const user = useUser();
    const [formData, setFormData] = useState({
        date_exam: '',
        name_intern: '',
        cc: '',
    });

    const [errors, setErrors] = useState({}); // Для хранения ошибок

    useEffect(() => {
        if (user) {
            setFormData(prevData => ({
                ...prevData,
                cc: user.company.id
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

const formatErrors = (errors) => {
    const formattedErrors = {};

    for (const [key, value] of Object.entries(errors)) {
        if (key === 'date_exam') {
            // Преобразование сообщений об ошибках для даты
            formattedErrors[key] = value.map(err => {
                // Если ошибка связана с неправильным форматом даты, заменяем её на своё сообщение
                if (err.includes('Неправильный формат date')) {
                    return 'Поле пустое или формат даты неверен.';
                }
               return err;
            });
        } else {
            // Оставляем ошибки для других полей без изменений
            formattedErrors[key] = value;
        }
    }

    return formattedErrors;
};


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = getCSRFToken(); // Получение CSRF токена

            const response = await axios.post('http://127.0.0.1:8000/api/add_intern/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                }
            });

            onInternAdded(response.data);
            onClose();  // Закрываем модальное окно после успешного добавления стажера
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Преобразование и установка ошибок в состояние
                const formattedErrors = formatErrors(error.response.data);
                setErrors(formattedErrors);
                console.log('Ошибки с сервера:', formattedErrors);
            } else {
                console.error('Ошибка при отправке данных:', error.message);
            }
        }
    };
    return (
        <div className="modal-content">
            <div className="modal-top">
                <button className="close-modal" onClick={onClose}>
                    <Image image={cross} alt="cross" className="cross" />
                </button>
                <form onSubmit={handleSubmit}>
                    <label>
                        Дата экзамена:
                        <input
                            type="date"
                            name="date_exam"
                            value={formData.date_exam}
                            onChange={handleChange}
                        />
                        {errors.date_exam && <p className="error">{errors.date_exam[0]}</p>} {/* Отображение ошибки */}
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
                        {errors.name_intern && <p className="error">{errors.name_intern[0]}</p>} {/* Отображение ошибки */}
                    </label>
                    <br />
                    <button type="submit">Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default ModalWindow;
