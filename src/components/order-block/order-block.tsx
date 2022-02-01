import React, { FunctionComponent } from "react";

import { CurrencyIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-block.module.css';

type TOrderBlockProps = {
    number: number;
    createdAt: string;
    status: string;
    ingredients: string[];
}

const OrderBlock: FunctionComponent<TOrderBlockProps> = 
    ({ number, createdAt, status, ingredients }) => {

    return (
        <section className={styles.orderBlock}>
            <div className={styles.meta}>
                <span className={``}>{number}</span>
                <span className={``}>{createdAt}</span>
            </div>
            <h2 className={styles.title}></h2>
            <p className={styles.status}>{status}</p>
            <div>
                <div className={styles.priceBlock}>
                    <span className={styles.price}></span>
                    <CurrencyIcon type="secondary" />
                </div>
            </div>
        </section>
    )
}

export default OrderBlock;