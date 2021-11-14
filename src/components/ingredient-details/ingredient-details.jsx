import React from "react";
import Fact from '../fact/fact';

import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
    console.log(props)
    const { name, image_large: image } = props;

    const dict = {
        calories: 'Калории,ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    }

    const createFactsArray = () => {
        const result = [];
        for(let key in props){
            if(dict[key])
                result.push({ title: dict[key],
                              value: props[key] });
        }
        return result;
    }

    return (
        <div className={styles.ingredientDetails}>
            <img src={image} className={styles.image} alt={name} />
            <p className={`${styles.name} text text_type_main-medium mt-2 mb-8`}>
                {name}
            </p>
            <div className={styles.nutritionFacts}>
                { createFactsArray().map((item, i) => {
                    const num = i + Math.floor(Math.random() * 100);
                    return <Fact { ...item} key={num} />
                })}
            </div>
        </div>
    );
}

export default IngredientDetails;