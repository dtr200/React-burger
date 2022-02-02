import React, { useEffect, FunctionComponent } from "react";
import OrderBlock from '../order-block/order-block';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { WS_CONNECTION_START } from '../../services/action-constants/ws';
import { WS_ORDERS } from '../../utils/constants';

import Spinner from '../spinner/spinner';

import styles from './full-feed.module.css';

const FullFeed: FunctionComponent = () => {
    const location = useLocation();

    const wsUrl = `${WS_ORDERS}/all`;
    const isTokenExist = document.cookie.match(/(accessToken=)(.+)/);
    let wsUrlToken = '';
    if(isTokenExist)
        wsUrlToken = `${WS_ORDERS}?token=${
            document.cookie.match(/(accessToken=)(.+)/)![2].split(' ')[1]}`;

    const dispatch = useDispatch();

    const { orders } = useSelector((store: any) => store.ws);

    useEffect(() => {
        dispatch({ 
            type: WS_CONNECTION_START,
            payload: location.pathname === '/feed' ? wsUrl : wsUrlToken
        });
    }, [])

    return (
        <article className={styles.fullFeed}>
            <ul className={styles.list}>
                {
                    orders.map((order: any, i: number) => 
                        <OrderBlock {...order} nostatus key={i}/>
                    )
                }
            </ul>
        </article>
    )
}

export default FullFeed;