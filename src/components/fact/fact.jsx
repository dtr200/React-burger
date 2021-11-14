import React from "react";

import styles from './fact.module.css';

const Fact = ({ title, value }) => {
    return (
        <div className={`${styles.fact} text text_color_inactive`}>
            <span className={`${styles.text} text_type_main-small`}>
                {title}
            </span>
            <span className={`${styles.text} text_type_digits-default`}>
                {value}
            </span>
        </div>
    );
}

export default Fact;