import React from "react";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './item-cart.module.css';

const ItemCart = ({ id, name, price, image, selectItem }) => {
    const dict = {
        "Флюоресцентная булка R2-D3": true,
        "Соус Spicy-X": true,
        "Соус фирменный Space Sauce": true,
        "Соус с шипами Антарианского плоскоходца": true
    }

    return(
        <li className={styles.itemCart} onClick={selectItem} data-id={id}>
            <img src={image} alt={name} />
            { !dict[name] && <Counter count={1} size="default" />}
            <span className={`${styles.price} text text_type_digits-default mt-2 mb-2`}>
                { price }
                <CurrencyIcon type="primary" />
            </span>
            <span className={`${styles.name} text text_type_main-default`}>
                { name }
            </span>
        </li>
    )
}

export default ItemCart;