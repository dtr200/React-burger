import React, { FunctionComponent } from "react";
import Fact from '../fact/fact';
import { useSelector } from '../../services/types/hooks';
import { useParams, useLocation } from 'react-router-dom';
import Spinner from "../spinner/spinner";
import { TProductItem } from '../../utils/types';
import { TLocation } from '../app/app';
 
import styles from './ingredient-details.module.css';

type TIngredientId = { 
    ingredientId: string;
};

type TKeyToTabNameMap = {
    [name: string]: string;
}

type TIngredientData = {
    title: string;
    value: number;
}

type TIngredient = { [key: string]: any } | undefined;

type TItem = TIngredientData | undefined;

const IngredientDetails: FunctionComponent = () => {
    const { ingredientsData, ingredientsRequest } :
    { ingredientsData: TProductItem[], ingredientsRequest: boolean} = 
        useSelector((store: any) => store.ingredients);

    const { ingredientId }: TIngredientId = useParams();
    const location: TLocation = useLocation();

    const ingredient: TIngredient = ingredientsData.find((item: TProductItem) => 
            item._id === ingredientId);

    const keyToTabNameMap: TKeyToTabNameMap = {
        calories: 'Калории,ккал',
        proteins: 'Белки, г',
        fat: 'Жиры, г',
        carbohydrates: 'Углеводы, г'
    }

    const createFactsArray: () => Array<TItem> = () => {
        const items: Array<TItem> = [];
        for(let key in ingredient){
            if(keyToTabNameMap[key])
                items.push(
                    { title: keyToTabNameMap[key],
                        value: ingredient[key] }
                );
        }      
        return [ items.pop(), ...items.sort()];
    }

    const center: string = !location.state?.background ? styles.center : '';
    const box: string = !location.state?.background ? styles.box : '';

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
                <img src={ingredient?.image_large} 
                    className={styles.image} 
                    alt={ingredient?.name} />
                <p 
                    className={`${styles.name} text text_type_main-medium mt-4 mb-8`}
                    data-cy="ingredient-modal-name">
                    {ingredient?.name}
                </p>
                <div className={styles.nutritionFacts}>
                    { createFactsArray().map((item: TItem, i: number) => {
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