import React from "react";

import styles from './order-details.module.css';
import done from '../../images/done.png';

const OrderDetails = ({ num, description, extra }) => {

    return (
        <div className={`${styles.orderDetails} text`}>
            <div className={`${styles.num} text_type_digits-large`}>{num}</div>
            <p className={`text_type_main-medium`}>идентификатор заказа</p>
            <img src={done} className={`${styles.image}`} alt={description} />
            <div className={`${styles.description} text_type_main-default`}>{description}</div>
            <div className={`${styles.wait} text_type_main-default text_color_inactive`}>{extra}</div>
        </div>
    );
}

export default OrderDetails;