import React, { Component } from "react";
import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';

class BurgerConstructor extends Component {

    render(){
        return(
            <section className={styles.burgerConstructor}>
                constructor
            </section>
        )
    }
}

const constructorShapeTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
});

BurgerConstructor.propTypes = 
    PropTypes.arrayOf(constructorShapeTypes).isRequired;

export default BurgerConstructor;