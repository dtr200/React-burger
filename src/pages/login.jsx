import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './login.module.css';

const LoginPage = () => {
  return (
    <main className={styles.main}>
        <section className={`${styles.container} text`}>
            <h1 className={`${styles.title} text_type_main-medium`}>Вход</h1>
            <div className={styles.inputLarge}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    name={'E-mail'}            
                    size={'default'}
                    />
            </div>
            <div className={styles.inputLarge}>
                <Input
                    type={'password'}
                    placeholder={'Пароль'}
                    name={'password'}    
                    icon={'ShowIcon'}        
                    size={'default'}
                    />
            </div>
            <div className='mt-6 mb-20'>
                <Button type="primary" size="medium">Войти</Button>
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