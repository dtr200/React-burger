import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { INGREDIENTS_URL, DEFAULT_CART } from 
  '../../utils/constants';
import { getIngredients } from '../../services/middleware';
import styles from './app.module.css';

const App = () => {
  const dispatch = useDispatch();
  const {
    ingredientsRequest, 
    ingredientsFailed
  } = useSelector(store => store.ingredients);

  const {
    modalVisible,
    modalMode,
    hasModalError
  } = useSelector(store => store.modal);

  useEffect(() => {
    dispatch(getIngredients(INGREDIENTS_URL, DEFAULT_CART));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        { ingredientsFailed ? <ErrorIndicator /> :
          ingredientsRequest ? <Spinner /> : 
          <>
            <BurgerIngredients />
            <BurgerConstructor />
            { modalVisible &&
              <Modal>
                { 
                  hasModalError ?
                  <ErrorIndicator /> :             
                  (modalMode === 'ingredient' ? 
                  <IngredientDetails /> : <OrderDetails />)
                }
              </Modal> }
          </>
        }
      </main>
    </div>
  );
}

export default App;