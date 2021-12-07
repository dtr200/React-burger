import React from "react";
import PropTypes from 'prop-types';
import { Tab } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredients-nav.module.css';

const IngredientsNav = ({ active, getTabs, 
                          clickHandler }) => {

    const tabs = getTabs();
                        
    return(
        <nav>
            <ul className={`${styles.list} mb-10`}>
                { tabs.map((tab, i) => (
                    <li key={i}>
                        <Tab 
                            value={tab} 
                            active={tab === active}
                            onClick={clickHandler}>
                            {tab}
                        </Tab>
                    </li>)) }
            </ul>
        </nav>
    )
}

IngredientsNav.propTypes = {
    active: PropTypes.string.isRequired,
    getTabs: PropTypes.func.isRequired,
    clickHandler: PropTypes.func.isRequired
}

export default IngredientsNav;