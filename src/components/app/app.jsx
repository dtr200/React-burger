import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { HomePage, LoginPage } from '../../pages';
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
        </Switch>        
      </Router>      
    </div>
  );
}

export default App;