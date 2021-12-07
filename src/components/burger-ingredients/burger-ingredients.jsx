import React, { useState } from "react";
import { useSelector } from "react-redux";
import IngredientsNav from "../ingredients-nav/ingredients-nav";
import IngredientsSection from '../ingredients-section/ingredients-section';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => {
    
    const { ingredientsData } = useSelector(store => store.ingredients);

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
                elem.type === key);
            blocks.push(item);
        }
        return blocks;
    }

    const getTabs = () => 
        Object.values(typeToTitle);

    const onTabClick = (title) => {

        setTab(title);
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