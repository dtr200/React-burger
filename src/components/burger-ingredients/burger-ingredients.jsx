import React, { useState } from "react";
import PropTypes from 'prop-types';
import IngredientsNav from "../ingredients-nav/ingredients-nav";
import ItemCart from '../item-cart/item-cart';

import styles from './burger-ingredients.module.css';

const BurgerIngredients = ({ data, cart, onOpen }) => {

    const [ tab, setTab ] = useState('Булки');

    const dict = {
        bun: 'Булки',        
        sauce: 'Соусы',
        main: 'Начинки'
    }

    const createIngredientsBlocks = () => {        
        const blocks = [];

        for(let key in dict){
            const item = { title: key };
            item.items = data.filter(elem => 
                elem.type === key)
            blocks.push(item);
        }
        return blocks;
    }

    const getTabs = () => 
        Object.values(dict);

    const onTabClick = (title) =>
        setTab(title);

    const onItemClick = (e) => {
        const li = e.target.closest('li'),
              id = li ? li.dataset.id : null;
        onOpen({ type: 'ingredient', id });
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
                                { dict[block.title] }
                            </h2>
                            <ul className={`${styles.ingredientsList} mt-6 mb-0 pl-4 pr-2`}>
                                { block.items.map(item => {
                                    const productInCart = cart.find(product => 
                                        product.id === item._id);
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

const ingredientsShapeTypes = PropTypes.shape({
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
const cartShapeTypes = PropTypes.shape({
    id: PropTypes.string.isRequired,
    psc: PropTypes.number.isRequired
})

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientsShapeTypes).isRequired,
    cart: PropTypes.arrayOf(cartShapeTypes).isRequired,
    onOpen: PropTypes.func.isRequired
}    

export default BurgerIngredients;