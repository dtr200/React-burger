import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  useHistory,
  useLocation
} from 'react-router-dom';
import ProtectedRoute from '../protected-route/protected-route';
import { 
  HomePage, 
  LoginPage, 
  RegisterPage, 
  OrderHistoryPage,
  ForgotPasswordPage, 
  ResetPasswordPage, 
  ProfilePage, 
  NotFound404 
} from '../../pages';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import {
  CLOSE_MODAL,
  RESET_CURRENT_INGREDIENT,
  RESET_ORDER_REQUEST
} from '../../services/actions/action-types';

import styles from './app.module.css';

const App = () => {
  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    let background = location.state && location.state.background;
    const onModalClose = () => {
      dispatch({ type: CLOSE_MODAL });
      dispatch({ type: RESET_CURRENT_INGREDIENT });
      dispatch({ type: RESET_ORDER_REQUEST });
      history.goBack();
    }

    return (
      <div className={styles.app}>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact>
            <HomePage onModalClose={onModalClose}/>
          </Route>
          <ProtectedRoute
            path='/profile/orders/:orderNumber'
            children={<OrderHistoryPage />}
            exact
          />
          <Route path='/ingredients/:ingredientId' exact>
            <IngredientDetails />
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
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>          
        </Switch>

        {background && (
          <Route
            path='/ingredients/:ingredientId'
            children={
              <Modal onClose={onModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        )}
        {background && (
          <ProtectedRoute
            path='/profile/orders/:orderNumber'
            children={
              <Modal onClose={onModalClose}>
                <OrderHistoryPage />
              </Modal>
            }
          />
        )}
      </div>
    );
  };

  return (
    <Router>
      <ModalSwitch />
    </Router>
  );
}

export default App;