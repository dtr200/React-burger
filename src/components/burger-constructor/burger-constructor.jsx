import React, { useContext } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { DataContext } from "../../services/data-context";
import { BunContext } from "../../services/bun-context";

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ onOpen }) => {
    const data = useContext(DataContext);
    const currentBun = useContext(BunContext);
    console.log(currentBun)
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

    const buns = data.filter(item => item.type === 'bun');

    const bun = buns.find(item => 
        item.name === 'Краторная булка N-200i');
    data.sort((a, b) => b._id - a._id);

    return(
        <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
            <ul className={`${styles.bun} ${styles.bunTop} mt-0 pr-4`}>
                {getBun(bun, 'top', '(верх)')}
            </ul>   
            <ul className={`${styles.list} pr-2`}>
                {
                    data.map((slice, i) => {
                        let { name, price, image, type } = slice; 
                        if(type === 'bun') return;
                        
                        return (
                            <li className={styles.listItem} key={i}>
                                <div className={styles.settings}>
                                    <DragIcon type={"primary"} />
                                </div>
                                <ConstructorElement 
                                    text={name}
                                    price={price}
                                    thumbnail={image} />
                            </li>
                        )
                    })
                }
            </ul>
            <ul className={`${styles.bun} ${styles.bunBottom} pr-4`}>
                {getBun(bun, 'bottom', '(низ)')}
            </ul>
            <div className={`${styles.total} text text_type_digits-medium pt-10 pr-4`}>
                <div className={styles.totalPriceBlock}>
                    <span className={styles.totalPrice}>610</span>
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