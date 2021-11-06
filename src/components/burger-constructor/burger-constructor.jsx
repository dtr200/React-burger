import React, { Component } from "react";
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './burger-constructor.module.css';

class BurgerConstructor extends Component {

    render(){
        const { data } = this.props;
        return(
            <section className={`${styles.burgerConstructor} pt-25`}>
                <ul className={styles.list}>
                    {
                        data.map((slice, i) => {   

                            let { name, price, image } = slice;
                            let type, isLocked;                            

                            if(i === 0){
                                type = 'top';
                                name += ' (верх)';
                                isLocked = true;
                            }                
                            else if(i === data.length - 1){
                                type = 'bottom';
                                name += ' (низ)';
                                isLocked = true;
                            }  

                            const settings = (i !== 0 && i !== data.length - 1) && 
                                    <DragIcon type={"primary"} />

                            return (
                                <li className={styles.listItem} key={i}>
                                    <div className={styles.settings}>
                                        { settings }
                                    </div>
                                    <ConstructorElement 
                                        text={name}
                                        type={type}
                                        isLocked={isLocked}
                                        price={price}
                                        thumbnail={image} />
                                </li>
                            )
                        })
                    }
                </ul>
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