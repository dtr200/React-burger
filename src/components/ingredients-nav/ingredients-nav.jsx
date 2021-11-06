import React, { Component } from "react";
import { Tab } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './ingredients-nav.module.css';

class IngredientsNav extends Component {

    tabs = this.props.getTabs();

    render(){
        const { active } = this.props;

        return(
            <nav>
                <ul className={styles.list}>
                    {
                        this.tabs.map((tab, i) => (
                            <li key={i}>
                                <Tab value={tab} 
                                    active={tab === active}
                                    onClick={this.props.clickHandler}>
                                    {tab}
                                </Tab>
                            </li>))
                    }
                </ul>
            </nav>
        )
    }
}

export default IngredientsNav;