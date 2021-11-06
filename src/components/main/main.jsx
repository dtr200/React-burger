import React, { Component } from "react";

import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

import styles from './main.module.css';

class Main extends Component {
    render(){
        return(
            <main className={styles.main}>
                <BurgerIngredients data={this.props.data}/>
                <BurgerConstructor data={this.props.data}/>
            </main>
        )
    }
}

export default Main;