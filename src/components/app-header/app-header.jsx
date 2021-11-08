import React from 'react';
import Nav from '../nav/nav';
import Auth from '../auth/auth';
import { Logo } from 
'@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
    
    const navButtonsData = [
        { title: 'Конструктор', logo: 'burger', type: 'primary', view: true },
        { title: 'Лента заказов', logo: 'list', type: 'secondary', view: false }
    ]
    const authButtonData = 
        { title: 'Личный кабинет', logo: 'profile', type: 'secondary', view: false };

    return (
        <header className={`${styles.appHeader} pt-4 pb-4`}>
            <div className={styles.appHeaderContainer}>
                <Nav items={navButtonsData} />
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <Auth {...authButtonData} />
            </div>
        </header>
    )
}

export default AppHeader;