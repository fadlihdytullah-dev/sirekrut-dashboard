import React from 'react';

import Home from './App/Home';
import StudyProgram from './App/StudyProgram';
import Position from './App/Position';
import {Switch, Route} from 'react-router-dom';

import './App.css';
import {Layout} from 'antd';
import Sidebar from './components/layouts/Sidebar';
import AppHeader from './components/layouts/AppHeader';
import View from './components/shared/View';
import ContentWrapper from './components/layouts/ContentWrapper';

function App() {
  return (
    <Layout>
      <Sidebar />
      <AppHeader />

      <Layout>
        <View marginLeft={250} paddingTop={60}>
          <ContentWrapper>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/study_program">
                <StudyProgram />
              </Route>

              <Route exact path="/position">
                <Position />
              </Route>
            </Switch>
          </ContentWrapper>
        </View>
      </Layout>
    </Layout>
  );
}

export default App;
