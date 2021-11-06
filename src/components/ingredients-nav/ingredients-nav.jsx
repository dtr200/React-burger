import React, { Component } from "react";
import { Tab } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredients-nav.module.css';

class IngredientsNav extends Component {

    tabs = this.props.getTabs();

    render(){
        const { active, clickHandler } = this.props;

        return(
            <nav>
                <ul className={`${styles.list} mb-10`}>
                    { this.tabs.map((tab, i) => (
                        <li key={i}>
                            <Tab value={tab} 
                                active={tab === active}
                                onClick={clickHandler}>
                                {tab}
                            </Tab>
                        </li>)) }
                </ul>
            </nav>
        )
    }
}

export default IngredientsNav;