import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import UserAuthContextProvider from './context/UserAuthContext';
import Signin from './Components/Signin'; 
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';

const history = createBrowserHistory();

const App = () => {
  return (
    <UserAuthContextProvider>
      <Router history={history}>
        <Routes>
         
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </UserAuthContextProvider>
  );
};

export default App;
