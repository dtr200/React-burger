import React from "react";
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './item-cart.module.css';

const ItemCart = ({ id, name, price, image }) => {
    
    const dict = {
        "Флюоресцентная булка R2-D3": true,
        "Соус Spicy-X": true,
        "Соус фирменный Space Sauce": true,
        "Соус с шипами Антарианского плоскоходца": true
    }

    return(
        <li className={styles.itemCart} data-id={id}>
            <img src={image} className={styles.image} alt={name} />
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

ItemCart.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, 
    image: PropTypes.string.isRequired
}

export default ItemCart;