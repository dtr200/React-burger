import React, { FunctionComponent } from "react";
import { useSelector } from "../../services/types/hooks";
import { TWSOrder } from '../../utils/types';

import styles from './stats.module.css';

const Stats: FunctionComponent = () => {

    const { orders, total, totalToday }: 
    { orders: TWSOrder[], total: number, totalToday: number } = useSelector(store => store.ws);

    const doneOrders: TWSOrder[] = orders.filter(order => order.status === 'done');
    const inProgressOrders: TWSOrder[] = orders.filter(order => order.status === 'created');

    const getTotalSection = (title: string, total: number) => {
        return (
            <section className={`${styles.ready} mb-15`}>
                <h3 className={`${styles.totalTitle} text_type_main-medium`}>{title}</h3>
                <p className={`${styles.total} text_type_digits-large`}>{total}</p>
            </section>
        )
    }

    const getNumberSection = (title: string, orders: TWSOrder[]) => {
        return (
            <div className={styles.numbers}>
                    <h3 className={`text_type_main-medium mb-6 mt-1`}>{title}</h3>
                    <ul className={styles.allNumbers}>
                        {
                            orders.map((order: TWSOrder, i: number) => (                               
                                <li className={`${styles.num} ${title === 'В работе:' ? 
                                    styles.inProgress : styles.done} text_type_digits-default`} key={i}>
                                    {order.number}
                                </li>))
                        }
                    </ul>
            </div>
        )
    }

    return (
        <article className={`${styles.stats} text`}>
            <section className={`${styles.orders} mb-15`}>
                { getNumberSection('Готовы:', doneOrders) }
                { getNumberSection('В работе:', inProgressOrders) }
            </section>
            { getTotalSection('Выполнено за все время:', total) }
            { getTotalSection('Выполнено за сегодня:', totalToday) }
        </article>
    )
}

export default Stats;