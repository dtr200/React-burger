import React, { FunctionComponent } from "react";

import styles from './fact.module.css';

type TFactProps = {
    title: string;
    value: number;
    width: string;
};

const Fact: FunctionComponent<TFactProps> = ({ title, value, width }) => {
    const w = width === 'wide' ? styles.wide : '';
    return (
        <div className={`${styles.fact} ${w} text text_color_inactive`}>
            <span className={`${styles.text} text_type_main-default`}>
                {title}
            </span>
            <span className={`${styles.text} text_type_digits-default`}>
                {value}
            </span>
        </div>
    );
}

export default Fact;