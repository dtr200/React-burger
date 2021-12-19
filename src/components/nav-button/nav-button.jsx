import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon } from 
'@ya.praktikum/react-developer-burger-ui-components';
import {
    NAV_SHAPE_TYPES
} from '../../utils/types';

import styles from './nav-button.module.css';

const NavButton = ({ title, logo, type, view }) => {
    const dictLogoToImg = {
        burger: () => <BurgerIcon type={type} />,
        list: () => <ListIcon type={type} />,
        profile: () => <ProfileIcon type={type} />
    }

    const dictTitleToLink = {
        'Конструктор': '/',
        'Лента заказов': '/',
        'Личный кабинет': '/profile'
    }

    const titleStyle = `text text_type_main-default pl-2
                       ${view ? styles.active : 'text_color_inactive'}`;
    
    return (
        <Link to={dictTitleToLink[title]} className={`${styles.navButton} pl-5 pr-5 pt-4 pb-4`}>
            {dictLogoToImg[logo]()}
            <span className={titleStyle}>{title}</span>
        </Link>
    )
}

NavButton.propTypes = NAV_SHAPE_TYPES.isRequired;

export default NavButton;