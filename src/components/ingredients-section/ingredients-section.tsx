import React, { useEffect, RefObject, SyntheticEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from 'react-intersection-observer';

import ItemCart from '../item-cart/item-cart';
import {
    SET_MODAL_DATA,
    SET_CURRENT_INGREDIENT,
    SET_INGREDIENTS_TAB
  } from '../../services/actions/action-types';
import { TProductItem } from '../../utils/types';
import { TTypeToTitle } from '../burger-ingredients/burger-ingredients';

import styles from './ingredients-section.module.css';

type TIngredientsSectionProps = {
    title: keyof TTypeToTitle;
    items: Array<TProductItem>;
    ref: RefObject<HTMLElement>
}

const IngredientsSection = React.forwardRef<HTMLHeadingElement, TIngredientsSectionProps>(
    ({ title, items }, ref) => {
    const dispatch = useDispatch();

    const { 
        ingredientsData,
        constructorIngredients
      } = useSelector((store: any) => store.ingredients);

    const { ref: refDnd, inView, entry } = useInView({
        threshold: [0, 0.25, 0.5, 0.75, 1] });


    useEffect(() => {
        dispatch({
            type: SET_INGREDIENTS_TAB,
            id: title,
            ratio: entry ? entry.intersectionRatio : 0
          });
    }, [inView, entry, dispatch]);

    const typeToTitle: TTypeToTitle = {
        bun: 'Булки',        
        sauce: 'Соусы',
        main: 'Начинки'
    }

    const onItemClick = (e: SyntheticEvent) => {
        const li = (e.target as HTMLElement).closest('li'),
              id = li ? li.dataset.id : null;
        dispatch({
            type: SET_CURRENT_INGREDIENT,
            data: ingredientsData.find((item: TProductItem) => item._id === id)
        })
        dispatch({ 
            type: SET_MODAL_DATA,
            mode: 'ingredient',
            title: 'Детали ингредиента'
        });
    }

    return (
        <section
            onClick={onItemClick}
            id={title}
            ref={refDnd}>
            <h2 
                className={`text text_type_main-medium mb-6`}
                id={title}
                ref={ref}>
                { typeToTitle[title] }
            </h2>
            <ul className={`${styles.ingredientsList} mt-6 mb-0 pl-4 pr-2`}>
                { items.map((item: TProductItem) => {
                    let amount: number = 0;
                    constructorIngredients.forEach((element: TProductItem) => {
                        if(element._id === item._id)
                            amount = element.type === 'bun' ? 2 : amount + 1;
                    });

                    return (
                        <ItemCart 
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            type={item.type}
                            amount={amount}
                            key={item._id} /> 
                    )}) 
                }
            </ul>
        </section>
    )
})

export default IngredientsSection;