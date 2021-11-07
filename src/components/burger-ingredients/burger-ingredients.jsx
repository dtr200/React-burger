import React, { Component } from "react";
import PropTypes from 'prop-types';
import IngredientsNav from "../ingredients-nav/ingredients-nav";
import ItemCart from '../item-cart/item-cart';

import styles from './burger-ingredients.module.css';

class BurgerIngredients extends Component {

    state = {
        tab: 'Булки',
        selected: []
    }

    dict = {
        bun: 'Булки',        
        sauce: 'Соусы',
        main: 'Начинки'
    }

    createIngredientsBlocks = () => {
        const { data } = this.props;
        const blocks = [];

        for(let key in this.dict){
            const item = { title: key };
            item.items = data.filter(elem => 
                elem.type === key)
            blocks.push(item);
        }
        return blocks;
    }

    getTabs = () => 
        Object.values(this.dict);

    onTabClick = (title) => {
        this.setState({ tab: title });
    }

    onSelected = (e) => {
        const id = e.target.parentNode.dataset.id;
        console.log(id)
    }

    render(){        
        const { tab } = this.state;
        const blocks = this.createIngredientsBlocks();
        return(
            <section className={`${styles.burgerIngredients}`}>
                <h1 className={`mt-10 mb-5 text text_type_main-large`}>
                    Соберите бургер
                </h1>
                <IngredientsNav 
                    clickHandler={this.onTabClick}
                    getTabs={this.getTabs}
                    active={tab} />
                <section className={styles.ingredients}>
                    { blocks.map((block, i) => {
                        return (
                            <section key={i}>
                                <h2 className={`text text_type_main-medium mb-6`} 
                                    id={block.title}>
                                    { this.dict[block.title] }
                                </h2>
                                <ul className={`${styles.ingredientsList} pl-4 pr-2`}>
                                    { block.items.map((item, i) => (
                                        <ItemCart 
                                            id={item._id}
                                            name={item.name}
                                            price={item.price}
                                            image={item.image}
                                            selectItem={this.onSelected}
                                            key={i} />
                                        )) }
                                </ul>
                            </section>
                        )
                    }) }
                </section>                
            </section>
        )
    }
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

BurgerIngredients.propTypes =
    PropTypes.arrayOf(ingredientsShapeTypes).isRequired;

export default BurgerIngredients;