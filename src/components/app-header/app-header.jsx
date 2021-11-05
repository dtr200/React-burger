import React, { Component } from 'react';
import Nav from '../nav/nav';
import Auth from '../auth/auth';
import { Logo } from 
'@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

class AppHeader extends Component {
    
    navButtonsData = [
        { title: 'Конструктор', logo: 'burger', type: 'primary', status: 'active' },
        { title: 'Лента заказов', logo: 'list', type: 'secondary', status: 'notActive' }
    ]
    authButtonData = 
        { title: 'Личный кабинет', logo: 'profile', type: 'secondary', status: 'notActive' };

    render(){
        return (
            <header className={`${styles.appHeader} pt-4 pb-4`}>
                <div className={styles.appHeaderContainer}>
                    <Nav items={this.navButtonsData} />
                    <Logo />
                    <Auth {...this.authButtonData} />
                </div>
            </header>
        )
    }
}

export default AppHeader;