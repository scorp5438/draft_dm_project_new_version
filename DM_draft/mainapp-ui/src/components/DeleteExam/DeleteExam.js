import React from 'react';

function DeleteExam({ onClick }) {
  return (
    <button onClick={onClick} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
      Удалить
    </button>
  );
}

export default DeleteExam;