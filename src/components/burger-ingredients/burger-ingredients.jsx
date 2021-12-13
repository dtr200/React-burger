import React from "react";
import { useSelector } from "react-redux";
import IngredientsNav from "../ingredients-nav/ingredients-nav";
import IngredientsSection from '../ingredients-section/ingredients-section';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    
    const { ingredientsData } = 
        useSelector(store => store.ingredients);

    const typeToTitle = {
        bun: 'Булки',        
        sauce: 'Соусы',
        main: 'Начинки'
    }

    const createIngredientsBlocks = () => {        
        const blocks = [];
        for(let key in typeToTitle){
            const item = { 
                title: key,
                items: [] 
            };            
            ingredientsData.forEach(elem => {
                if(elem.type === key)
                    item.items.push(elem);            
            });
            blocks.push(item);
        }
        return blocks;
    }
       
    const blocks = createIngredientsBlocks();    

    return (
        <section className={`${styles.burgerIngredients}`}>
            <h1 className={`mt-10 mb-5 text text_type_main-large`}>
                Соберите бургер
            </h1>
            <IngredientsNav />
                <section className={styles.ingredients}>
                { blocks.map((block, i) => 
                    <IngredientsSection 
                        key={block.items[0]._id + i}
                        {...block}
                    />
                ) }
                </section>            
        </section>
    )
}   

export default BurgerIngredients;