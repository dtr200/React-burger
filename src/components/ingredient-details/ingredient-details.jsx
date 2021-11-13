import React from "react";
import Fact from '../fact/fact';

import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
    
    const { name, image } = props;

    const dict = {
        calories: 'Калории,ккал',
        proteins: 'Белки, г',
        carbohydrates: 'Детали ингредиента',
        fat: 'Жиры, г'
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
        <>
            <img src={image} className={styles.image} alt={name} />
            <p className={`${styles.name}`}>{name}</p>
            <div className={styles.nutritionFacts}>
                { createFactsArray().map(item => 
                        <Fact { ...item} />) }
            </div>
        </>
    );
}

export default IngredientDetails;