import React from 'react';
import '../HandleEditClick/HandleEditClick.css';
import PencilIcon from '../AllIcons/PencilIcon/PencilIcon';
const HandleEditClick = ({ onClick }) => {
  return (
    <div className="edit_intern">
      <button title="Изменить" className="edit_intern_button" onClick={onClick}><PencilIcon />
      <p>Изменить</p></button>
    </div>
  );
};

export default HandleEditClick;
