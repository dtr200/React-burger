import React from "react";
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { BurgerIcon, ListIcon, ProfileIcon } from 
'@ya.praktikum/react-developer-burger-ui-components';
import {
    NAV_SHAPE_TYPES
} from '../../utils/types';

import styles from './nav-button.module.css';

const NavButton = ({ title, logo }) => {
    const dictLogoToImg = {
        burger: () => <BurgerIcon type={getType(title)} />,
        list: () => <ListIcon type={getType(title)} />,
        profile: () => <ProfileIcon type={getType(title)} />
    }

    const location = useLocation();

    const { currentIngredient: {_id} } = 
        useSelector(store => store.ingredients);

    const dictTitleToLink = {
        'Конструктор': '/',
        'Лента заказов': '/feed',
        'Личный кабинет': '/profile'
    }

    const getType = (title) =>
        title === 'Конструктор' && location.pathname === '/' || 
        title === 'Конструктор' && location.pathname === `/ingredients/${_id}` ||
        title === 'Конструктор' && location.pathname === `/order` ||
        title === 'Лента заказов' && location.pathname === '/feed' ||
        title === 'Личный кабинет' && location.pathname === '/profile' ||
        title === 'Личный кабинет' && location.pathname === `/profile/orders` ?
        'primary' : 'secondary';

    const titleStyle = `text text_type_main-default pl-2`;
    const isExact = 
        location.pathname === '/' || 
        location.pathname === `/ingredients/${_id}` ||
        location.pathname === `/order`;

    return (
        <NavLink 
            to={{ pathname: dictTitleToLink[title] }} 
            className={`${styles.navButton} pl-5 pr-5 pt-4 pb-4 text_color_inactive`}
            activeClassName={styles.active}
            exact={!isExact}
            >
            {dictLogoToImg[logo]()}
            <span className={titleStyle}>{title}</span>
        </NavLink>
    )
}

NavButton.propTypes = NAV_SHAPE_TYPES.isRequired;

export default NavButton;