import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { loginUser } from '../services/actions/thunks';
import { SET_EMAIL, SET_PASSWORD } from '../services/actions/action-types';
import Spinner from '../components/spinner/spinner';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './page.module.css';

const LoginPage = () => {
    
    const dispatch = useDispatch();
    const { 
        user:{email, password}, 
        loginRequest, 
        logoutRequest 
    } = useSelector(store => store.access);

    const isAccessTokenExist = 
        document.cookie.indexOf('accessToken=') !== -1;
 
    const login = () => {
        const userData = { email, password };
        dispatch(loginUser(userData));
    }
    const history = useHistory();
    const { state } = history.location;
    const setValue = (e) => {
        const dictNameToType = {
            email: SET_EMAIL, 
            password: SET_PASSWORD
        };

        dispatch({
            type: dictNameToType[e.target.name],
            payload: e.target.value
        });
    }

    return (
        loginRequest || logoutRequest ? (
        <Spinner /> 
        ) : ( isAccessTokenExist ) ? (
        <Redirect to={state?.from || '/'} />
        ) : (
        <form className={styles.main} onSubmit={login}>
            <section className={`${styles.container} text`}>
                <h1 className={`${styles.title} text_type_main-medium`}>Вход</h1>
                <div className={styles.inputLarge}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        name={'email'}            
                        size={'default'}
                        value={email}
                        onChange={setValue}
                        />
                </div>
                <div className={styles.inputLarge}>
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        name={'password'}    
                        icon={'ShowIcon'}        
                        size={'default'}
                        value={password}
                        onChange={setValue}
                        />
                </div>
                <div className='mt-6 mb-20'>
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                </div>
                <section className={styles.questions}>
                    <p className={`${styles.question} text_type_main-default mb-4`}>
                        <span>Вы — новый пользователь? </span> 
                        <Link 
                            to='/register'
                            className={styles.link}>
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className={`${styles.question} text_type_main-default`}>
                        <span>Забыли пароль? </span>
                        <Link 
                            to='/forgot-password' 
                            className={styles.link}>
                            Восстановить пароль
                        </Link>
                    </p>   
                </section>
            </section>        
        </form>
        )
    );
}

export default LoginPage;