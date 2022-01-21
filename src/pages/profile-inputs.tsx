import React, { FunctionComponent, SyntheticEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_NAME, SET_PASSWORD, SET_LOGIN, CANCEL_UPDATE_USER_DATA } 
    from '../services/actions/action-types';
import { getUserData } from '../services/actions/thunks';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { TDict } from '../utils/types';

import styles from './profile.module.css';
import Spinner from '../components/spinner/spinner';

type TDictFunction = () => Promise<void>;

interface SubmitEvent extends Event {
    readonly submitter: HTMLElement;
}

const ProfileInputsPage: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { name, login, email, password } = 
        useSelector((store: any) => store.access.user);
    
    const setValue = (e: SyntheticEvent) => {
        const dictNameToType: TDict<string> = {
            name: SET_NAME, 
            login: SET_LOGIN,
            password: SET_PASSWORD
        };

        dispatch({
            type: dictNameToType[(e.target as HTMLInputElement).name],
            payload: (e.target as HTMLInputElement).value
        })
    }

    const onFormClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const clickName = (e.nativeEvent as SubmitEvent).submitter.innerText;
        const userData = { name, email };
        const dictNameToType: TDict<TDictFunction> = {
            'Сохранить': getUserData('PATCH', userData), 
            'Отмена': getUserData('GET')
        };

        dispatch(dictNameToType[clickName]);
        clickName === 'Отмена' && 
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
                        size="medium">
                        Отмена
                    </Button>
                    <Button 
                        type="primary" 
                        size="medium">
                        Сохранить
                    </Button>
                </section>
            </form>
  );
}

export default ProfileInputsPage;