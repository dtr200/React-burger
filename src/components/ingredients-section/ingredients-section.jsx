import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from 'react-intersection-observer';

import ItemCart from '../item-cart/item-cart';
import PropTypes from 'prop-types';
import {
    SET_MODAL_DATA,
    SET_CURRENT_INGREDIENT,
    SET_INGREDIENTS_TAB
  } from '../../services/actions/action-types';

import styles from './ingredients-section.module.css';

const IngredientsSection = ({ title, items }) => {
    const dispatch = useDispatch();

    const { 
        ingredientsData,
        constructorIngredients
      } = useSelector(store => store.ingredients);

    const { ref, inView, entry } = useInView({
        threshold: [0, 0.25, 0.5, 0.75, 1] });


    useEffect(() => {
        dispatch({
            type: SET_INGREDIENTS_TAB,
            id: title,
            ratio: entry ? entry.intersectionRatio : 0
          });
    }, [inView, entry, dispatch]);

    const typeToTitle = {
        bun: 'Булки',        
        sauce: 'Соусы',
        main: 'Начинки'
    }

    const onItemClick = (e) => {
        const li = e.target.closest('li'),
              id = li ? li.dataset.id : null;
        dispatch({
            type: SET_CURRENT_INGREDIENT,
            data: ingredientsData.find(item => item._id === id)
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
            ref={ref}>
            <h2 
                className={`text text_type_main-medium mb-6`} 
                id={title}>
                { typeToTitle[title] }
            </h2>
            <ul className={`${styles.ingredientsList} mt-6 mb-0 pl-4 pr-2`}>
                { items.map((item) => {
                    let amount = 0;
                    constructorIngredients.forEach((element) => {
                        if(element._id === item._id)
                            amount++;
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
}  

const itemShapeTypes = PropTypes.shape({
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

IngredientsSection.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(itemShapeTypes).isRequired
}

export default IngredientsSection;