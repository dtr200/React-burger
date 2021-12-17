import React from 'react';

import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css';

const LoginPage = () => {
  return (
    <main className={`${styles.main}`}>
        <h1 className=''>Вход</h1>
        <Input
            type={'text'}
            placeholder={'E-mail'}
            name={'E-mail'}            
            size={'default'}
            />
    </main>
  );
}

export default LoginPage;