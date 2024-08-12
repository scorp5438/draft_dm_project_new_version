import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Убедитесь, что путь к CSS правильный
import App from './App';  // Убедитесь, что App импортируется правильно
import reportWebVitals from './reportWebVitals';  // Убедитесь, что этот файл существует и экспортируется правильно

const root = ReactDOM.createRoot(document.getElementById('root'));  // Убедитесь, что элемент с id 'root' существует в вашем HTML

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Если вы хотите начать измерять производительность вашего приложения, передайте функцию
// для регистрации результатов (например: reportWebVitals(console.log))
// или отправьте на конечную точку аналитики. Узнайте больше: https://bit.ly/CRA-vitals
reportWebVitals();
