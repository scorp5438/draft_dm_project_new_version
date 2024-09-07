import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './context/Url';
import Authorization from './components/Authorization/Authorization';
import Main from './components/Main/Main';
import Exam from './components/Exam/Exam';



const App = () => {
  return (

    <Router>
      <Routes>
        <Route path={routes.login} element={<Authorization />} />
        <Route path={routes.main} element={<Main />} />
        <Route path={routes.exam} element={<Exam />} />

      </Routes>
    </Router>

  );
};

export default App;
