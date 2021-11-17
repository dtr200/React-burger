import React from "react";
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './item-cart.module.css';

const ItemCart = ({ id: itemId, name: itemName, 
                    price: itemPrice, image: itemImage,
                    pcs: pieces }) => {

    return(
        <li className={styles.itemCart} data-id={itemId}>
            <img src={itemImage} 
                 className={styles.image} 
                 alt={itemName} />
            { pieces !== 0 && <Counter count={pieces} size="default" /> }
            <span className={`${styles.price} text text_type_digits-default mt-2 mb-2`}>
                { itemPrice }
                <CurrencyIcon type="primary" />
            </span>
            <span className={`${styles.name} text text_type_main-default`}>
                { itemName }
            </span>
        </li>
    )
}

ItemCart.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, 
    image: PropTypes.string.isRequired,
    pcs: PropTypes.number.isRequired
}

export default ItemCart;