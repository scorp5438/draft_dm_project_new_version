import React, { useState } from 'react';
import './style_delete_exam.css';
import Grobik from '../AllIcons/Grobik/Grobik';

function DeleteExam({ onClick, disabled }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Открываем модальное окно
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // Закрываем модальное окно без удаления
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Подтверждаем удаление
  const handleConfirmDelete = () => {
    setIsModalOpen(false);
    onClick(); // Вызываем удаление при подтверждении
  };

  return (

  <div className="delete-exam-container">
    <button disabled={disabled} title="Удалить" className="delete-button" onClick={handleDeleteClick}>
      <Grobik />
    </button>

    {/* Оверлей для блокировки взаимодействия с таблицей */}
    {isModalOpen && <div className="modal-overlay"></div>}

    {/* Модальное окно подтверждения */}
    {isModalOpen && (
      <div className="modal-overlay">
        <div className="modal-content-delete">
          <p>Удалить?</p>
          <div className="modal-actions">
            <button className="confirm-button" onClick={handleConfirmDelete}>Да</button>
            <button className="cancel-button" onClick={handleCancel}>Нет</button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default DeleteExam;
