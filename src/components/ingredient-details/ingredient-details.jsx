import React, { useEffect } from "react";
import Fact from '../fact/fact';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { getIngredients } from '../../services/actions/thunks';
import { INGREDIENTS_URL } from '../../utils/constants';
import Spinner from "../spinner/spinner";

import styles from './ingredient-details.module.css';

const IngredientDetails = () => {
    const { currentIngredient } = useSelector(store => store.ingredients);
    const { ingredientsData, ingredientsRequest } = 
        useSelector(store => store.ingredients);
    const { ingredientId } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if(!currentIngredient._id)
            dispatch(getIngredients(INGREDIENTS_URL));
    }, []);

    const ingredient = ingredientsData.find(item => 
            item._id === ingredientId);

    const keyToTabNameMap = {
        calories: 'Калории,ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    }

    const createFactsArray = () => {
        const items = [];
        for(let key in ingredient){
            if(keyToTabNameMap[key])
                items.push(
                    { title: keyToTabNameMap[key],
                      value: ingredient[key] }
                );
        }
        return [ items.pop(), ...items.sort()];
    }
    const center = !location.state?.background ? styles.center : '';
    const box = !location.state?.background ? styles.box : '';

    return (
        ingredientsRequest ? (
            <Spinner />
        ) : (
        <>
            <div className={`${styles.titleContainer} ${box}`}>
                <h3 className={`${styles.title} ${center} text text_type_main-large pr-15`}>
                    Детали ингредиента
                </h3>
            </div>
            <div className={styles.ingredientDetails}>            
                <img src={ingredient.image_large} 
                    className={styles.image} 
                    alt={ingredient.name} />
                <p className={`${styles.name} text text_type_main-medium mt-4 mb-8`}>
                    {ingredient.name}
                </p>
                <div className={styles.nutritionFacts}>
                    { createFactsArray().map((item, i) => {
                        const w = i === 0 ? 'wide' : 'normal';
                        return <Fact { ...item} key={i + 'str'} width={w} />
                    })}
                </div>
            </div>
        </>
        )
    );
}

export default IngredientDetails;