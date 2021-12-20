import React from 'react';
import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom';
import ProfileInputsPage from './profile-inputs';
import OrderHistoryPage from './order-history';

import styles from './profile.module.css';

const ProfilePage = () => {

    const { path, url } = useRouteMatch();

    return (
        <main className={styles.profile}>
            <section className={styles.navBar}>
                <nav className="mb-20">
                    <ul className={`${styles.profileList} text text_type_main-medium`}>
                        <li className={`${styles.profileListItem}`}>
                            <NavLink 
                                to={{pathname: '/profile'}} exact
                                className={styles.profileLink}
                                activeClassName={styles.activeNavItem}>
                                Профиль
                            </NavLink>
                        </li>
                        <li className={`${styles.profileListItem}`}>
                            <NavLink 
                                to={{pathname: `${url}/orders`}} exact
                                className={styles.profileLink}
                                activeClassName={styles.activeNavItem}>
                                История заказов
                            </NavLink>
                        </li>
                        <li className={`${styles.profileListItem}`}>
                            <NavLink 
                                to="/" exact 
                                className={styles.profileLink}
                                activeClassName={styles.activeNavItem}>
                                Выход
                            </NavLink>
                        </li>
                    </ul>
                </nav>                
                <p className={`${styles.textExtra} text_type_main-default`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>   
            </section>
            <Switch>
                <Route path={path} exact>
                    <ProfileInputsPage />
                </Route>
                <Route path={`${path}/orders`} exact>
                    <OrderHistoryPage />
                </Route>
            </Switch>
        </main>
  );
}

export default ProfilePage;