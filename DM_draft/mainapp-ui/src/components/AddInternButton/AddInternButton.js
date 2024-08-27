import React from 'react';
import Image from '../Image/Image';
import plus from '../../img/plus.svg';
import './AddInternButton.css'; // Здесь можно добавить специфичные стили для кнопки

const AddInternButton = ({ onClick }) => {
  return (
    <div className="add_intern">
      <button title="Добавить стажёра" className="add_intern_button" onClick={onClick}>
        <Image image={plus} alt="plus" className="img" />
      </button>
    </div>
  );
};

export default AddInternButton;