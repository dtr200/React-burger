import React, { FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Switch, Route, useRouteMatch } from 'react-router-dom';
import ProfileInputsPage from './profile-inputs';
import OrderHistoryPage from './order-history';
import { logoutUser } from '../services/thunks/access';
import Spinner from '../components/spinner/spinner';

import styles from './profile.module.css';

const ProfilePage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { path, url } = useRouteMatch();
    const { logoutRequest } = useSelector((store: any) => store.access);

    const onLogout: () => void = () =>
        dispatch(logoutUser());

    return (
        logoutRequest ? (
        <Spinner /> 
        ) : (
        <main className={styles.profile}>
            <section className={styles.navBar}>
                <nav className="mb-20">
                    <ul className={`${styles.profileList} text text_type_main-medium text_color_inactive`}>
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
                                to="/login" exact 
                                className={styles.profileLink}
                                activeClassName={styles.activeNavItem}
                                onClick={onLogout}>
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
        )
  );
}

export default ProfilePage;