import React from 'react';

import HomePage from './Home';
import StudyProgramPage from './StudyProgram';
import PositionPage from './Position';
import PeriodsPage from './Periods';
import EditFormPeriods from './Periods/EditFormPeriods';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import {Layout} from 'antd';
import AppNavigation from './AppNavigation';
import AppHeader from './../components/layouts/AppHeader';
import View from './../components/shared/View';
import ContentWrapper from './../components/layouts/ContentWrapper';

function App() {
  return (
    <Layout>
      <AppNavigation />
      <AppHeader />

      <Layout>
        <View marginLeft={250} paddingTop={60}>
          <ContentWrapper>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>

              <Route exact path="/study_program">
                <StudyProgramPage />
              </Route>

              <Route exact path="/position">
                <PositionPage />
              </Route>

              <Route exact path="/periods" component={PeriodsPage} />
              <Route exact path="/periods/add_new">
                <EditFormPeriods />
              </Route>
            </Switch>
          </ContentWrapper>
        </View>
      </Layout>
    </Layout>
  );
}

export default App;
