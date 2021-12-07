import React from "react";
import { useSelector } from "react-redux";
import { Tab } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredients-nav.module.css';

const IngredientsNav = () => {
    const { tabs } = useSelector(store => store.ingredientsNav);

    const current = useSelector(state => 
        state.ingredientsNav.tabs.reduce((current, tab) => {
            return current.ratio < tab.ratio ? 
                tab : current;
        }, state.ingredientsNav.tabs[0]).id);

    return(
        <nav>
            <ul className={`${styles.list} mb-10`}>
                { tabs.map(({ title, id }, i) => (
                    <li key={i}>
                        <Tab 
                            value={id} 
                            active={id === current}>
                            {title}
                        </Tab>
                    </li>)) }
            </ul>
        </nav>
    )
}

export default IngredientsNav;