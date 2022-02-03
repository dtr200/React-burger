import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";
import { getTime } from '../../utils/utils';
import IngredientsLine from '../ingredients-line/ingredients-line';

import { CurrencyIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-stats.module.css';

type TDict = {
    [key: string]: string;
};

type TMap = {
    [key: string]: number;
};

type TIngredient = {
    ingredientId: string;
    numbers: number;
};

interface MatchParams {
    id: string;
}

const OrderStats: FunctionComponent = () => {
    const location = useLocation();
    const { orders } = useSelector((store: any) => store.ws);
    const { params } = useRouteMatch<MatchParams>();
    const { ingredientsData } = useSelector((store: any) => store.ingredients);

    const { number, name, createdAt, 
            ingredients, status } = orders.find((order: any) => 
        order.number === Number(params.id));

    const engToRusStatusDict: TDict = {
        done: 'Выполнен',
        pending: 'Готовится',
        created: 'Готов'
    }
    const collapseList = (list: string[]) => {
        const map: TMap = {};
        list.forEach((item: string) => {
            if(!map[item])
                map[item] = 1;
            else
                map[item]++;
        });
        const result = [];
        for(let key in map){
            result.push({
                ingredientId: key,
                numbers: map[key]
            });
        };
        return result;
    }

    const price = ingredients.reduce((accum: number, id: string) => 
        accum + ingredientsData.find((item: any) => item._id === id).price, 0);

    return (
        <section className={`${styles.orderBlock} text text_type_digits-default`}>
            <div className={styles.number}>{`#${number}`}</div>
            <h2 className={`${styles.title} text_type_main-medium ${location.pathname === '/feed' ? 'mb-6' : 'mb-2'}`}>
                {name}
            </h2>
            <p className={`${styles.status} text_type_main-default mt-2 mb-6 ${status === 'done' && styles.statusDone}`}>
                { engToRusStatusDict[status] }
            </p>
            <div className={styles.ingredients}>
                <ul className={styles.ingredientsList}>
                    {
                        collapseList(ingredients).map((ingredientData: TIngredient, i: number) => {
                            return (
                                <IngredientsLine 
                                    ingredients={ingredientsData}
                                    {...ingredientData} key={i} />
                            )
                        })
                    }
                </ul>                
            </div>
            <div className={styles.data}>
                <span className={`${styles.date} text_type_main-default`}>
                    {getTime(createdAt)}
                </span>
                <div className={styles.priceBlock}>
                    <span className={styles.price}>{price}</span>
                    <CurrencyIcon type="secondary" />
                </div>
            </div>
        </section>
    )
}

export default OrderStats;