import React from "react";
import Fact from '../fact/fact';
import { useSelector } from 'react-redux';

import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
    const { modalData } = useSelector(store => store.modal);

    const { name: ingredientName, 
            image_large: ingredientImage } = modalData;

    const keyToTabNameMap = {
        calories: 'Калории,ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    }

    const createFactsArray = () => {
        const items = [];
        for(let key in modalData){
            if(keyToTabNameMap[key])
                items.push(
                    { title: keyToTabNameMap[key],
                      value: modalData[key] }
                );
        }
        return [ items.pop(), ...items.sort()];
    }

    return (
        <div className={styles.ingredientDetails}>
            <img src={ingredientImage} 
                 className={styles.image} 
                 alt={ingredientName} />
            <p className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>
                {ingredientName}
            </p>
            <div className={styles.nutritionFacts}>
                { createFactsArray().map((item, i) => {
                    const w = i === 0 ? 'wide' : 'normal';
                    return <Fact { ...item} key={i + 'str'} width={w} />
                })}
            </div>
        </div>
    );
}

export default IngredientDetails;