import React from "react";
import { BurgerIcon, ListIcon, ProfileIcon } from 
'@ya.praktikum/react-developer-burger-ui-components';

import styles from './nav-button.module.css';

const NavButton = ({ title, logo, type, view }) => {
    const dict = {
        burger: () => <BurgerIcon type={type} />,
        list: () => <ListIcon type={type} />,
        profile: () => <ProfileIcon type={type} />
    }   

    const spanStyle = `text text_type_main-default pl-2
                       ${view ? styles.active : 'text_color_inactive'}`;
    
    return (
        <a href='#' className={`${styles.navButton} pl-5 pr-5 pt-4 pb-4`}>
            {dict[logo]()}
            <span className={spanStyle}>{title}</span>
        </a>
    )
}

export default NavButton;