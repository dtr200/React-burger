import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/actions/thunks';
import { SET_EMAIL, SET_PASSWORD } from '../services/actions/action-types';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './page.module.css';

const LoginPage = () => {

    const dispatch = useDispatch();
    const { email, password } = useSelector(store => store.access);

    const login = () => {
        const userData = { email, password };
        dispatch(loginUser('/auth/login', userData));
    }

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
        <main className={styles.main}>
            <section className={`${styles.container} text`}>
                <h1 className={`${styles.title} text_type_main-medium`}>Вход</h1>
                <div className={styles.inputLarge}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        name={'email'}            
                        size={'default'}
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
                        onChange={setValue}
                        />
                </div>
                <div className='mt-6 mb-20'>
                    <Button 
                        type="primary" 
                        size="medium"
                        onClick={login}>
                        Войти
                    </Button>
                </div>
                <section className={styles.questions}>
                    <p className={`${styles.question} text_type_main-default mb-4`}>
                        <span>Вы — новый пользователь? </span> 
                        <Link to='/register'>Зарегистрироваться</Link>
                    </p>
                    <p className={`${styles.question} text_type_main-default`}>
                        <span>Забыли пароль? </span>
                        <Link to='/forgot-password'>Восстановить пароль</Link>
                    </p>   
                </section>
            </section>        
        </main>
    );
}

export default LoginPage;