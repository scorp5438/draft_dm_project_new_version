import React from 'react';
import Image from '../Image/Image';
import plus from '../../img/plus.svg';
import './AddInternButton.css';
import PlusCircleIcon from '../AllIcons/PlusCircleIcon/PlusCircleIcon'

const AddInternButton = ({ onClick }) => {
  return (
    <div className="add_intern">
      <button title="Добавить стажёра" className="add_intern_button" onClick={onClick}>
        <PlusCircleIcon width="32" height="32" fill="#ffffff" />
      </button>
    </div>
  );
};

export default AddInternButton;