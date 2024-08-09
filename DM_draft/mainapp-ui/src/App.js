import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="start-glass-bg">
        <form className="registration-form">
          <h2>Вход в личный кабинет</h2>
          <label htmlFor="username"></label>
          <input type="text" id="username" name="username" required placeholder="Логин" autoFocus />
          <label htmlFor="password"></label>
          <input type="password" id="password" name="password" required placeholder="Пароль" />
          <button type="submit">Войти</button>
          <p>Если забыли логин и пароль, напишите менеджеру</p>
        </form>
      </div>
  );
}

export default App;
