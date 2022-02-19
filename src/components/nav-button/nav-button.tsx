import React, { FunctionComponent, ReactElement } from "react";
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from "../../services/types/hooks";
import { BurgerIcon, ListIcon, ProfileIcon } from 
'@ya.praktikum/react-developer-burger-ui-components';

import styles from './nav-button.module.css';

type TNavButtonProps = {
    title: string;
    logo: string;
};

type TDictTitleToLink = {
    [name: string]: string;
};

type TDictLogoToImg = {
    [name: string]: () => ReactElement;
}

type TType = 'secondary' | 'primary' | 'error' | 'success';

const NavButton: FunctionComponent<TNavButtonProps> = ({ title, logo }) => {
    const dictLogoToImg: TDictLogoToImg = {
        burger: () => <BurgerIcon type={getType(title)} />,
        list: () => <ListIcon type={getType(title)} />,
        profile: () => <ProfileIcon type={getType(title)} />
    }

    const location = useLocation();

    const { currentIngredient: {_id} } = 
        useSelector(store => store.ingredients);

    const dictTitleToLink: TDictTitleToLink = {
        'Конструктор': location.pathname === '/' ? '/' : '/React-burger/',
        'Лента заказов': '/feed',
        'Личный кабинет': '/profile'
    }

    const getType: (title: string) => TType = (title) =>
        title === 'Конструктор' && location.pathname === '/' || 
        title === 'Конструктор' && location.pathname === `/ingredients/${_id}` ||
        title === 'Конструктор' && location.pathname === `/order` ||
        title === 'Лента заказов' && location.pathname === '/feed' ||
        title === 'Личный кабинет' && location.pathname === '/profile' ||
        title === 'Личный кабинет' && location.pathname === `/profile/orders` ?
        'primary' : 'secondary';

    const titleStyle: string = `text text_type_main-default pl-2`;
    const isExact: boolean = 
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

export default NavButton;