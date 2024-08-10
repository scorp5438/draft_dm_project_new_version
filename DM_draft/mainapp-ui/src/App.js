import React, { useState } from "react";
import Authorization from './components/Authorization/Authorization';
import Main from './components/Main/Main';

function App() {
  // Состояние, которое отслеживает, авторизован ли пользователь
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Функция для обновления состояния после успешной авторизации
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      {isAuthenticated ? (
        <Main />
      ) : (
        <Authorization onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
