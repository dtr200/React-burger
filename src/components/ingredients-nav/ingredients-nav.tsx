import React, { FunctionComponent } from "react";
import { useSelector } from "../../services/types/hooks";
import { Tab } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredients-nav.module.css';
import { TTabs } from '../../utils/types';

type TIngredientsNavProps = {
    onTabClick: (value: string) => void;
};

const IngredientsNav: FunctionComponent<TIngredientsNavProps> = ({ onTabClick }) => {
    const { tabs }: { tabs: TTabs[] } = useSelector(store => store.ingredients);

    const current = tabs.reduce((current: TTabs, tab: TTabs) => {
            return current.ratio < tab.ratio ? 
                tab : current;
        }, tabs[0]).id;

    return(
        <nav>
            <ul className={`${styles.list} mb-10`}>
                { tabs.map((tab: TTabs, i: number) => {
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