import React from 'react';
import Image from '../Image/Image';
import plus from '../../img/plus.svg';
import './AddInternButton.css';
import PlusCircleIcon from '../AllIcons/PlusCircleIcon/PlusCircleIcon'

const AddInternButton = ({ onClick }) => {
  return (
    <div className="add-intern">
      <button title="Добавить стажёра" className="add-intern-button" onClick={onClick}>
        <PlusCircleIcon width="32" height="32" fill="#ffffff" /><p>Добавить стажёра</p>
      </button>
    </div>
  );
};

export default AddInternButton;