import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import data from '../../utils/data';

import styles from './app.module.css';

const App = () => {
    return (
      <div className="App">
        <AppHeader />
        <main className={`${styles.main}`}>
          <BurgerIngredients data={data} />
          <BurgerConstructor data={data}/>
        </main>
      </div>
    ); 
}

export default App;