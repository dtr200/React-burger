import React from "react";
import NavButton from "../nav-button/nav-button";

import styles from './nav.module.css';

const Nav = ({ items }) => {
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