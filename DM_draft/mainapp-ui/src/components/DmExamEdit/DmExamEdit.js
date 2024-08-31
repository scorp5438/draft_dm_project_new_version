import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';
import "./DmExamEdit.css";
import { useUser } from '../utils/get_user';
import Image from '../Image/Image';
import cross from '../../img/cross.svg';

function DmExamEdit({ onClose, onInternAdded, examData }) {
 console.log(examData ? examData : 'hgcfhjfd');
    const [formData, setFormData] = useState({
        date_exam: '',
        name_intern: '',
        time_exam: '',
        result_exam: '',
        comment_exam: '',
        cc: '',
        name_examiner: '',
    });

    const [errors, setErrors] = useState({}); // Для хранения ошибок
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (examData) {

            setFormData({
                date_exam: examData.date_exam,
                name_intern: examData.name_intern,
                time_exam: examData ? examData.time_exam : '',
                result_exam: examData ? examData.result_exam : '',
                comment_exam: examData ? examData.comment_exam : '',
                cc: examData.cc,
                name_examiner: examData ? examData.name_examiner : '',
            });
        }
    }, [examData]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users_okk/');
                setUsers(response.data);
                console.log(users[0]);
            } catch (error) {
                console.error('Ошибка при загрузке пользователей:', error.message);
            }
        };
        fetchUsers();
    }, []);
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
            console.log(examData ? examData.id : 'dhdjd');
            const csrfToken = getCSRFToken();
            const url = `http://127.0.0.1:8000/api/exam/${examData.id}/`;

            const method = 'put';

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
                        Дата ТЗ:
                        <input
                            type="date"
                            name="date_exam"
                            value={formData.date_exam}
                            onChange={handleChange}
                        />
                        {errors.date_exam && <p className="error">{errors.date_exam[0]}</p>}
                    </label>
                    <br />
                    <label>
                        ФИ стажера:
                        <input
                            type="text"
                            name="name_intern"
                            value={formData.name_intern}
                            onChange={handleChange}
                        />
                        {errors.name_intern && <p className="error">{errors.name_intern[0]}</p>}
                    </label>
                    <br />
                    <label>
                        Время ТЗ:
                        <input
                            type="time"
                            name="time_exam"
                            value={formData.time_exam}
                            onChange={handleChange}
                        />
                        {errors.time_exam && <p className="error">{errors.time_exam[0]}</p>}
                    </label>
                    <br />
                     <label>
                        ФИ экзаменатора:
                        <select
                            name="name_examiner"
                            value={formData.name_examiner}
                            onChange={handleChange}
                        >
                            <option value="">Выберите экзаменатора</option>
                            {users.map(user => (

                                <option key={user.id} value={user.id}>
                                    {user.full_name}

                                </option>
                            ))}
                        </select>
                        {errors.name_examiner && <p className="error">{errors.name_examiner[0]}</p>}
                    </label>
                    <br />
                    <label>
                        Результат ТЗ:
                        <input
                            type="text"
                            name="result_exam"
                            value={formData.result_exam}
                            onChange={handleChange}
                        />
                        {errors.result_exam && <p className="error">{errors.result_exam[0]}</p>}
                    </label>
                    <br />
                    <label>
                        Комментарий:
                        <input
                            type="text"
                            name="comment_exam"
                            value={formData.comment_exam}
                            onChange={handleChange}
                        />
                        {errors.comment_exam && <p className="error">{errors.comment_exam[0]}</p>}
                    </label>
                    <br />


                    <button type="submit" className="add-modal">Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default DmExamEdit;
