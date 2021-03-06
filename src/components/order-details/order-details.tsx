import React, { FunctionComponent } from "react";
import { useSelector } from "../../services/types/hooks";
import { DEFAULT_ORDER_DATA } from 
    '../../utils/constants';
import Spinner from "../spinner/spinner";
import { TOrderResponseData } from '../../utils/types';

import styles from './order-details.module.css';
import done from '../../images/done.png';

const OrderDetails: FunctionComponent = () => {
    const { modalData }: { modalData: TOrderResponseData } = useSelector(store => store.modal);
    const { orderRequest }: { orderRequest: boolean } = useSelector(store => store.order);
    const { num, description, extra } = DEFAULT_ORDER_DATA;

    const orderNum = modalData && modalData.order?.number ? 
        modalData.order.number : num;

    return (
        orderRequest ? (
        <div className={`${styles.loading}`}>
            <Spinner />
        </div>
        ) : (
        <div className={`${styles.orderDetails} text mt-4 mb-15`}>
            <div className={`${styles.num} text_type_digits-large`}>
                {orderNum}
            </div>
            <p 
                className={`${styles.text} text_type_main-medium mt-8`}
                data-cy="order-details-title">
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