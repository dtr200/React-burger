import React, { Component } from "react";
import ReactDOM  from "react-dom";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

class BurgerConstructor extends Component {

    getBun = (item, position, descr) => {
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

    render(){
        const { data } = this.props;
        const bun = data.shift();
        data.sort((a, b) => b._id - a._id)
        return(
            <section className={`${styles.burgerConstructor} pt-25 pl-4`}> 
                <ul className={`mt-0 pr-4`}>
                    {this.getBun(bun, 'top', '(верх)')}
                </ul>               
                <ul className={`${styles.list} pr-2`}>
                    {
                        data.map((slice, i) => {
                            let { name, price, image } = slice; 
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
                <ul className={`pr-4`}>
                    {this.getBun(bun, 'bottom', '(низ)')}
                </ul>
                <div className={`${styles.total} text text_type_digits-medium pt-10`}>
                    <div className={styles.totalPriceBlock}>
                        <span className={styles.totalPrice}>610</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
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