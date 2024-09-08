import React from 'react';
import './style_delete_exam.css'

function DeleteExam({ onClick }) {
  return (
    <button className='delete-button' onClick={onClick}><p>Удалить</p>
    </button>
  );
}

export default DeleteExam;