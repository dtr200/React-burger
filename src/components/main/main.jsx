import React, { Component } from "react";

import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import styles from './main.module.css';

class Main extends Component {
    render(){
        return(
            <main className={styles.main}>
                <BurgerConstructor data={this.props.data}/>
                <BurgerIngredients data={this.props.data}/>
            </main>
        )
    }
}

export default Main;