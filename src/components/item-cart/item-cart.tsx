import React, { FunctionComponent} from "react";
import { Link, useLocation } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './item-cart.module.css';

type TItemCartProps = {
    id: string;
    name: string;
    price: number;
    image: string;
    type: string;
    amount: number;
};

const ItemCart: FunctionComponent<TItemCartProps> = 
    ({ id: itemId, name: itemName, price: itemPrice, image: itemImage, type, amount }) => {
    const location = useLocation();

    const [ , dragRef ] = useDrag({
        type,
        item: { itemId },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return(
        <Link
            to={{
                pathname: `/ingredients/${itemId}`,
                state: { background: location }
            }}
            key={itemId}
            className={styles.link}>
            <li 
            className={styles.itemCart} 
            data-id={itemId}>
                <div 
                className={styles.itemCartContainer}
                ref={dragRef}>
                    <img src={itemImage} 
                        className={styles.image} 
                        alt={itemName} />
                    
                    <span className={`${styles.price} text text_type_digits-default mt-2 mb-2`}>
                        { itemPrice }
                        <CurrencyIcon type="primary" />
                    </span>
                    <span className={`${styles.name} text text_type_main-default`}>
                        { itemName }
                    </span>
                </div>
                { amount !== 0 && <Counter count={amount} size="default" /> }
            </li>
        </Link>        
    )
}

export default ItemCart;