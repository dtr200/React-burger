import React from "react";
import { useSelector } from "react-redux";
import { DEFAULT_ORDER_DATA } from 
    '../../utils/constants';

import styles from './order-details.module.css';
import done from '../../images/done.png';

const OrderDetails = () => {
    const { modalData } = useSelector(store => store.modal);
    const { num, description, extra } = DEFAULT_ORDER_DATA;

    const orderNum = modalData && modalData.order.number ? 
        modalData.order.number : num;

    return (
        <div className={`${styles.orderDetails} text mt-4 mb-15`}>
            <div className={`${styles.num} text_type_digits-large`}>
                {orderNum}
            </div>
            <p className={`${styles.text} text_type_main-medium mt-8`}>
                идентификатор заказа
            </p>
            <img src={done} 
                 className={styles.image} 
                 alt={description} />
            <div className="text_type_main-default mb-2">
                {description}
            </div>
            <div className="text_type_main-default text_color_inactive">
                {extra}
            </div>
        </div>
    );
}

export default OrderDetails;