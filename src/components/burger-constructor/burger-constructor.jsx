import React from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

const BurgerConstructor = ({ data, onOpen }) => {
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
    const bun = data.find(item => 
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

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(constructorShapeTypes).isRequired,
    onOpen: PropTypes.func.isRequired
}    

export default BurgerConstructor;