import React from "react";

import styles from './order-details.module.css';
import done from '../../images/done.png';

const OrderDetails = ({ num, description, extra }) => {

    return (
        <>
            <div className={styles.num}>{num}</div>
            <p className={``}>идентификатор заказа</p>
            <img src={done} alt={description} />
            <div className={styles.description}>{description}</div>
            <div className={styles.wait}>{extra}</div>
        </>
    );
}

export default OrderDetails;