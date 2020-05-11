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
import AdministrationFormPage from './AdministrationForm';
import ApplicantsPage from './Applicants';
import AdminPage from './Admin';
import LoginPage from './Login';
import {useLocation} from 'react-router-dom';

function App() {
  const location = useLocation();

  const {pathname} = location;

  console.log('ℹ️ pathname:=', pathname);

  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
      </Switch>

      {pathname !== '/login' && (
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

                  <Route exact path="/periods">
                    <PeriodsPage />
                  </Route>
                  <Route exact path="/periods/add_new">
                    <EditFormPeriods />
                  </Route>

                  <Route exact path="/form">
                    <AdministrationFormPage />
                  </Route>

                  <Route exact path="/applicant">
                    <ApplicantsPage />
                  </Route>

                  <Route exact path="/admin">
                    <AdminPage />
                  </Route>
                </Switch>
              </ContentWrapper>
            </View>
          </Layout>
        </Layout>
      )}
    </React.Fragment>
  );
}

export default App;
