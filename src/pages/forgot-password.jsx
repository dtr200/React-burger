import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { restorePassword } from '../services/actions/thunks';
import { SET_RESTORE_EMAIL } from '../services/actions/action-types';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './page.module.css';

const ForgotPasswordPage = () => {

    const dispatch = useDispatch();
    const { changePasswordEmail } = useSelector(store => store.access);

    const reinstallPassword = () => 
        dispatch(restorePassword('/password-reset', changePasswordEmail));

    const setValue = (e) => {
        dispatch({
            type: SET_RESTORE_EMAIL,
            email: e.target.value
        });
    }

    return (
        <main className={styles.main}>
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
                        size="medium"
                        onClick={reinstallPassword}>
                        Восстановить
                    </Button>
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