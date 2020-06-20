import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AppContext} from '../contexts/AppContext';
import jwt from 'jsonwebtoken';

const PrivateRoute = ({component: Component, ...rest}) => {
  const checkToken = () => {
    if (localStorage.getItem('token')) {
      const tokenKey = localStorage.getItem('token');
      return jwt.verify(tokenKey, 'meongmeongmeong', (error, decode) =>
        error ? false : true
      );
    } else {
      return false;
    }
  };
  const isLogin = checkToken();
  console.log(isLogin, 'this is isLoigin');
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
