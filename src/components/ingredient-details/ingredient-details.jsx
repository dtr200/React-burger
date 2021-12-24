import React, { useEffect } from "react";
import Fact from '../fact/fact';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/actions/thunks';
import { INGREDIENTS_URL } from '../../utils/constants';
import Spinner from "../spinner/spinner";
import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
    let { currentIngredient } = useSelector(store => store.ingredients);
    const { ingredientsData, ingredientsRequest } = 
        useSelector(store => store.ingredients);
    const { ingredientId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!currentIngredient)
            dispatch(getIngredients(INGREDIENTS_URL));
    }, []);

    if(!currentIngredient._id){
        currentIngredient = ingredientsData.find(item => 
            item._id === ingredientId);
    }

    // Доделать это
    /* const { name: ingredientName, 
            image_large: ingredientImage } = currentIngredient; */
    
    const keyToTabNameMap = {
        calories: 'Калории,ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    }

    const createFactsArray = () => {
        const items = [];
        for(let key in currentIngredient){
            if(keyToTabNameMap[key])
                items.push(
                    { title: keyToTabNameMap[key],
                      value: currentIngredient[key] }
                );
        }
        return [ items.pop(), ...items.sort()];
    }

    return (
        ingredientsRequest ? (
            <Spinner />
        ) : (
        <div className={styles.ingredientDetails}>
            <img src={currentIngredient.image_large} 
                 className={styles.image} 
                 alt={currentIngredient.name} />
            <p className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>
                {currentIngredient.name}
            </p>
            <div className={styles.nutritionFacts}>
                { createFactsArray().map((item, i) => {
                    const w = i === 0 ? 'wide' : 'normal';
                    return <Fact { ...item} key={i + 'str'} width={w} />
                })}
            </div>
        </div>
        )
    );
}

export default IngredientDetails;