import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { Tab } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients-nav.module.css';

type TIngredientsNavProps = {
    onTabClick: (value: string) => void;
};

type TTub = {
    id: string;
    title: string;
    ratio: number;
};

const IngredientsNav: FunctionComponent<TIngredientsNavProps> = ({ onTabClick }) => {
    const { tabs } = useSelector((store: any) => store.ingredients);

    const current = useSelector((state: any) => 
        state.ingredients.tabs.reduce((current: TTub, tab: TTub) => {
            return current.ratio < tab.ratio ? 
                tab : current;
        }, state.ingredients.tabs[0]).id);

    return(
        <nav>
            <ul className={`${styles.list} mb-10`}>
                { tabs.map((tab: TTub, i: number) => {
                    const { title, id } = tab;
                    return <li key={i}>
                        <Tab 
                            value={id} 
                            active={id === current}
                            onClick={() => onTabClick(id)}>
                            {title}
                        </Tab>
                    </li>})
                }
            </ul>
        </nav>
    )
}

export default IngredientsNav;