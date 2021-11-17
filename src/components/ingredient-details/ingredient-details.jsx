import React from "react";
import Fact from '../fact/fact';
import PropTypes from 'prop-types';

import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
    const { name: ingredientName, 
            image_large: ingredientImage } = props;

    const keyToTabNameMap = {
        calories: 'Калории,ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    }

    const createFactsArray = () => {
        const items = [];
        for(let key in props){
            if(keyToTabNameMap[key])
                items.push(
                    { title: keyToTabNameMap[key],
                      value: props[key] }
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

const detailsShapeTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
});

IngredientDetails.propTypes = detailsShapeTypes.isRequired;

export default IngredientDetails;