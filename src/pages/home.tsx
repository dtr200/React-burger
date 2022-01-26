import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import ErrorIndicator from '../components/error-indicator/error-indicator';
import Spinner from '../components/spinner/spinner';

import styles from './home.module.css';

const HomePage: FunctionComponent = () => {
  const {
    ingredientsRequest, 
    ingredientsFailed
  } = useSelector((store: any) => store.ingredients);

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