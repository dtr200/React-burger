import React, { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from '../services/types/hooks';
import { Link, Redirect } from 'react-router-dom';
import { restorePassword } from '../services/thunks/access';
import { SET_RESTORE_EMAIL } from '../services/action-constants/access';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '../components/spinner/spinner';

import styles from './page.module.css';

const ForgotPasswordPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { 
        changePasswordRequest, 
        changePasswordEmail, 
        changePasswordMessage,
        changePasswordFailed
    } = useSelector((store: any) => store.access);
    console.log(changePasswordFailed)
    const isAccessTokenExist = 
        document.cookie.indexOf('accessToken=') !== -1;

    const reinstallPassword = (e: SyntheticEvent) => {
        e.preventDefault();
        if(changePasswordEmail.length)
            dispatch(restorePassword('/password-reset', changePasswordEmail));
    }

    const setValue = (e: SyntheticEvent) => {
        dispatch({
            type: SET_RESTORE_EMAIL,
            email: (e.target as HTMLInputElement).value
        });
    }

    return (
        changePasswordRequest ? (
        <Spinner />
        ) : ( isAccessTokenExist ) ? (
        <Redirect to={'/'} />
        ) : ( changePasswordMessage ) ? (
        <Redirect to={'/reset-password'} /> 
        ) : (
        <form className={styles.main} onSubmit={reinstallPassword}>
            <section className={`${styles.container} text`}>
                <h1 className={`${styles.title} text_type_main-medium`}>
                    Восстановление пароля
                </h1>
                <div className={styles.inputLarge}>
                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={(e) => setValue(e)}
                        value={changePasswordEmail}
                        name={'E-mail'}            
                        size={'default'}
                        />
                </div>
                <div className='mt-6 mb-20'>
                    <Button 
                        type="primary" 
                        size="medium">
                        Восстановить
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

export default ForgotPasswordPage;