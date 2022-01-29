import { 
    SET_EMAIL,
    SET_NAME, 
    SET_PASSWORD, 
    SET_LOGIN,
    SET_RESTORE_CODE
} from '../services/action-constants/access';
import { TDict } from '../utils/types';

type TDispatchData = {
    type: string;
    payload: string;
};

const dictNameToType: TDict<string> = {
    name: SET_NAME, 
    email: SET_EMAIL, 
    password: SET_PASSWORD,
    login: SET_LOGIN,
    code: SET_RESTORE_CODE
};

export const dispatchData: (key: string, value: string) => TDispatchData = 
    (key, value) => {
    return {
        type: dictNameToType[key],
        payload: value
    };
};