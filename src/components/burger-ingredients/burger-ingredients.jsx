import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import IngredientsNav from "../ingredients-nav/ingredients-nav";
import ItemCart from '../item-cart/item-cart';
import {
    SET_MODAL_DATA
  } from '../../services/actions/action-types';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const { 
        ingredientsData,
        constructorIngredients 
      } = useSelector(store => store.ingredients);

    const [ tab, setTab ] = useState('Булки');

    const typeToTitle = {
        bun: 'Булки',        
        sauce: 'Соусы',
        main: 'Начинки'
    }

    const createIngredientsBlocks = () => {        
        const blocks = [];

        for(let key in typeToTitle){
            const item = { title: key };
            item.items = ingredientsData.filter(elem => 
                elem.type === key)
            blocks.push(item);
        }
        return blocks;
    }

    const getTabs = () => 
        Object.values(typeToTitle);

    const onTabClick = (title) =>
        setTab(title);

    const onItemClick = (e) => {
        const li = e.target.closest('li'),
              id = li ? li.dataset.id : null;

        dispatch({ 
            type: SET_MODAL_DATA,
            mode: 'ingredient',
            title: 'Детали ингредиента',
            data: ingredientsData.find(item => item._id === id)
        });
    }
       
    const blocks = createIngredientsBlocks();

    return (
        <section className={`${styles.burgerIngredients}`}>
            <h1 className={`mt-10 mb-5 text text_type_main-large`}>
                Соберите бургер
            </h1>
            <IngredientsNav 
                clickHandler={onTabClick}
                getTabs={getTabs}
                active={tab} />
                <section className={styles.ingredients}>
                { blocks.map((block, i) => {
                    return (
                        <section key={block.items[0]._id + i} onClick={onItemClick}>
                            <h2 className={`text text_type_main-medium mb-6`} 
                                id={block.title}>
                                { typeToTitle[block.title] }
                            </h2>
                            <ul className={`${styles.ingredientsList} mt-6 mb-0 pl-4 pr-2`}>

                                { block.items.map(item => {
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
                }) }
            </section>            
        </section>
    )
}   

export default BurgerIngredients;