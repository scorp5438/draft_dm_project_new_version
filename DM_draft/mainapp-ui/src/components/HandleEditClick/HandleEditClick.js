import React from 'react';
import '../AddInternButton/AddInternButton.css';
const HandleEditClick = ({ onClick }) => {
  return (
    <div className="add_intern">
      <button title="Изменить" className="add_intern_button" onClick={onClick}>Изменить</button>
    </div>
  );
};

export default HandleEditClick;
