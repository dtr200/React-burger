import React, { FunctionComponent, SyntheticEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from '../services/types/hooks';
import { CANCEL_UPDATE_USER_DATA } 
    from '../services/action-constants/access';
import { getUserData } from '../services/thunks/access';
import { Input, Button } from 
    '@ya.praktikum/react-developer-burger-ui-components';
import { dispatchData } from '../services/action-creators';

import styles from './profile.module.css';

interface SubmitEvent extends Event {
    readonly submitter: HTMLElement;
}

const ProfileInputsPage: FunctionComponent = () => {
    const dispatch = useDispatch();
    const { name, login, email, password } = 
        useSelector((store: any) => store.access.user);
    
    const setValue = (e: SyntheticEvent) => {
        dispatch(dispatchData(
            (e.target as HTMLInputElement).name,
            (e.target as HTMLInputElement).value
        ));
    }

    const onFormClick = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const clickName = (e.nativeEvent as SubmitEvent).submitter.innerText;
        const userData = { name, email };
        clickName === 'Сохранить' ? 
            dispatch(getUserData('PATCH', userData)) : 
            dispatch(getUserData('GET'));
            
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