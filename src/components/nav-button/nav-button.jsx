import React from "react";
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon, Box } from 
'@ya.praktikum/react-developer-burger-ui-components';

import styles from './nav-button.module.css';

const NavButton = ({ title, logo, type, status }) => {
    const dict = {
        burger: () => <BurgerIcon type={type} />,
        list: () => <ListIcon type={type} />,
        profile: () => <ProfileIcon type={type} />
    }    

    return (
        <button className={`${styles.navButton} pl-5 pr-5 pt-4 pb-4`}>
            {dict[logo]()}
            <span className={`${styles.title} pl-2`}>{title}</span>
        </button>
    )
}

NavButton.propTypes = {
    title: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default NavButton;