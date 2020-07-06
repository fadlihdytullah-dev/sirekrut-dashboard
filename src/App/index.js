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
import PrivateRoute from '../App/PrivateRoute';
import {useLocation} from 'react-router-dom';

function App() {
  const location = useLocation();

  const {pathname} = location;

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
                  <PrivateRoute exact path="/" component={HomePage} />

                  <PrivateRoute
                    exact
                    path="/study_program"
                    component={StudyProgramPage}
                  />

                  <PrivateRoute
                    exact
                    path="/position"
                    component={PositionPage}
                  />

                  <PrivateRoute exact path="/periods" component={PeriodsPage} />

                  <PrivateRoute
                    exact
                    path="/periods/add_new"
                    component={EditFormPeriods}
                  />

                  <PrivateRoute
                    exact
                    path="/periods/edit/:id"
                    component={EditFormPeriods}
                  />

                  <PrivateRoute
                    exact
                    path="/form"
                    component={AdministrationFormPage}
                  />

                  <PrivateRoute
                    exact
                    path="/applicant"
                    component={ApplicantsPage}
                  />

                  <PrivateRoute exact path="/admin" component={AdminPage} />
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
