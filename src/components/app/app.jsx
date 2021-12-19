import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, 
  ForgotPasswordPage, ResetPasswordPage, ProfilePage } from '../../pages';
import AppHeader from '../app-header/app-header';

import styles from './app.module.css';

const App = () => {

  return (
    <div className={styles.app}>
      <Router>        
        <AppHeader />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPasswordPage />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPasswordPage />
          </Route>
          <Route path="/profile" exact>
            <ProfilePage />
          </Route>
        </Switch>        
      </Router>      
    </div>
  );
}

export default App;