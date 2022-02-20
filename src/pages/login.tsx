import React, { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from '../services/types/hooks';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { loginUser } from '../services/thunks/access';
import Spinner from '../components/spinner/spinner';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { dispatchData } from '../services/action-creators';

import styles from './page.module.css';

type TLocation = {
    hash?: string;
    key?: string;
    pathname?: string;
    search?: string;
    state?: TState;
}

type TState = {
    from?: TLocation;
}

const LoginPage: FunctionComponent = () => {    
    const dispatch = useDispatch();
    const { 
        user:{email, password}, 
        loginRequest, 
        logoutRequest 
    } = useSelector((store: any) => store.access);

    const isAccessTokenExist: boolean = 
        document.cookie.indexOf('accessToken=') !== -1;
 
    const login: () => void = () => {
        const userData = { email, password };
        dispatch(loginUser(userData));
    }
    const history = useHistory();
    const { state }: any  = history.location;
    const setValue = (e: SyntheticEvent) => {
        dispatch(dispatchData(
            (e.target as HTMLInputElement).name,
            (e.target as HTMLInputElement).value
        ));
    }

    return (
        loginRequest || logoutRequest ? (
        <Spinner /> 
        ) : ( isAccessTokenExist ) ? (
        <Redirect to={state?.from  || '/'} />
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
                    <Button 
                        type="primary" 
                        size="medium"
                        data-cy="login-button">
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