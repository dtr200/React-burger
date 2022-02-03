import React, { FunctionComponent } from "react";

import styles from './ingredient-icon.module.css';

type TIngredientIconProps = {
    image: string;
    shiftRatio?: number;
    rest?: number | boolean;
}

const IngredientIcon: FunctionComponent<TIngredientIconProps> = ({ image, shiftRatio, rest }) => {

    const shift = shiftRatio && styles[`shift-${shiftRatio}`];

    return (
        <li className={`${styles.icon} ${shift}`}>
            <div className={`${styles.overlay}`}>
                { 
                    rest && (
                    <div className={`${styles.rest} text text_type_main-default`}>
                        {`+${rest}`}
                    </div>
                    ) 
                }
                <img src={image} alt="ingredient" width="112" height="56"/>
            </div>        
        </li>
    )
}

export default IngredientIcon;