import React from 'react';

import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import Login from './components/Login';
import { BrowserRouter } from "react-router-dom";



ReactDOM.render(
  <BrowserRouter>
     <App /> 
  </BrowserRouter>,
document.getElementById('root'));
