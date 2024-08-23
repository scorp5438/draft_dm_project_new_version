import { useState, useEffect } from 'react';
import axios from 'axios';

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Очистка localStorage перед загрузкой данных
    localStorage.removeItem('user');

    // Выполнение запроса к API при монтировании компонента
    axios({
      method: "GET",
      url: 'http://127.0.0.1:8000/api/user_login/'
    })
    .then(response => {
      const userData = response.data[0]; // Предполагается, что ответ содержит массив
      setUser(userData);
      // Сохранение данных в localStorage
      localStorage.setItem('user', JSON.stringify(userData));
    })
    .catch(error => {
      console.error("Ошибка при запросе пользователя:", error);
    });
  }, []);

  // Возвращаем объект с данными пользователя
  return user;
};
