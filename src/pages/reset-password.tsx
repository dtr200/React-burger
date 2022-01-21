import React, { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getNewPassword } from '../services/actions/thunks';
import { SET_NEW_PASSWORD, SET_RESTORE_CODE } from '../services/actions/action-types';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { TDict } from '../utils/types';

import styles from './page.module.css';
import Spinner from '../components/spinner/spinner';

const ResetPasswordPage: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { 
        user: {newPassword}, 
        restoreCode,
        newPasswordRequest, 
        changePasswordMessage 
    } = useSelector((store: any) => store.access);
    const isAccessTokenExist: boolean = 
        document.cookie.indexOf('accessToken=') !== -1;

    const restorePassword: () => void = () => 
        dispatch(getNewPassword('/password-reset/reset', newPassword, restoreCode));

    const setValue = (e: SyntheticEvent) => {
        const dictNameToType: TDict<string> = {
            password: SET_NEW_PASSWORD,
            code: SET_RESTORE_CODE
        }

        dispatch({
            type: dictNameToType[(e.target as HTMLInputElement).name],
            payload: (e.target as HTMLInputElement).value
        })
    }

    return (
        newPasswordRequest ? (
        <Spinner />
        ) : ( isAccessTokenExist || !changePasswordMessage ) ? (
        <Redirect to={'/'} />
        ) : (
        <form className={styles.main} onSubmit={restorePassword}>
            <section className={`${styles.container} text`}>
                <h1 className={`${styles.title} text_type_main-medium`}>
                    Восстановление пароля
                </h1>
                <div className={styles.inputLarge}>
                    <Input
                        type={'password'}
                        placeholder={'Введите новый пароль'}
                        onChange={(e) => setValue(e)}
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
                        onChange={(e) => setValue(e)}
                        value={restoreCode}
                        name={'code'}         
                        size={'default'}
                        />
                </div>
                <div className='mt-6 mb-20'>
                    <Button type="primary" size="medium">
                        Сохранить
                    </Button>
                </div>
                <section className={styles.questions}>
                    <p className={`${styles.question} text_type_main-default`}>
                        <span>Вспомнили пароль? </span>
                        <Link 
                            to='/login'
                            className={styles.link}>
                            Войти
                        </Link>
                    </p>   
                </section>
            </section>        
        </form>
        )
  );
}

export default ResetPasswordPage;