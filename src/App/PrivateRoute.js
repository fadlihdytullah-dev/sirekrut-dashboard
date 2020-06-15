import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AppContext} from '../contexts/AppContext';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {appState, dispatchApp} = React.useContext(AppContext);
  const isLoging = localStorage.getItem('isLogin');
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
