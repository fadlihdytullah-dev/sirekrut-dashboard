import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
  const isLogin = localStorage.getItem('isLogin');
  const token = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin && token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
