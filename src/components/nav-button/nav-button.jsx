import React from "react";
import PropTypes from 'prop-types';
import { BurgerIcon, ListIcon, ProfileIcon } from 
'@ya.praktikum/react-developer-burger-ui-components';

import styles from './nav-button.module.css';

const NavButton = ({ title, logo, type, view }) => {
    const dict = {
        burger: () => <BurgerIcon type={type} />,
        list: () => <ListIcon type={type} />,
        profile: () => <ProfileIcon type={type} />
    }   

    const titleStyle = `text text_type_main-default pl-2
                       ${view ? styles.active : 'text_color_inactive'}`;
    
    return (
        <a href='#' className={`${styles.navButton} pl-5 pr-5 pt-4 pb-4`}>
            {dict[logo]()}
            <span className={titleStyle}>{title}</span>
        </a>
    )
}

const navButtonShapeTypes = PropTypes.shape({
    title: PropTypes.string.isRequired, 
    logo: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired, 
    view: PropTypes.bool.isRequired 
});

NavButton.propTypes = navButtonShapeTypes.isRequired;

export default NavButton;