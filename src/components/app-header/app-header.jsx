import React, { Component } from 'react';
import Nav from '../nav/nav';
import Auth from '../auth/auth';
import { Logo } from 
'@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

class AppHeader extends Component {
    
    navButtonsData = [
        { title: 'Конструктор', logo: 'burger', type: 'primary', view: true },
        { title: 'Лента заказов', logo: 'list', type: 'secondary', view: false }
    ]
    authButtonData = 
        { title: 'Личный кабинет', logo: 'profile', type: 'secondary', view: false };

    render(){
        return (
            <header className={`${styles.appHeader} pt-4 pb-4`}>
                <div className={styles.appHeaderContainer}>
                    <Nav items={this.navButtonsData} />
                    <div className={styles.logo}>
                        <Logo/>
                    </div>
                    <Auth {...this.authButtonData} />
                </div>
            </header>
        )
    }
}

export default AppHeader;