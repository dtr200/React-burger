import ingredients from './ingredients';

import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CURRENT_INGREDIENT,
    ADD_INGREDIENT,
    ADD_BUN,
    DELETE_INGREDIENT,
    RESET_CURRENT_INGREDIENT,
    MOVE_INGREDIENT,
    CLEAR_CONSTRUCTOR_INGREDIENTS,
    SET_INGREDIENTS_TAB
} from '../action-constants/ingredients';

import { initialIngredientsState } from './ingredients';
import { TABS } from '../../utils/constants';
    
describe('ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredients(undefined, { type: '' })).toEqual(initialIngredientsState)
    })
    it('should handle GET_INGREDIENTS_REQUEST', () => {
        const state = {
            ...initialIngredientsState,
            ingredientsRequest: true
        }
        expect(ingredients(undefined, { type: GET_INGREDIENTS_REQUEST })).toEqual(state)
    })
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        const state = {
            ...initialIngredientsState,
            ingredientsData: [],
            ingredientsRequest: false
        }
        expect(ingredients(undefined, { type: GET_INGREDIENTS_SUCCESS, ingredients: [] })).toEqual(state)
    })
    it('should handle GET_INGREDIENTS_FAILED', () => {
        const state = {
            ...initialIngredientsState,
            ingredientsData: [],
            ingredientsFailed: true,
            ingredientsRequest: false
        }
        expect(ingredients(undefined, { type: GET_INGREDIENTS_FAILED })).toEqual(state)
    })
    it('should handle SET_CURRENT_INGREDIENT', () => {
        const ingredient = {
            _id: '',
            calories: 0,
            fat: 0,
            carbohydrates: 0,
            image: '',
            image_large: '',
            image_mobile: '',
            name: '',
            price: 0,
            proteins: 0,
            type: '',
            __v: 0
        }
        const state = {
            ...initialIngredientsState,
            currentIngredient: ingredient
        }
        expect(ingredients(undefined, { type: SET_CURRENT_INGREDIENT, data: ingredient })).toEqual(state)
    })
    it('should handle ADD_INGREDIENT', () => {
        const state = {
            ...initialIngredientsState,
            constructorIngredients: [undefined]
        }
        expect(ingredients(undefined, { type: ADD_INGREDIENT, id: '' })).toEqual(state)
    })
    it('should handle ADD_BUN', () => {
        const state = {
            ...initialIngredientsState,
            constructorIngredients: [undefined]
        }
        expect(ingredients(undefined, { type: ADD_BUN, id: '' })).toEqual(state)
    })
    it('should handle DELETE_INGREDIENT', () => {
        const state = {
            ...initialIngredientsState,
            constructorIngredients: []
        }
        expect(ingredients(undefined, { type: DELETE_INGREDIENT, id: '' })).toEqual(state)
    })
    it('should handle RESET_CURRENT_INGREDIENT', () => {
        const state = {
            ...initialIngredientsState,
            currentIngredient: {}
        }
        expect(ingredients(undefined, { type: RESET_CURRENT_INGREDIENT })).toEqual(state)
    })
    it('should handle MOVE_INGREDIENT', () => {
        const state = {
            ...initialIngredientsState,
            constructorIngredients: [undefined]
        }
        expect(ingredients(undefined, { type: MOVE_INGREDIENT, drag: 0, hover: 0 })).toEqual(state)
    })
    it('should handle CLEAR_CONSTRUCTOR_INGREDIENTS', () => {
        const state = {
            ...initialIngredientsState,
            constructorIngredients: []
        }
        expect(ingredients(undefined, { type: CLEAR_CONSTRUCTOR_INGREDIENTS })).toEqual(state)
    })
    it('should handle SET_INGREDIENTS_TAB', () => {
        const state = {
            ...initialIngredientsState,
            tabs: TABS
        }
        expect(ingredients(undefined, { type: SET_INGREDIENTS_TAB, id: 'bun', ratio: 0 })).toEqual(state)
    })
})