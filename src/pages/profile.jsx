import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import ProfileInputsPage from './profile-inputs';
import OrderHistoryPage from './order-history';
import { getNewPassword } from '../services/actions/thunks';
import { SET_NEW_PASSWORD, SET_RESTORE_CODE } from '../services/actions/action-types';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';

const ProfilePage = () => {
    /* const dispatch = useDispatch();
    const { newPassword, restoreCode } = useSelector(store => store.access);

    const restorePassword = () => 
        dispatch(getNewPassword('/password-reset/reset', newPassword, restoreCode));

    const setValue = (e) => {
        const dictNameToType = {
            password: SET_NEW_PASSWORD,
            code: SET_RESTORE_CODE
        }

        dispatch({
            type: dictNameToType[e.target.name],
            payload: e.target.value
        })
    } */

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
                <Route path={`${path}/orders/:id`} exact>
                    <OrderHistoryPage />
                </Route>
            </Switch>
        </main>
  );
}

export default ProfilePage;