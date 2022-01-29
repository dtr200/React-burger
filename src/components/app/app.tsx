import React, { useEffect, FunctionComponent } from 'react';
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
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useDispatch } from 'react-redux';
import { RESET_CURRENT_INGREDIENT } from '../../services/action-constants/ingredients';
import { CLOSE_MODAL } from '../../services/action-constants/modal';
import { RESET_ORDER_REQUEST } from '../../services/action-constants/order';
import { INGREDIENTS_URL } from 
  '../../utils/constants';
import { getIngredients } from '../../services/thunks/ingredients';

import styles from './app.module.css';

export type TLocationState = {
  from?: string;
  background?: TLocation;
}

export type TLocation = {
  hash: string;
  key?: string;
  pathname: string;
  search: string;
  state: TLocationState;
};

const App: FunctionComponent = () => {
  const ModalSwitch = () => {
    const dispatch = useDispatch();
    const location: TLocation = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;
    const onModalClose: () => void = () => {
      dispatch({ type: CLOSE_MODAL });
      dispatch({ type: RESET_CURRENT_INGREDIENT });
      dispatch({ type: RESET_ORDER_REQUEST });
      history.replace({ pathname: '/'})
    }

    useEffect(() => {
      dispatch(getIngredients(INGREDIENTS_URL));
    }, []);

    return (
      <div className={styles.app}>
        <AppHeader />

        <Switch location={background || location}>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <ProtectedRoute
            path='/profile/orders/:orderNumber'
            children={<OrderHistoryPage />}
            exact
          />
          <Route path='/ingredients/:ingredientId' exact>
            <IngredientDetails />
          </Route>
          <Route path='/order' exact>
            <OrderDetails />           
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
          <Route path='/order'>
            <Modal onClose={onModalClose}>
              <OrderDetails />
            </Modal>           
          </Route>
        )}
        {background && (
          <Route path='/ingredients/:ingredientId'>
            <Modal onClose={onModalClose}>
              <IngredientDetails />
            </Modal>
          </Route>
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