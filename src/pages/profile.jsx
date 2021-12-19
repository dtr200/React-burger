import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNewPassword } from '../services/actions/thunks';
import { SET_NEW_PASSWORD, SET_RESTORE_CODE } from '../services/actions/action-types';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';

const ProfilePage = () => {

    const dispatch = useDispatch();
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
    }

    return (
        <main className={styles.profile}>
            <section className={styles.navBar}>
                <nav className="mb-20">
                    <ul className={`${styles.profileList} text text_type_main-medium`}>
                        <li className={`${styles.profileListItem}`}>
                            <Link to="/profile">
                                Профиль
                            </Link>
                        </li>
                        <li className={`${styles.profileListItem} text_color_inactive`}>
                            <Link to="/profile/orders">
                                История заказов
                            </Link>
                        </li>
                        <li className={`${styles.profileListItem} text_color_inactive`}>
                            <Link to="/profile">
                                Выход
                            </Link>
                        </li>
                    </ul>
                </nav>                
                <p className={`${styles.textExtra} text_type_main-default`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>   
            </section>
            <section className={`${styles.container} text`}>
                <div className={styles.inputLarge}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        icon={'EditIcon'}            
                        size={'default'}
                        />
                </div>
                <div className={styles.inputLarge}>
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        name={'login'}
                        icon={'EditIcon'}            
                        size={'default'}
                        />
                </div>
                <div className={styles.inputLarge}>
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        name={'password'}    
                        icon={'EditIcon'}        
                        size={'default'}
                        />
                </div>
                <section className={styles.buttons}>
                    <Button 
                        type="secondary" 
                        size="medium">
                        Отмена
                    </Button>
                    <Button 
                        type="primary" 
                        size="medium">
                        Сохранить
                    </Button>
                </section>
            </section>                                
        </main>
  );
}

export default ProfilePage;