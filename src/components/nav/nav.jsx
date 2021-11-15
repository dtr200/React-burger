import React from "react";
import PropTypes from 'prop-types';
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

const navShapeTypes = PropTypes.shape({
    title: PropTypes.string.isRequired, 
    logo: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired, 
    view: PropTypes.bool.isRequired 
});

Nav.propTypes = {
    items: PropTypes.arrayOf(navShapeTypes.isRequired)
}

export default Nav;