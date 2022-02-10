import order from './order';

import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    RESET_ORDER_REQUEST
} from '../action-constants/order';

import { initialOrderState } from './order';

describe('order reducer', () => {
    it('should return the initial state', () => {
        expect(order(undefined, { type: '' })).toEqual(initialOrderState)
    })
    it('should handle SEND_ORDER_REQUEST', () => {
        const state = {
            ...initialOrderState,
            orderRequest: true
        }
        expect(order(undefined, { type: SEND_ORDER_REQUEST })).toEqual(state)
    })
    it('should handle SEND_ORDER_SUCCESS', () => {
        const data = {
            success: true,
            name: '',
            order: {
                number: 0
            }
        }

        const state = {
            ...initialOrderState,
            orderRequest: false,
            orderData: data,
            orderFailed: false,
        }
        expect(order(undefined, { type: SEND_ORDER_SUCCESS, data })).toEqual(state)
    })
    it('should handle SEND_ORDER_FAILED', () => {
        const state = {
            ...initialOrderState,
            orderData: {},
            orderRequest: false,
            orderFailed: true
        }
        expect(order(undefined, { type: SEND_ORDER_FAILED })).toEqual(state)
    })
    it('should handle RESET_ORDER_REQUEST', () => {
        expect(order(undefined, { type: RESET_ORDER_REQUEST })).toEqual(initialOrderState)
    })
})