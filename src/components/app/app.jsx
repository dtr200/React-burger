import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import ErrorIndicator from '../error-indicator/error-indicator';
import Spinner from '../spinner/spinner';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { INGREDIENTS_URL } from 
  '../../utils/constants';
import { getIngredients } from '../../services/actions/thunks';
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
  const { orderFailed } = useSelector(store => store.order);

  useEffect(() => {
    dispatch(getIngredients(INGREDIENTS_URL));
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main}`}>
        { ingredientsFailed ? <ErrorIndicator /> :
          ingredientsRequest ? <Spinner /> : 
          <>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
              { (modalVisible || orderFailed) &&
                <Modal>
                  { 
                    (hasModalError || orderFailed) ?
                    <ErrorIndicator /> :             
                    (modalMode === 'ingredient' ? 
                    <IngredientDetails /> : <OrderDetails />)
                  }
                </Modal> }
              </DndProvider>
          </>
        }
      </main>
    </div>
  );
}

export default App;