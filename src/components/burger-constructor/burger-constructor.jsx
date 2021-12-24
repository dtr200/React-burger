import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import ConstructorItem from '../constructor-item/constructor-item';
import { CurrencyIcon, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { ORDER_URL } from 
    '../../utils/constants';
import {
    ADD_INGREDIENT,
    ADD_BUN,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR_INGREDIENTS
} from '../../services/actions/action-types';
import { sendOrder } from '../../services/actions/thunks';

import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { constructorIngredients } = useSelector(store => store.ingredients);
    const location = useLocation();
    const history = useHistory();

    const onDropBun = (item) => {
        dispatch({
            type: ADD_BUN,
            id: item.itemId
        });
    }
    const onDropIngredient = (item) => {
        item.itemId && dispatch({
            type: ADD_INGREDIENT,
            id: item.itemId
        });
    }

    const isHoverNeeded = () => 
        !constructorIngredients.length ||
        (constructorIngredients.length === 1 && constructorIngredients[0].type !== 'bun' );

    const [{isBunHover}, dropTargetTopBun] = useDrop({
        accept: 'bun',
        drop(itemId){
            onDropBun(itemId);
        },
        collect: monitor => {
            return {
                isBunHover: isHoverNeeded() && monitor.isOver(),
            }
        }
    });
    const [, dropTargetBottomBun] = useDrop({
        accept: 'bun',
        drop(itemId){
            onDropBun(itemId);
        }
    });

    const [{isIngredientHover}, dropIngredientsTarget] = useDrop({
        accept: ['sauce', 'main', 'ingredient'],
        drop(itemId){
            return onDropIngredient(itemId);
        },
        collect: monitor => {
            return {
                isIngredientHover: isHoverNeeded() && monitor.isOver(),
            }
        }
    });

    const totalPrice = constructorIngredients.reduce((accum, product) => {
        return product.type === 'bun' ? 
            accum + product.price * 2 :
            accum + product.price
    }, 0)

    const onTotalClick = () => {
        const isBunExist = constructorIngredients.findIndex(item => 
            item.type === 'bun') !== -1;

        if(!isBunExist) return;
        dispatch(sendOrder(ORDER_URL, constructorIngredients));
        dispatch({ type: CLEAR_CONSTRUCTOR_INGREDIENTS });
        history.replace({
            pathname: '/order',
            state: { background: location}
        });
    }

    const getBun = (items, position, descr) => {
        const bun = items.length !== 0 && items.find(product => 
            product.type === 'bun');
        return !bun ? (
            <ConstructorItem isBun={true} start={true}/>
        ) : (
            <ConstructorItem 
                text={`${bun.name} ${descr}`}
                type={position}
                isLocked={true}
                price={bun.price}
                thumbnail={bun.image}
                start={false}
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

    const ingredientHover = isBunHover || isIngredientHover ? styles.listHover : '';

    return(
        <section className={`${styles.burgerConstructor} pt-25 pl-4`}>
            <ul 
              className={`${styles.bun} ${styles.bunTop} ${ingredientHover} mt-0 pr-4`}
              ref={dropTargetTopBun}>
                {getBun(constructorIngredients, 'top', '(верх)')}
            </ul>   
            <ul 
              className={`${styles.list} ${ingredientHover} pr-2`} 
              ref={dropIngredientsTarget}>
                {
                    constructorIngredients.map((slice, i) => {
                        let { _id, name, price, image, type } = slice; 
                        if(type === 'bun') return;
                        
                        return [
                            <ConstructorItem 
                                key={_id}
                                id={_id}
                                text={name}
                                price={price}
                                thumbnail={image}
                                index={i}
                                moveCard={moveCard}/>
                        ];
                    })
                }
            </ul>
            <ul 
              className={`${styles.bun} ${styles.bunBottom} ${ingredientHover} pr-4`}
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