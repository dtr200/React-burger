import React, { FunctionComponent } from "react";
import OrdersList from "../components/orders-list/orders-list";
import Stats from '../components/stats/stats';

import styles from './page.module.css';

const FeedPage: FunctionComponent = () => {
    
    return (
        <main className={styles.feed}>
            <h1 className={`text text_type_main-large mb-5`}>Лента заказов</h1>
            <article className={styles.content}>
                <OrdersList />
                <Stats />
            </article>            
        </main>
    )
}

export default FeedPage;