import React, { useState } from 'react';
import './style_delete_exam.css';
import Grobik from '../AllIcons/Grobik/Grobik';

function DeleteExam({ onClick }) {
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
       <button title="Удалить" className="delete-button" onClick={handleDeleteClick}>
        <Grobik />
      </button>

      {/* Модальное окно подтверждения */}
      {isModalOpen && (
        <div className="modal-delete">
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
