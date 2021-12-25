import React, { useRef } from "react";
import { useSelector } from "react-redux";
import IngredientsNav from "../ingredients-nav/ingredients-nav";
import IngredientsSection from '../ingredients-section/ingredients-section';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    
    const { ingredientsData } = 
        useSelector(store => store.ingredients);
        
    const bunRef = useRef(null);
    const sauceRef = useRef(null);
    const mainRef = useRef(null);
        
    const typeToTitle = {
        bun: 'Булки',        
        sauce: 'Соусы',
        main: 'Начинки'
    }

    const titleToRef = {
        bun: bunRef,
        sauce: sauceRef,
        main: mainRef
    }

    const onTabClick = (e) => {
        const element = titleToRef[e].current;
        element.scrollIntoView({ behavior: "smooth" });
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
    console.log(blocks)
    return (
        <section className={`${styles.burgerIngredients}`}>
            <h1 className={`mt-10 mb-5 text text_type_main-large`}>
                Соберите бургер
            </h1>
            <IngredientsNav onTabClick={onTabClick} />
                <section className={styles.ingredients}>
                { blocks.map((block, i) => 
                    <IngredientsSection 
                        key={block.items[0]._id + i}   
                        ref={titleToRef[block.title]}                     
                        {...block}
                    />
                ) }
                </section>            
        </section>
    )
}   

export default BurgerIngredients;