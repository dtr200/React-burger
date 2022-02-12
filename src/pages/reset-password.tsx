import React, { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from '../services/types/hooks';
import { Link, Redirect } from 'react-router-dom';
import { getNewPassword } from '../services/thunks/access';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { dispatchData } from '../services/action-creators';

import styles from './page.module.css';
import Spinner from '../components/spinner/spinner';

const ResetPasswordPage: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { 
        user: {newPassword}, 
        restoreCode,
        newPasswordRequest        
    } = useSelector((store: any) => store.access);
    const isAccessTokenExist: boolean = 
        document.cookie.indexOf('accessToken=') !== -1;
    const restorePassword: () => void = () => {
        dispatch(getNewPassword('/password-reset/reset', newPassword, restoreCode))
    };

    const setValue = (e: SyntheticEvent) => {
        dispatch(dispatchData(
            (e.target as HTMLInputElement).name,
            (e.target as HTMLInputElement).value
        ));
    }

    return (
        newPasswordRequest ? (
        <Spinner />
        ) : ( isAccessTokenExist || newPassword === 'changed' ) ? (
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
                        name={'newPassword'}    
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