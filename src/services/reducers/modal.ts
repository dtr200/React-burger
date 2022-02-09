import {
    SET_MODAL_DATA,
    SET_MODAL_ERROR,
    CLOSE_MODAL
} from '../action-constants/modal';

import { TModalAction } from '../actions/modal';
import { TOrderResponseData } from '../../utils/types';

type TModalState = {
    modalMode: string | null, 
    modalTitle: string | null,
    modalData: TOrderResponseData | null,
    hasModalError: boolean;
    modalVisible: boolean;
}

export const initialModalState = {
    modalMode: null, 
    modalTitle: null,
    modalData: null,
    hasModalError: false,
    modalVisible: false
}

export default (state = initialModalState, action: TModalAction): TModalState => {
    switch(action.type){
        case SET_MODAL_DATA: {
            return {
                ...state,
                modalMode: action.mode,
                modalTitle: action.title,
                modalData: action.data,
                modalVisible: true,
                hasModalError: false
            }
        }
        case SET_MODAL_ERROR: {
            return {
                ...state,
                hasModalError: true
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                modalVisible: false
            }
        }
        default:
            return state;
    }
}