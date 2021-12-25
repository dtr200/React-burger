import React from "react";
import { useSelector } from "react-redux";
import { Tab } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredients-nav.module.css';

const IngredientsNav = ({ onTabClick }) => {
    const { tabs } = useSelector(store => store.ingredients);

    const current = useSelector(state => 
        state.ingredients.tabs.reduce((current, tab) => {
            return current.ratio < tab.ratio ? 
                tab : current;
        }, state.ingredients.tabs[0]).id);

    return(
        <nav>
            <ul className={`${styles.list} mb-10`}>
                { tabs.map(({ title, id }, i) => (
                    <li key={i}>
                        <Tab 
                            value={id} 
                            active={id === current}
                            onClick={onTabClick}>
                            {title}
                        </Tab>
                    </li>)) }
            </ul>
        </nav>
    )
}

export default IngredientsNav;