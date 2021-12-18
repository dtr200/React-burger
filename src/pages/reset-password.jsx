import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNewPassword } from '../services/actions/thunks';
import { RESTORE_PASSWORD_URL } from '../utils/constants';
import { SET_NEW_PASSWORD, SET_TOKEN } from '../services/actions/action-types';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './page.module.css';

const ResetPasswordPage = () => {

    const dispatch = useDispatch();
    const { newPassword, token } = useSelector(store => store.access);

    const restorePassword = () => {
        const endpoint = `${RESTORE_PASSWORD_URL}/reset`;
        dispatch(getNewPassword(endpoint, newPassword));
    }

    const setNewPassword = (e) => {
        dispatch({
            type: SET_NEW_PASSWORD,
            email: e.target.value
        });
    }

    const setToken = (e) => {
        dispatch({
            type: SET_TOKEN,
            email: e.target.value
        });
    }

    return (
        <main className={styles.main}>
            <section className={`${styles.container} text`}>
                <h1 className={`${styles.title} text_type_main-medium`}>
                    Восстановление пароля
                </h1>
                <div className={styles.inputLarge}>
                    <Input
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={(e) => setNewPassword(e)}
                        value={newPassword}
                        name={'password'}    
                        icon={'ShowIcon'}            
                        size={'default'}
                        />
                </div>
                <div className={styles.inputLarge}>
                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={(e) => setToken(e)}
                        value={token}
                        name={'code'}         
                        size={'default'}
                        />
                </div>
                <div className='mt-6 mb-20'>
                    <Button 
                        type="primary" 
                        size="medium"
                        onClick={restorePassword}>
                        Сохранить
                    </Button>
                </div>
                <section className={styles.questions}>
                    <p className={`${styles.question} text_type_main-default`}>
                        <span>Вспомнили пароль? </span>
                        <Link to='/login'>Войти</Link>
                    </p>   
                </section>
            </section>        
        </main>
  );
}

export default ResetPasswordPage;