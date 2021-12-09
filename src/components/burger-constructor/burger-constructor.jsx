import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrag, useDrop } from 'react-dnd';
import ConstructorItem from '../constructor-item/constructor-item';
import { CurrencyIcon, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { ORDER_URL } from 
    '../../utils/constants';
import {
    ADD_INGREDIENT,
    ADD_BUN,
    MOVE_INGREDIENT
} from '../../services/actions/action-types';
import { sendOrder } from '../../services/middleware';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { constructorIngredients } = useSelector(store => store.ingredients);

    const onDropBun = (item) => {
        dispatch({
            type: ADD_BUN,
            id: item.itemId
        })
    }
    const onDropIngredient = (item) => {
        item.itemId && dispatch({
            type: ADD_INGREDIENT,
            id: item.itemId
        })
    }

    const [, dropTargetTopBun] = useDrop({
        accept: 'bun',
        drop(itemId){
            onDropBun(itemId);
        }
    });
    const [, dropTargetBottomBun] = useDrop({
        accept: 'bun',
        drop(itemId){
            onDropBun(itemId);
        }
    });

    const [, dropIngredientsTarget] = useDrop({
        accept: ['sauce', 'main', 'ingredient'],
        drop(itemId){
            return onDropIngredient(itemId);
        }
    });

    const totalPrice = constructorIngredients.reduce((accum, product) => 
        accum + product.item.price * product.amount, 0);

    const onTotalClick = () =>
        dispatch(sendOrder(ORDER_URL, constructorIngredients));

    const getBun = (items, position, descr) => {
        const bun = items.find(product => 
            product.item.type === 'bun').item;
        return (
            <ConstructorItem 
                text={`${bun.name} ${descr}`}
                type={position}
                isLocked={true}
                price={bun.price}
                thumbnail={bun.image}
                isBun={true} />
        )
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch({
            type: MOVE_INGREDIENT,
            drag: dragIndex,
            hover: hoverIndex
        });
    }, [constructorIngredients]);

    return(
        <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
            <ul 
              className={`${styles.bun} ${styles.bunTop} mt-0 pr-4`}
              ref={dropTargetTopBun}>
                {getBun(constructorIngredients, 'top', '(верх)')}
            </ul>   
            <ul 
              className={`${styles.list} pr-2`} 
              ref={dropIngredientsTarget}>
                {
                    constructorIngredients.map((slice, i) => {
                        let { _id, name, price, image, type } = slice.item; 
                        if(type === 'bun') return;
                        
                        const elements = [];

                        for(let j = 0; j < slice.amount; j++){
                            elements.push(
                                <ConstructorItem 
                                    key={`${_id}${j}`}
                                    id={_id}
                                    text={name}
                                    price={price}
                                    thumbnail={image}
                                    index={i}
                                    moveCard={moveCard}/>
                            );
                        }
                        
                        return [...elements];
                    })
                }
            </ul>
            <ul 
              className={`${styles.bun} ${styles.bunBottom} pr-4`}
              ref={dropTargetBottomBun}>
                {getBun(constructorIngredients, 'bottom', '(низ)')}
            </ul>
            <div className={`${styles.total} text text_type_digits-medium pt-10 pr-4`}>
                <div className={styles.totalPriceBlock}>
                    <span className={styles.totalPrice}>
                        {totalPrice}
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

export default BurgerConstructor;