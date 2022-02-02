import React, { useEffect, FunctionComponent } from "react";
import OrderBlock from '../order-block/order-block';
import { useDispatch, useSelector } from "react-redux";
import { WS_CONNECTION_START } from '../../services/action-constants/ws';

import Spinner from '../spinner/spinner';

import styles from './full-feed.module.css';

const FullFeed: FunctionComponent = () => {

    const dispatch = useDispatch();

    const { orders } = useSelector((store: any) => store.ws);

    console.log(orders)
    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START });
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