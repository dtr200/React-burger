import React, { useRef, FunctionComponent, RefObject } from "react";
import { useSelector } from "react-redux";
import IngredientsNav from "../ingredients-nav/ingredients-nav";
import IngredientsSection from '../ingredients-section/ingredients-section';
import { TProductItem } from '../../utils/types';

import styles from './burger-ingredients.module.css';

type TTitleToRef = {
    [name: string]: RefObject<HTMLHeadingElement>;
};

export type TTypeToTitle = {
    bun: 'Булки';    
    sauce: 'Соусы';
    main: 'Начинки';
};

type TIngredientsBlockItem = {
    title: keyof TTypeToTitle;
    items: Array<TProductItem>;
};

const BurgerIngredients: FunctionComponent = () => {
    
    const { ingredientsData } = 
        useSelector((store: any) => store.ingredients);
        
    const bunRef = useRef<HTMLHeadingElement>(null);
    const sauceRef = useRef<HTMLHeadingElement>(null);
    const mainRef = useRef<HTMLHeadingElement>(null);
        
    const typeToTitle: TTypeToTitle = {
        bun: 'Булки',        
        sauce: 'Соусы',
        main: 'Начинки'
    }

    const titleToRef: TTitleToRef = {
        bun: bunRef,
        sauce: sauceRef,
        main: mainRef
    }

    const onTabClick = (value: string) => {
        const element = titleToRef[value].current;
        element?.scrollIntoView({ behavior: "smooth" });
    }

    const createIngredientsBlocks = () => {        
        const blocks: Array<TIngredientsBlockItem> = [];
        (Object.keys(typeToTitle) as (keyof TTypeToTitle)[]).forEach(key => {
            const item: TIngredientsBlockItem = { 
                title: key,
                items: [] 
            };            
            ingredientsData.forEach((elem: TProductItem) => {
                if(elem.type === key)
                    item.items.push(elem);            
            });
            blocks.push(item);
        });
        return blocks;
    }
       
    const blocks = createIngredientsBlocks();    
 
    return (
        <section className={`${styles.burgerIngredients}`}>
            <h1 className={`mt-10 mb-5 text text_type_main-large`}>
                Соберите бургер
            </h1>
            <IngredientsNav onTabClick={onTabClick} />
                <section className={styles.ingredients}>
                { blocks.map((block: TIngredientsBlockItem, i: number) => 
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