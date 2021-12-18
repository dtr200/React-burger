import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './page.module.css';

const RegisterPage = () => {
  return (
    <main className={styles.main}>
        <section className={`${styles.container} text`}>
            <h1 className={`${styles.title} text_type_main-medium`}>Регистрация</h1>
            <div className={styles.inputLarge}>
                <Input
                    type={'email'}
                    placeholder={'Имя'}
                    name={'name'}            
                    size={'default'}
                    />
            </div>
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
                <Button type="primary" size="medium">Зарегистрироваться</Button>
            </div>
            <section className={styles.questions}>
                <p className={`${styles.question} text_type_main-default`}>
                    <span>Уже зарегистрированы? </span>
                    <Link to='/login'>Войти</Link>
                </p>   
            </section>
        </section>        
    </main>
  );
}

export default RegisterPage;