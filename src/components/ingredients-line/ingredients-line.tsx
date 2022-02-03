import React, { FunctionComponent } from "react";
import IngredientIcon from '../ingredient-icon/ingredient-icon';
import { TProductItem } from '../../utils/types';

import { CurrencyIcon } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients-line.module.css';

type TIngredientsLineProps = {
    ingredientId: string;
    ingredients: TProductItem[];
    numbers: number;
};

const IngredientsLine: FunctionComponent<TIngredientsLineProps> = 
    ({ ingredientId, ingredients, numbers }) => {
    
    const { image_mobile: image, price, name } = ingredients.find((item: TProductItem) => 
        item._id === ingredientId)!;


    return (
        <li className={`${styles.orderBlock} text text_type_digits-default`}>            
            <IngredientIcon image={image} />
            <h2 className={`${styles.title} text_type_main-medium`}>
                {name}
            </h2>
            <div className={styles.priceBlock}>
                <span className={styles.price}>{`${numbers} x ${price}`}</span>
                <CurrencyIcon type="secondary" />
            </div>
        </li>
    )
}

export default IngredientsLine;