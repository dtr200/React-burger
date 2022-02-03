import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";

import styles from './order-stats.module.css';

type TOrderStatsProps = {
    
}

const OrderStats: FunctionComponent<TOrderStatsProps> = () => {
    
    return (
        <li className={`${styles.orderBlock} text text_type_digits-default`}>
            <div className={styles.meta}>
                <span className={``}>{`#${number}`}</span>
                <span className={`${styles.date} text_type_main-default`}>{getTime()}</span>
            </div>
            <h2 className={`${styles.title} text_type_main-medium ${location.pathname === '/feed' ? 'mb-6' : 'mb-2'}`}>{name}</h2>
            <p className={`${styles.status} text_type_main-default mt-2 mb-6 ${status === 'done' && styles.statusDone}`}>
                { !(location.pathname === '/feed') && engToRusStatusDict[status]}
                </p>
            <div className={styles.info}>
                <ul className={styles.icons}>
                    {
                        images.map((image: string, i: number) => {
                            if(i >= 6) return;
                            return (
                                <IngredientIcon 
                                    image={image} 
                                    key={i} 
                                    shiftRatio={i} 
                                    rest={i === 5 && images.length - 6} />
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

export default OrderStats;