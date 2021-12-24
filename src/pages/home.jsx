import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import ErrorIndicator from '../components/error-indicator/error-indicator';
import Spinner from '../components/spinner/spinner';
import { INGREDIENTS_URL } from 
  '../utils/constants';
import { getIngredients } from '../services/actions/thunks';

import styles from './home.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const {
    ingredientsRequest, 
    ingredientsFailed
  } = useSelector(store => store.ingredients);

  useEffect(() => {
    dispatch(getIngredients(INGREDIENTS_URL));
  }, []);  

  return (
    <main className={`${styles.main}`}>
        { ingredientsFailed ? <ErrorIndicator /> :
        ingredientsRequest ? <Spinner /> : 
        <>
            <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
            </DndProvider>
        </>
        }
    </main>
  );
}

export default HomePage;