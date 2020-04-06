import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter as Router} from 'react-router-dom';

import './index.css';
import 'antd/dist/antd.css';

import App from './App';
import AppContextProvider from './contexts/AppContext';

ReactDOM.render(
  <AppContextProvider>
    <Router>
      <App />
    </Router>
  </AppContextProvider>,
  document.getElementById('root')
);
