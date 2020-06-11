import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AppContext} from '../contexts/AppContext';

const PrivateRoute = ({component: Component, ...rest}) => {
  const {appState, dispatchApp} = React.useContext(AppContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        appState.isLogin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
