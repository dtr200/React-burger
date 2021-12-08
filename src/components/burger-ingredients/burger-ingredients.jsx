import React from "react";
import { useSelector } from "react-redux";
import IngredientsNav from "../ingredients-nav/ingredients-nav";
import IngredientsSection from '../ingredients-section/ingredients-section';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    
    const { 
        ingredientsData, 
        constructorIngredients 
    } = useSelector(store => store.ingredients);

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
                const product = {
                    item: {},
                    amount: 0
                };
                if(elem.type === key){
                    const ingredient = constructorIngredients.find(ingred => 
                        ingred.item._id === elem._id);                        
                    const numbers = ingredient && ingredient.amount;                
                    product.item = elem;
                    product.amount = numbers ? numbers : 0;
                    item.items.push(product);
                };                
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
                        key={block.items[0].item._id + i}
                        {...block}
                    />
                ) }
                </section>            
        </section>
    )
}   

export default BurgerIngredients;