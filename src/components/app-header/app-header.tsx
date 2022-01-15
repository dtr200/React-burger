import React from 'react';
import Nav from '../nav/nav';
import Auth from '../auth/auth';
import { Link } from 'react-router-dom';
import { Logo } from 
'@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';


const AppHeader = () => {
    
    const navButtonsData = [
        { title: 'Конструктор', logo: 'burger' },
        { title: 'Лента заказов', logo: 'list' }
    ]
    const authButtonData = 
        { title: 'Личный кабинет', logo: 'profile' };

    return (
        <header className={`${styles.appHeader} pt-4 pb-4`}>
            <div className={styles.appHeaderContainer}>
                <Nav items={navButtonsData} />
                <div className={styles.logo}>
                    <Link to={'/'}>
                        <Logo/>
                    </Link>
                </div>
                <Auth {...authButtonData} />
            </div>
        </header>
    )
}

export default AppHeader;