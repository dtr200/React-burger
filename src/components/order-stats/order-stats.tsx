import React, { useEffect, FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";
import { getTime } from '../../utils/utils';
import IngredientsLine from '../ingredients-line/ingredients-line';
import Spinner from "../spinner/spinner";
import { WS_CONNECTION_START } from '../../services/action-constants/ws';
import { WS_ORDERS } from '../../utils/constants';

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
    const { orders } = useSelector((store: any) => store.ws);
    const { params } = useRouteMatch<MatchParams>();
    const { ingredientsData, ingredientsRequest } = 
        useSelector((store: any) => store.ingredients);
    const dispatch = useDispatch();
    const location = useLocation();
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

    const wsUrl = `${WS_ORDERS}/all`;
    const isTokenExist = document.cookie.match(/(accessToken=)(.+)/);
    let wsUrlToken = '';
    if(isTokenExist)
        wsUrlToken = `${WS_ORDERS}?token=${
            document.cookie.match(/(accessToken=)(.+)/)![2].split(' ')[1]}`;

    useEffect(() => {
        dispatch({ 
            type: WS_CONNECTION_START,
            payload: location.pathname === `/feed/${params.id}` ? wsUrl : wsUrlToken
        });
    }, [])

    let order, price;
    
    if(orders.length){
        order = orders.find((order: any) => order.number === Number(params.id));
        price = order.ingredients.reduce((accum: number, id: string) => 
            accum + ingredientsData.find((item: any) => item._id === id).price, 0);
    }
 
    return (
        <>
        {
            ingredientsRequest || !order ? (
                <Spinner /> ) : (
                <section className={`${styles.orderStats} text text_type_digits-default`}>
                    <div className={styles.number}>{`#${order.number}`}</div>
                    <h2 className={`text_type_main-medium mt-10 mb-3`}>
                        {order.name}
                    </h2>
                    <p className={`text_type_main-default mb-10 ${order.status === 'done' && styles.statusDone}`}>
                        { engToRusStatusDict[order.status] }
                    </p>
                    <div className={styles.ingredients}>
                        <h3 className="text_type_main-medium">Состав:</h3>
                        <ul className={`${styles.ingredientsList} pr-6`}>
                            {
                                collapseList(order.ingredients).map((ingredientData: TIngredient, i: number) => {
                                    return (
                                        <IngredientsLine 
                                            ingredients={ingredientsData}
                                            {...ingredientData} key={i} />
                                    )
                                })
                            }
                        </ul>                
                    </div>
                    <div className={`${styles.data} mt-10`}>
                        <span className={`${styles.date} text_type_main-default`}>
                            {getTime(order.createdAt)}
                        </span>
                        <div className={styles.priceBlock}>
                            <span className={styles.price}>{price}</span>
                            <CurrencyIcon type="secondary" />
                        </div>
                    </div>
                </section>
            )
        }
        </>        
    )
}

export default OrderStats;