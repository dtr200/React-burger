import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './page.module.css';

const ForgotPasswordPage = () => {
  return (
    <main className={styles.main}>
        <section className={`${styles.container} text`}>
            <h1 className={`${styles.title} text_type_main-medium`}>Восстановление пароля</h1>
            <div className={styles.inputLarge}>
                <Input
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    name={'E-mail'}            
                    size={'default'}
                    />
            </div>
            <div className='mt-6 mb-20'>
                <Button type="primary" size="medium">Восстановить</Button>
            </div>
            <section className={styles.questions}>
                <p className={`${styles.question} text_type_main-default`}>
                    <span>Вспомнили пароль? </span>
                    <Link to='/login'>Войти</Link>
                </p>   
            </section>
        </section>        
    </main>
  );
}

export default ForgotPasswordPage;