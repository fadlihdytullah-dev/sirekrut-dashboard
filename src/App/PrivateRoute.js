import React from 'react';
import {Redirect, Route} from 'react-router-dom';
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
