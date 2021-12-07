import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ItemCart from '../item-cart/item-cart';
import {
    SET_MODAL_DATA,
    SET_CURRENT_INGREDIENT
  } from '../../services/actions/action-types';

import styles from './ingredients-section.module.css';

const IngredientsSection = ({ title, items }) => {
    const dispatch = useDispatch();
    
    const { 
        ingredientsData,
        constructorIngredients 
      } = useSelector(store => store.ingredients);

    const containerRef = useRef(null);

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: .5
    }

    const typeToTitle = {
        bun: 'Булки',        
        sauce: 'Соусы',
        main: 'Начинки'
    }

    const observe = entries => {
        const [entry] = entries;
        console.log(containerRef.current)
        console.log(entry.isIntersecting)
        //setTab(entry.isIntersecting);
    }

    useEffect(() => {
        const observer = new IntersectionObserver(observe, options);
        if(containerRef.current)
            observer.observe(containerRef.current);
        return () => {
            if(containerRef.current)
                observer.unobserve(containerRef.current);
        }
    }, [containerRef, options]);

    const getTabs = () => 
        Object.values(typeToTitle);

    const onTabClick = (title) => {

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
            ref={containerRef}>
            <h2 
                className={`text text_type_main-medium mb-6`} 
                id={title}>
                { typeToTitle[title] }
            </h2>
            <ul className={`${styles.ingredientsList} mt-6 mb-0 pl-4 pr-2`}>

                { items.map(item => {
                    const productInCart = constructorIngredients.find(product => 
                        product.item._id === item._id);
                        
                    const pcs = productInCart ? productInCart.pcs : 0;
                    return (
                        <ItemCart 
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            pcs={pcs}
                            key={item._id} /> 
                    )}) 
                }
            </ul>
        </section>
    )
}   

export default IngredientsSection;