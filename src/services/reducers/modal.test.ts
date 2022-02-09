import modal from './modal';

import {
    SET_MODAL_DATA,
    SET_MODAL_ERROR,
    CLOSE_MODAL
} from '../action-constants/modal';

import { initialModalState } from './modal';

describe('modal reducer', () => {
    it('should return the initial state', () => {
        expect(modal(undefined, { type: '' })).toEqual(initialModalState)
    })
    it('should handle SET_MODAL_DATA', () => {
        const state = {
            ...initialModalState,
            modalMode: '',
            modalTitle: '',
            modalData: null,
            modalVisible: true,
            hasModalError: false
        }
        expect(modal(undefined, { 
            type: SET_MODAL_DATA, mode: '', title: '', data: null 
        })).toEqual(state)
    })
    it('should handle SET_MODAL_ERROR', () => {
        const state = {
            ...initialModalState,
            hasModalError: true
        }
        expect(modal(undefined, { type: SET_MODAL_ERROR })).toEqual(state)
    })
    it('should handle CLOSE_MODAL', () => {
        const state = {
            ...initialModalState,
            modalVisible: false
        }
        expect(modal(undefined, { type: CLOSE_MODAL })).toEqual(state)
    })
})