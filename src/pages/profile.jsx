import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import ProfileInputsPage from './profile-inputs';
import OrderHistoryPage from './order-history';
import { logoutUser } from '../services/actions/thunks';
import { CLEAR_LOGOUT_TRACK } from '../services/actions/action-types';
import Spinner from '../components/spinner/spinner';

import styles from './profile.module.css';

const ProfilePage = () => {

    const dispatch = useDispatch();
    const { path, url } = useRouteMatch();
    const { logoutRequest, logoutMessage } = useSelector(store => store.access);

    const onLogout = () => {
        dispatch(logoutUser());
        dispatch({ type: CLEAR_LOGOUT_TRACK })
    }

    return (
        logoutRequest ? (
        <Spinner /> 
        ) : ( logoutMessage ) ? (
        <Redirect to={'/'} />
        ) : (
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
                                to="/profile" exact 
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