import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { registerNewUser } from '../services/actions/thunks';
import { SET_NAME, SET_EMAIL, SET_PASSWORD } from '../services/actions/action-types';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '../components/spinner/spinner';

import styles from './page.module.css';

const RegisterPage = () => {

    const dispatch = useDispatch();
    const { user: {name, email, password}, registerRequest } = 
        useSelector(store => store.access);
    const history = useHistory();
    const { state } = history.location;

    const isAccessTokenExist = 
        document.cookie.indexOf('accessToken=') !== -1;

    const registerUser = () => {
        const userData = { name, email, password };
        dispatch(registerNewUser(userData));
    }

    const setValue = (e) => {
        const dictNameToType = {
            name: SET_NAME, 
            email: SET_EMAIL, 
            password: SET_PASSWORD
        };

        dispatch({
            type: dictNameToType[e.target.name],
            payload: e.target.value
        });
    }

    return (
        registerRequest ? (
        <Spinner />
        ) : ( isAccessTokenExist ) ? (
        <Redirect to={state?.from || '/'} />
        ) : (
        <main className={styles.main}>
            <section className={`${styles.container} text`}>
                <h1 className={`${styles.title} text_type_main-medium`}>Регистрация</h1>
                <div className={styles.inputLarge}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}            
                        size={'default'}
                        value={name}
                        onChange={(e) => setValue(e)}
                        />
                </div>
                <div className={styles.inputLarge}>
                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        name={'email'}            
                        size={'default'}
                        value={email}
                        onChange={(e) => setValue(e)}
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
                        onChange={(e) => setValue(e)}
                        />
                </div>
                <div className='mt-6 mb-20'>
                    <Button 
                        type="primary" 
                        size="medium"
                        onClick={registerUser}>
                        Зарегистрироваться
                    </Button>
                </div>
                <section className={styles.questions}>
                    <p className={`${styles.question} text_type_main-default`}>
                        <span>Уже зарегистрированы? </span>
                        <Link to='/login'>Войти</Link>
                    </p>   
                </section>
            </section>        
        </main>
        )
    );
}

export default RegisterPage;