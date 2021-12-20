import React from 'react';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';

const OrderHistoryPage = () => {
    return (        
            <section className={`${styles.container} text`}>
                История заказов
            </section>
  );
}

export default OrderHistoryPage;