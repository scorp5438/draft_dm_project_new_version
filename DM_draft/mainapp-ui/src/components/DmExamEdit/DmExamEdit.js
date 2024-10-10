import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf';
import "./DmExamEdit.css";
import Cross from '../AllIcons/Cross/Cross';
import cross from '../../img/cross.svg';
import { formatTime } from '../utils/formatTime';

function DmExamEdit({ onClose, onInternAdded, examData }) {
    const [formData, setFormData] = useState({
        date_exam: '',
        name_intern: '',
        time_exam: '',
        result_exam: '',
        comment_exam: '',
        cc: '',
        name_examiner: '',
        training_form: '',
        try_count: '',
        internal_test_examiner: '',
        name_train: '',
    });
    console.log(examData ? examData : "fghjljlslfjhn");
    const [errors, setErrors] = useState({}); // Для хранения ошибок
    const [users, setUsers] = useState([]);
    const [resultOptions, setResultOptions] = useState([]);

    const generateTimeSlots = () => {
        const slots = [];
        let startTime = 9 * 60; // Начало с 9:00 (в минутах)
        const endTime = 19 * 60; // Конец в 17:00 (в минутах)
        const interval = 30; // Интервал в 30 минут

        while (startTime < endTime) {
            const hours = Math.floor(startTime / 60);
            const minutes = startTime % 60;
            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
            slots.push(formattedTime);
            startTime += interval;
        }

        return slots;
    };

    const timeSlots = generateTimeSlots(); // Генерация списка времени с шагом 30 минут

    useEffect(() => {
        if (examData) {
            setFormData({
                date_exam: examData.date_exam,
                name_intern: examData.name_intern,
                training_form: examData ? examData.training_form : '',
                time_exam: examData ? examData.time_exam : '',
                result_exam: examData ? examData.result_exam : '',
                try_count: examData ? examData.try_count : '',
                internal_test_examiner: examData ? examData.internal_test_examiner : '',
                name_train: examData ? examData.name_train : '',
                comment_exam: examData ? examData.comment_exam : '',
                cc: examData.cc,
                name_examiner: examData.name_examiner || '',
                training_form: examData ? examData.training_form : '',
                try_count: examData ? examData.try_count : '',
                internal_test_examiner: examData ? examData.internal_test_examiner : '',
                name_train: examData ? examData.name_train : '',
            });
        }
    }, [examData]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/users_okk/');
                setUsers(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке пользователей:', error.message);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/result_list/')
            .then(response => {
                setResultOptions(response.data);
            })
            .catch(error => {
                console.error("Ошибка при загрузке списка результатов:", error.message);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(examData);

        try {
            const csrfToken = getCSRFToken();
            const url = `http://127.0.0.1:8000/api/exam/${examData.id}/`;

            const response = await axios({
                method: 'put',
                url: url,
                data: formData,
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                }
            });

            onInternAdded(response.data);
            onClose();
        }  catch (error) {
        if (error.response && error.response.status === 400) {
            const formattedErrors = formatErrors(error.response.data);
            setErrors(formattedErrors);
            console.log('Ошибки с сервера:', formattedErrors);
        } else {
            console.error('Ошибка при отправке данных:', error.message);
            console.log('Текущие ошибки:', errors);
        }
    }
};
    const formatErrors = (errors) => {
    const formattedErrors = {};
    for (const [key, value] of Object.entries(errors)) {
        formattedErrors[key] = value;
        if(value[0] === 'Неправильный формат date. Используйте один из этих форматов: YYYY-MM-DD.') {
            formattedErrors[key] = "Заполните дату"
        } else if (key === "non_field_errors") {
            formattedErrors["name_examiner"] ="Проверяющий уже записан на эту дату и время"
        }

    }
    return formattedErrors;
    };

    const formatTimeWithInterval = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        const endMinutes = minutes + 30;
        const endHours = endMinutes >= 60 ? hours + 1 : hours;
        const formattedEndMinutes = endMinutes % 60;
        const formattedEndTime = `${String(endHours).padStart(2, '0')}:${String(formattedEndMinutes).padStart(2, '0')}`;
        return `${time} - ${formattedEndTime}`;
    };

    return (
        <div className="modal-content">
            <div className="modal-top">
                <button className="close-modal" onClick={onClose}>
                    <Cross alt="cross" className="cross" />
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
                        {errors.date_exam && <p className="error">{errors.date_exam}</p>}
                    </label>
                    <br/>
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
                    <br/>
                    <label>
                        Попытка:
                        <select
                            name="try_count"
                            value={formData.try_count}
                            onChange={handleChange}
                        >
                            <option value="">Выберите</option>
                            {/* Пустое значение по умолчанию */}
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        {errors.try_count && <p className="error">{errors.try_count[0]}</p>}
                    </label>
                    <br/>
                    <label>
                        Время ТЗ:
                        <select className="svg-time"
                                name="time_exam"
                                value={formData.time_exam}
                                onChange={handleChange}
                        >
                            <option value="">{formData.time_exam && formData.time_exam !== '00:00:00' ?
                                formatTimeWithInterval(formatTime(formData.time_exam)) : 'Выберите время'}</option>
                            {timeSlots.map(time => (
                                <option className="form_option" key={time} value={time}>
                                    {formatTimeWithInterval(time)}
                                </option>
                            ))}
                        </select>
                        {errors.time_exam && <p className="error">{errors.time_exam[0]}</p>}
                    </label>
                    <br/>
                    <label>
                        ФИ экзаменатора:
                        <select className="svg-examiner"
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
                        {errors.name_examiner && <p className="error">{errors.name_examiner}</p>}
                    </label>
                    <br/>
                    <label>
                        Результат ТЗ:
                        <select className="svg-result"
                                name="result_exam"
                                value={formData.result_exam}
                                onChange={handleChange}
                        >
                            <option value="">Выберите результат</option>
                            {resultOptions.map(option => (
                                <option key={option[0]} value={option[0]}>
                                    {option[1]}
                                </option>
                            ))}
                        </select>
                        {errors.result_exam && <p className="error">{errors.result_exam[0]}</p>}
                    </label>
                    <br/>
                    <label>
                        Комментарий:
                        <textarea className="comment"
                                  name="comment_exam"
                                  value={formData.comment_exam}
                                  onChange={handleChange}
                        />
                        {errors.comment_exam && <p className="error">{errors.comment_exam[0]}</p>}
                    </label>
                    <br/>

                    <button type="submit" className="add-modal">Сохранить</button>
                </form>
            </div>
        </div>
    );
}

export default DmExamEdit;
