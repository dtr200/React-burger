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

import { TIngredientsAction } from '../actions/ingredients';
import { TProductItem, TTabs } from '../../utils/types';
import { TABS } from '../../utils/constants';

type TIngredientsState = {
    ingredientsRequest: boolean;
    ingredientsFailed: boolean;
    ingredientsData: TProductItem[];
    constructorIngredients: TProductItem[] | undefined[];
    currentIngredient: TProductItem | {};
    tabs: TTabs[];
}

export const initialIngredientsState = {
    ingredientsRequest: true,
    ingredientsFailed: false,
    ingredientsData: [],
    constructorIngredients: [],
    currentIngredient: {},
    tabs: TABS
}

export default (state = initialIngredientsState, action: TIngredientsAction): TIngredientsState => {
    switch(action.type){
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsData: action.ingredients,
                ingredientsRequest: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsData: [],
                ingredientsFailed: true,
                ingredientsRequest: false
            }
        }
        case SET_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: action.data
            }
        }
        case RESET_CURRENT_INGREDIENT: {
            return {
                ...state,
                currentIngredient: {}
            }
        }
        case ADD_BUN: {
            const currentItem = state.ingredientsData.find((item: TProductItem) => item._id === action.id);
            const itemIndex = state.constructorIngredients.findIndex((product: TProductItem) => 
                product.type === 'bun');

            const newConstructorIngredients = itemIndex === -1 ?
                [...state.constructorIngredients, currentItem] :
                (
                    [...state.constructorIngredients.slice(0, itemIndex),
                        currentItem,
                     ...state.constructorIngredients.slice(itemIndex + 1)]
                );
    
            return {
                ...state,
                constructorIngredients: newConstructorIngredients
            }
        }
        case ADD_INGREDIENT: {            
            const currentItem = state.ingredientsData.find((item: TProductItem) => item._id === action.id);
 
            return {
                ...state,
               constructorIngredients: [...state.constructorIngredients, currentItem ] 
            }
        }
        case DELETE_INGREDIENT: {
            const itemIndex = state.constructorIngredients.findIndex((product: TProductItem) => 
                product._id === action.id);
            
            const newConstructorIngredients = 
                [...state.constructorIngredients.slice(0, itemIndex),
                 ...state.constructorIngredients.slice(itemIndex + 1)]
            return {
                ...state,
                constructorIngredients: newConstructorIngredients
            }
        }
        case MOVE_INGREDIENT: {    
            const dragCard = state.constructorIngredients[action.drag];
            const hoverCard = state.constructorIngredients[action.hover];        
            const newConstructorIngredients = [...state.constructorIngredients];

            newConstructorIngredients[action.drag] = hoverCard;
            newConstructorIngredients[action.hover] = dragCard;
            
            return {
                ...state,
                constructorIngredients: newConstructorIngredients
            }
        }
        case SET_INGREDIENTS_TAB: {
            return {
                ...state,
                tabs: state.tabs.map(tab => 
                    tab.id === action.id ? {...tab, ratio: action.ratio} : tab)         
            }
        }
        case CLEAR_CONSTRUCTOR_INGREDIENTS: {
            return {
                ...state,
                constructorIngredients: []
            }
        }
        default: return state;
    }
}