import React from "react";
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './item-cart.module.css';

const ItemCart = ({ name, price, image }) => {
    return(
        <>
            <img src={image} alt={name} />
            <Counter count={1} size="default" />
            <span className={`text text_type_digits-default`}>
                { price }
            </span>
            <span className={`text text_type_main-default`}>
                { name }
            </span>
        </>
    )
}

export default ItemCart;