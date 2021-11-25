import React, { useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { TotalPriceContext } from "../../services/total-price-context";
import { CartContext } from '../../services/cart-context';

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ onOpen }) => {

    const cart = useContext(CartContext);
    const { totalPrice, dispatchTotalPrice } = useContext(TotalPriceContext);
    const price = cart.reduce((accum, product) => 
          accum + product.item.price * product.pcs, 0);

    useEffect(() => {
        dispatchTotalPrice({ type: 'RES'});
        dispatchTotalPrice({ type: 'INC', payload: price }) 
    }, [cart]);

    const onTotalClick = () =>
        onOpen({ type: 'order', id: null });

    const getBun = (items, position, descr) => {
        const bun = items.find(product => 
            product.item.type === 'bun').item;
        return (
            <li className={styles.listItem}>
                <ConstructorElement 
                    text={`${bun.name} ${descr}`}
                    type={position}
                    isLocked={true}
                    price={bun.price}
                    thumbnail={bun.image} />
            </li>
        )
    }

    return(
        <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
            <ul className={`${styles.bun} ${styles.bunTop} mt-0 pr-4`}>
                {getBun(cart, 'top', '(верх)')}
            </ul>   
            <ul className={`${styles.list} pr-2`}>
                {
                    cart.map((slice, i) => {
                        let { name, price, image, type } = slice.item; 
                        if(type === 'bun') return;
                        
                        const elements = [];

                        for(let j = 0; j < slice.pcs; j++){
                            elements.push(
                                <li className={styles.listItem} key={`${i}${j}10`}>
                                    <div className={styles.settings}>
                                        <DragIcon type={"primary"} />
                                    </div>
                                    <ConstructorElement 
                                        text={name}
                                        price={price}
                                        thumbnail={image} />
                                </li>
                            );
                        }
                        
                        return [...elements]
                    })
                }
            </ul>
            <ul className={`${styles.bun} ${styles.bunBottom} pr-4`}>
                {getBun(cart, 'bottom', '(низ)')}
            </ul>
            <div className={`${styles.total} text text_type_digits-medium pt-10 pr-4`}>
                <div className={styles.totalPriceBlock}>
                    <span className={styles.totalPrice}>
                        {totalPrice.price}
                    </span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={onTotalClick}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    onOpen: PropTypes.func.isRequired
}    

export default BurgerConstructor;