import React from "react";
import PropTypes from 'prop-types';
import NavButton from "../nav-button/nav-button";
import {
    NAV_SHAPE_TYPES
} from '../../utils/types';

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

Nav.propTypes = {
    items: PropTypes.arrayOf(NAV_SHAPE_TYPES).isRequired
}

export default Nav;