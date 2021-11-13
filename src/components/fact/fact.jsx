import React from "react";

import styles from './fact.module.css';

const Fact = ({ title, value }) => {
    return (
        <div className={styles.fact}>
            <span>{title}</span>
            <span>{value}</span>
        </div>
    );
}

export default Fact;