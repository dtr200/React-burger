import React, { FunctionComponent } from 'react';

import styles from './profile.module.css';

const OrderHistoryPage: FunctionComponent = () => {
    return (        
            <section className={`${styles.container} text`}>
                История заказов
            </section>
  );
}

export default OrderHistoryPage;