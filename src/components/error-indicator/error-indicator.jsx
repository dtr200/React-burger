import React from 'react';

import styles from './error-indicator.module.css';

const ErrorIndicator = () => {
    return (
        <div className={styles.errorIndicator}>
            <span>Ошибка</span>
        </div>
    )
}

export default ErrorIndicator;