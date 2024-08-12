import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authorization from './components/Authorization/Authorization';  // Убедитесь, что путь правильный
import Main from './components/Main/Main';  // Убедитесь, что путь правильный

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Authorization />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;  // Убедитесь, что App экспортируется как default
