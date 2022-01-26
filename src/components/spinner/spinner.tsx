import React, { FunctionComponent } from "react";

import styles from './spinner.module.css';

const Spinner: FunctionComponent = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles['lds-roller']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>        
    )
}

export default Spinner;