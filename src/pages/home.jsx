import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import ErrorIndicator from '../components/error-indicator/error-indicator';
import Spinner from '../components/spinner/spinner';
import Modal from '../components/modal/modal';
import OrderDetails from '../components/order-details/order-details';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { INGREDIENTS_URL } from 
  '../utils/constants';
import { getIngredients } from '../services/actions/thunks';
import {
  CLOSE_MODAL,
  RESET_CURRENT_INGREDIENT,
  RESET_ORDER_REQUEST
} from '../services/actions/action-types';

import styles from './home.module.css';

const HomePage = () => {
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

  const onModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: RESET_CURRENT_INGREDIENT });
    dispatch({ type: RESET_ORDER_REQUEST });
  }

  return (
    <main className={`${styles.main}`}>
        { ingredientsFailed ? <ErrorIndicator /> :
        ingredientsRequest ? <Spinner /> : 
        <>
            <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
            { (modalVisible || orderFailed) &&
                <Modal onClose={onModalClose}>
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
  );
}

export default HomePage;