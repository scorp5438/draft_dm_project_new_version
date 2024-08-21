import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './context/Url';
import Authorization from './components/Authorization/Authorization';
import Main from './components/Main/Main';

const App = () => {
  return (

    <Router>
      <Routes>
        <Route path={routes.login} element={<Authorization />} />
        <Route path={routes.main} element={<Main />} />
      </Routes>
    </Router>

  );
};

export default App;
