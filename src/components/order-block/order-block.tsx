import React, { FunctionComponent } from "react";
import { useSelector } from "../../services/types/hooks";
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { useLocation } from "react-router-dom";
import { getTime } from '../../utils/utils';
import { TProductItem } from '../../utils/types';

import { CurrencyIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-block.module.css';

type TOrderBlockProps = {
    number: number;
    createdAt: string;
    name: string;
    status: string;
    ingredients: string[];
}
type TDict = {
    [key: string]: string;
}

const OrderBlock: FunctionComponent<TOrderBlockProps> = 
    ({ number, name, createdAt, status, ingredients }) => {

    const { ingredientsData }: { ingredientsData: TProductItem[] } = 
        useSelector(store => store.ingredients);
    const location = useLocation();    

    const price = ingredients.reduce((accum: number, id: string) => 
            accum + (ingredientsData.length ? 
                ingredientsData.find((item: TProductItem) => item._id === id)!.price : 0), 0);


    const images = Array.from(
        new Set(
            ingredients.map((id: string) =>
                ingredientsData.find((item: TProductItem) => item._id === id)!.image_mobile)
            )
        ).sort();

    const engToRusStatusDict: TDict = {
        done: 'Выполнен',
        pending: 'Готовится',
        created: 'Готов'
    }
    
    return (        
        <li className={`${styles.orderBlock} text text_type_digits-default`}>
            <div className={styles.meta}>
                <span className={``}>{`#${number}`}</span>
                <span className={`${styles.date} text_type_main-default`}>{getTime(createdAt)}</span>
            </div>
            <h2 className={`${styles.title} text_type_main-medium mt-6 ${location.pathname === '/feed' ? 'mb-6' : 'mb-2'}`}>{name}</h2>
            <p className={`${styles.status} text_type_main-default mt-2 mb-6 ${status === 'done' && styles.statusDone}`}>
                { !(location.pathname === '/feed') && engToRusStatusDict[status]}
                </p>
            <div className={styles.info}>
                <ul className={styles.icons}>
                    {
                        images.map((image: string, i: number) => {
                            if(i >= 6) return;
                            return (
                                <li key={i}>
                                    <IngredientIcon 
                                        image={image}                                          
                                        shiftRatio={i} 
                                        rest={i === 5 && images.length - 6} />
                                </li>
                            )
                        })
                    }
                </ul>
                <div className={styles.priceBlock}>
                    <span className={styles.price}>{price}</span>
                    <CurrencyIcon type="secondary" />
                </div>
            </div>
        </li>
    )
}

export default OrderBlock;