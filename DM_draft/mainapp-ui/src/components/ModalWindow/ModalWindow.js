import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCSRFToken } from '../utils/csrf'; // Убедитесь, что этот метод правильно реализован
import "./style_modal_window.css";
import { useUser } from '../utils/get_user';
import Image from '../Image/Image';
import cross from '../../img/cross.svg';

function ModalWindow({ onClose, onInternAdded }) {
    const user = useUser();
    const company_id = user ? user.company.id : '';
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
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

        console.log('Данные успешно отправлены:', response.data);

        // Вызов функции для обновления данных таблицы
        onInternAdded(response.data);  // <-- Передаем данные нового стажера

        // Закрытие модального окна
        onClose();
    } catch (error) {
        console.error('Ошибка при отправке данных:', error.response ? error.response.data : error.message);
    }
};


    return (
        <div className="modal-content">
            <div className="modal-top">
             <button className="close-modal" onClick={toggleModal}>
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
                    <button type="submit">Добавить</button>
                </form>
            </div>
        </div>
    );
}

export default ModalWindow;
