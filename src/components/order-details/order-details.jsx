import React from "react";

import styles from './order-details.module.css';

const OrderDetails = ({ num, image, description, extra }) => {
    return (
        <>
            <div className={styles.num}>{num}</div>
            <p className={``}>идентификатор заказа</p>
            <img src={image} alt={description} />
            <div className={styles.description}>{description}</div>
            <div className={styles.wait}>{extra}</div>
        </>
    );
}

export default OrderDetails;