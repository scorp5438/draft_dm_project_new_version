import React, { useState } from 'react';
import axios from 'axios';
import "./SearchBar.css"

function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users?username=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Ошибка при выполнении поиска:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Введите имя пользователя"
      />
      <button onClick={handleSearch}>Поиск</button>
      <ul>
        {results.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
