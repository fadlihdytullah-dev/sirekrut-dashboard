import React from 'react';

import {Switch, Route} from 'react-router-dom';

import './App.css';
import {Layout} from 'antd';
import Sidebar from './components/layouts/Sidebar';
import AppHeader from './components/layouts/AppHeader';
import View from './components/shared/View';
import Home from './App/Home';

function App() {
  return (
    <Layout>
      <Sidebar />
      <AppHeader />

      <Layout>
        <View marginLeft={250} paddingTop={90}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </View>
      </Layout>
    </Layout>
  );
}

export default App;
