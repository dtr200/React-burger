import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_NAME, SET_PASSWORD, SET_LOGIN, CANCEL_UPDATE_USER_DATA } 
    from '../services/actions/action-types';
import { getUserData } from '../services/actions/thunks';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';
import Spinner from '../components/spinner/spinner';

const ProfileInputsPage = () => {

    const dispatch = useDispatch();
    const { name, login, email, password } = 
        useSelector(store => store.access.user);
    
    const setValue = (e) => {
        const dictNameToType = {
            name: SET_NAME, 
            login: SET_LOGIN,
            password: SET_PASSWORD
        };

        dispatch({
            type: dictNameToType[e.target.name],
            payload: e.target.value
        })
    }

    const onFormClick = async (e) => {
        e.preventDefault();
        const clickName = e.nativeEvent.submitter.name;
        const userData = { name, email };
        const dictNameToType = {
            save: getUserData('PATCH', userData), 
            cancel: getUserData('GET')
        };

        dispatch(dictNameToType[clickName]);
        clickName === 'cancel' && 
        dispatch({ type: CANCEL_UPDATE_USER_DATA });
    }

    return (
            <form className={`${styles.container} text`} onSubmit={onFormClick}>
                <div className={styles.inputLarge}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        name={'name'}
                        icon={'EditIcon'}            
                        size={'default'}
                        value={name}
                        onChange={setValue}
                        />
                </div>
                <div className={styles.inputLarge}>
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        name={'login'}
                        icon={'EditIcon'}            
                        size={'default'}
                        value={login}
                        onChange={setValue}
                        />
                </div>
                <div className={styles.inputLarge}>
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        name={'password'}    
                        icon={'EditIcon'}        
                        size={'default'}
                        value={password}
                        onChange={setValue}
                        />
                </div>
                <section className={styles.buttons}>
                    <Button 
                        type="secondary" 
                        size="medium"
                        name="cancel">
                        Отмена
                    </Button>
                    <Button 
                        type="primary" 
                        size="medium"
                        name="save">
                        Сохранить
                    </Button>
                </section>
            </form>
  );
}

export default ProfileInputsPage;