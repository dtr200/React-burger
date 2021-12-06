import React from "react";
import PropTypes from 'prop-types';

import styles from './order-details.module.css';
import done from '../../images/done.png';

const OrderDetails = (props) => {
    const { num, description, data, extra } = props;

    const orderNum = data && data.order.number ? 
        data.order.number : num;

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

OrderDetails.propTypes = {
    num: PropTypes.string,
    description: PropTypes.string,
    extra: PropTypes.string
}

export default OrderDetails;