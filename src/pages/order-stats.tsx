import React, { FunctionComponent } from "react";
import OrderStats from "../components/order-stats/order-stats";
import Stats from '../components/stats/stats';

import styles from './page.module.css';

const OrderStatsPage: FunctionComponent = () => {
    
    return (
        <main className={styles.orderStatsPage}>
            <OrderStats />
        </main>
    )
}

export default OrderStatsPage;