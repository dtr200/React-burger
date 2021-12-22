import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_NAME, SET_PASSWORD, SET_LOGIN, CANCEL_UPDATE_USER_DATA } 
    from '../services/actions/action-types';
import { restoreUserData, updateUserData } from '../services/actions/thunks';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';

import styles from './profile.module.css';

const ProfileInputsPage = () => {

    const dispatch = useDispatch();
    const { name, login, password } = 
        useSelector(store => store.access);

    const isAccessTokenExist = 
        document.cookie.indexOf('accessToken=') !== -1;

    const refreshToken = isAccessTokenExist ? 
        document.cookie.match(/(refreshToken=)(.+);/)[2] :
        document.cookie.match(/(refreshToken=)(.+)/)[2];       
    const accessToken = isAccessTokenExist ? 
        document.cookie.match(/(accessToken=)(.+)/)[2] : '';

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

    console.log("ACCESS", accessToken)
    console.log("REFRESH -", refreshToken);

    const onButtonClick = async (e) => {
        const url = '/auth/user';
        const dictNameToType = {
            save: updateUserData(url, accessToken), 
            cancel: restoreUserData(url, accessToken)
        };

        dispatch(dictNameToType[e.target.name]);
        e.target.name === 'cancel' && 
        dispatch({ type: CANCEL_UPDATE_USER_DATA });
    }

    return (        
            <section className={`${styles.container} text`}>
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
                        name="cancel"
                        onClick={onButtonClick}>
                        Отмена
                    </Button>
                    <Button 
                        type="primary" 
                        size="medium"
                        name="save"
                        onClick={onButtonClick}>
                        Сохранить
                    </Button>
                </section>
            </section>
  );
}

export default ProfileInputsPage;