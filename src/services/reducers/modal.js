import {
    SET_MODAL_DATA,
    SET_MODAL_ERROR,
    CLOSE_MODAL
} from '../action-constants/modal';

const initialModalState = {
    modalType: null,
    modalMode: null, 
    modalTitle: null,
    modalData: {},
    hasModalError: false,
    modalVisible: false
}

export default (state = initialModalState, action) => {
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