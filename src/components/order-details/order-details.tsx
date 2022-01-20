import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { DEFAULT_ORDER_DATA } from 
    '../../utils/constants';
import Spinner from "../spinner/spinner";

import styles from './order-details.module.css';
import done from '../../images/done.png';

const OrderDetails: FunctionComponent = () => {
    const { modalData } = useSelector((store: any) => store.modal);
    const { orderRequest } = useSelector((store: any) => store.order);
    const { num, description, extra } = DEFAULT_ORDER_DATA;

    const orderNum: number = modalData && modalData.order?.number ? 
        modalData.order.number : num;

    return (
        orderRequest ? (
            <Spinner />
        ) : (
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
        )
    );
}

export default OrderDetails;