import React, { FunctionComponent, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from '../services/types/hooks';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { registerNewUser } from '../services/thunks/access';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import Spinner from '../components/spinner/spinner';
import { dispatchData } from '../services/action-creators';

import styles from './page.module.css';

const RegisterPage: FunctionComponent = () => {

    const dispatch = useDispatch();
    const { user: {name, email, password}, registerRequest } = 
        useSelector((store: any) => store.access);
    const history = useHistory();
    const { state }: any = history.location;

    const isAccessTokenExist = 
        document.cookie.indexOf('accessToken=') !== -1;

    const registerUser = () => {
        const userData = { name, email, password };
        dispatch(registerNewUser(userData));
    }

    const setValue = (e: SyntheticEvent) => {
        dispatch(dispatchData(
            (e.target as HTMLInputElement).name,
            (e.target as HTMLInputElement).value
        ));
    }

    return (
        registerRequest ? (
        <Spinner />
        ) : ( isAccessTokenExist ) ? (
        <Redirect to={state?.from || '/'} />
        ) : (
        <form className={styles.main} onSubmit={registerUser}>
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
                    <Button type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                </div>
                <section className={styles.questions}>
                    <p className={`${styles.question} text_type_main-default`}>
                        <span>Уже зарегистрированы? </span>
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

export default RegisterPage;