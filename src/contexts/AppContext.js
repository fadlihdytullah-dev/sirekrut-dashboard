// @flow
import * as React from 'react';
import appReducer, {
  initState,
  type AppState,
  type DispatchAction,
} from './../reducers/appReducer';

type Props = {
  children: React$Node,
};

type Context = {
  appState: AppState,
  dispatchApp: DispatchAction,
};

export const AppContext = React.createContext<Context>({
  appState: {},
  dispatchApp: () => {},
});

const AppContextProvider = (props: Props) => {
  const [appState, dispatchApp] = React.useReducer(appReducer, initState);
  return (
    <AppContext.Provider value={{appState, dispatchApp}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
