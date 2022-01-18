import React, { FunctionComponent } from 'react';

import styles from './error-indicator.module.css';

const ErrorIndicator: FunctionComponent = () => {
    return (
        <div className={styles.errorIndicator}>
            <span>Ошибка</span>
        </div>
    )
}

export default ErrorIndicator;