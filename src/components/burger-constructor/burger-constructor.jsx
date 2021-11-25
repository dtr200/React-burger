import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { BunContext } from "../../services/bun-context";
import { TotalPriceContext } from "../../services/total-price-context";
import { CurrentItemsContext } from "../../services/current-items-context";

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ onOpen }) => {
    const currentBun = useContext(BunContext);
    const { totalPrice, dispatchTotalPrice } = useContext(TotalPriceContext);
    const currentItems = useContext(CurrentItemsContext);

    const onTotalClick = () =>
        onOpen({ type: 'order', id: null });

    const getBun = (item, position, descr) => {
        return (
            <li className={styles.listItem}>
                <ConstructorElement 
                    text={`${item.name} ${descr}`}
                    type={position}
                    isLocked={true}
                    price={item.price}
                    thumbnail={item.image} />
            </li>
        )
    }

    return(
        <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
            <ul className={`${styles.bun} ${styles.bunTop} mt-0 pr-4`}>
                {getBun(currentBun, 'top', '(верх)')}
            </ul>   
            <ul className={`${styles.list} pr-2`}>
                {
                    currentItems.map((slice, i) => {
                        let { name, price, image, type } = slice.item; 
                        if(type === 'bun') return;
                        
                        const elements = [];

                        for(let j = 0; j < slice.amount; j++){
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
                {getBun(currentBun, 'bottom', '(низ)')}
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