import React, { FunctionComponent } from "react";
import NavButton from "../nav-button/nav-button";
import { THeaderButtonsData } from '../../utils/types';

import styles from './nav.module.css';

type TNavProps = {
    items: Array<THeaderButtonsData>
}

const Nav: FunctionComponent<TNavProps> = ({ items }) => {
    return (
        <nav className={styles.nav}>
            { 
                items.map((item, i) => 
                    <NavButton {...item} key={i} />)
            } 
        </nav> 
    )
}

export default Nav;