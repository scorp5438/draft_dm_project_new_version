import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';
import "./style_modal_window.css";
import { useUser } from '../utils/get_user';
import Image from '../Image/Image';
import cross from '../../img/cross.svg';

function ModalWindow({ onClose, onInternAdded, examData, user, isEditing}) {
    const [formData, setFormData] = useState({
        date_exam: '',
        name_intern: '',
        cc: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (user) {
            setFormData({
                cc: examData ? examData.cc : user.company.id,
                date_exam: examData ? examData.date_exam : '',
                name_intern: examData ? examData.name_intern : '',
            });
        }
    }, [examData, user]);

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
                if(value[0] === 'Неправильный формат date. Используйте один из этих форматов: YYYY-MM-DD.') {
            formattedErrors[key] = "Заполните дату"
                } else {
                formattedErrors[key] = value;
                }
            } else {
                formattedErrors[key] = value;
            }
        }

        return formattedErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const csrfToken = getCSRFToken();
            const url = isEditing
                ? `http://127.0.0.1:8000/api/add_intern/${examData.id}/`
                : 'http://127.0.0.1:8000/api/add_intern/';
            const method = isEditing ? 'put' : 'post';

            const response = await axios({
                method: method,
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });

            onInternAdded(response.data);
            onClose();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const formattedErrors = formatErrors(error.response.data);
                setErrors(formattedErrors);

                // Таймер для очистки ошибок через 5 секунд
                setTimeout(() => {
                    setErrors({});
                }, 5000);

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
                        {errors.date_exam && <p className="error">{errors.date_exam}</p>}
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
                        {errors.name_intern && <p className="error">{errors.name_intern[0]}</p>}
                    </label>
                    <br />
                    <button type="submit" className="add-modal">Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default ModalWindow;
