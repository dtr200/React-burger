import React, { useCallback, FunctionComponent, ReactElement } from "react";
import { useSelector, useDispatch } from "../../services/types/hooks";
import { useLocation, useHistory } from 'react-router-dom';
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
} from '../../services/action-constants/ingredients';
import { sendOrder } from '../../services/thunks/order';
import { TProductItem } from '../../utils/types';
import styles from './burger-constructor.module.css';

type TOnDrop = {
    itemId: string;
};
type TAccessToken = Array<string> | null;

type TBun = TProductItem | boolean | undefined;

const BurgerConstructor: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { constructorIngredients }: { constructorIngredients: TProductItem[] } = 
        useSelector(store => store.ingredients);
    const location = useLocation();
    const history = useHistory();

    const onDropBun: (item: TOnDrop) => void = (item) => {
        dispatch({
            type: ADD_BUN,
            id: item.itemId
        });
    }
    const onDropIngredient: (item: TOnDrop) => void = (item) => {
        item.itemId && dispatch({
            type: ADD_INGREDIENT,
            id: item.itemId
        });
    }

    const isHoverNeeded: () => boolean = () => 
        !constructorIngredients.length ||
        (constructorIngredients.length === 1 && constructorIngredients[0].type !== 'bun' );

    const [{isBunHover}, dropTargetTopBun] = useDrop({
        accept: 'bun',
        drop(itemId: TOnDrop){
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
        drop(itemId: TOnDrop){
            onDropBun(itemId);
        }
    });

    const [{isIngredientHover}, dropIngredientsTarget] = useDrop({
        accept: ['sauce', 'main', 'ingredient'],
        drop(itemId: TOnDrop){
            return onDropIngredient(itemId);
        },
        collect: monitor => {
            return {
                isIngredientHover: isHoverNeeded() && monitor.isOver(),
            }
        }
    });

    const totalPrice = constructorIngredients.reduce(
        (accum: number, product: TProductItem): number => {
        return product.type === 'bun' ? 
            accum + product.price * 2 :
            accum + product.price
    }, 0)

    const onTotalClick: () => void = () => {
        const isBunExist: boolean = constructorIngredients.findIndex((item: TProductItem) => 
            item.type === 'bun') !== -1;

        if(!isBunExist) return;
        const accessToken: TAccessToken = document.cookie.match(/(accessToken=)(.+)/);
        
        if(!accessToken){
            history.replace({
                pathname: '/login',
                state: { background: location}
            });
            history.push('/login');
        }            
        else{
            dispatch(sendOrder(ORDER_URL, constructorIngredients));
            dispatch({ type: CLEAR_CONSTRUCTOR_INGREDIENTS });
            history.replace({
                pathname: '/order',
                state: { background: location}
            });
        }        
    }

    const getBun: (items: Array<TProductItem>, position: 'top' | 'bottom', descr: string) => ReactElement = 
        (items, position, descr) => {
        const bun: TBun = items.length !== 0 && items.find((product: TProductItem) => 
            product.type === 'bun');

        return !bun ? (
            <ConstructorItem 
                isBun={true} 
                start={true}
                index={0}
                isLocked={true}
                price={0}
                thumbnail={''}
                text={''} />
        ) : (
            <ConstructorItem 
                text={`${bun.name} ${descr}`}
                type={position}
                isLocked={true}
                price={bun.price}
                thumbnail={bun.image}
                start={false}
                isBun={true}
                index={0} />
        )
    }

    const moveCard = useCallback((dragIndex: number, hoverIndex: number): void => {
        dispatch({
            type: MOVE_INGREDIENT,
            drag: dragIndex,
            hover: hoverIndex
        });
    }, [constructorIngredients]);

    const ingredientHover: string = isBunHover || isIngredientHover ? styles.listHover : '';

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
                    constructorIngredients.map((slice: any, i: number) => {
                        let { _id, name, price, image, type } = slice; 
                        if(type === 'bun') return;
                        return [
                            <ConstructorItem 
                                key={_id}
                                id={_id}
                                isBun={false}
                                isLocked={false}
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