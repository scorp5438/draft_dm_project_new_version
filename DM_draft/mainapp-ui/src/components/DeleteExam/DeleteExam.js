import React from 'react';
import './style_delete_exam.css'
import Grobik from '../AllIcons/Grobik/Grobik';

function DeleteExam({ onClick }) {
  return (
    <button title="Удалить" className='delete-button' onClick={onClick}><Grobik /></button>
  );
}

export default DeleteExam;