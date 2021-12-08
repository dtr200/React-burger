import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CURRENT_INGREDIENT,
    ADD_INGREDIENT,
    DELETE_INGREDIENT,
    RESET_CURRENT_INGREDIENT,
    SET_INGREDIENTS_TAB
} from '../actions/action-types';
import {
    DEFAULT_CART
} from '../../utils/constants';

const initialIngredientsState = {
    ingredientsRequest: true,
    ingredientsFailed: false,
    ingredientsData: [],
    constructorIngredients: DEFAULT_CART,
    currentIngredient: {},
    tabs: [
        {
          id: 'bun',
          title: 'Булки',
          ratio: 0
        },
        {
          id: 'sauce',
          title: 'Соусы',
          ratio: 0
        },
        {
          id: 'main',
          title: 'Начинки',
          ratio: 0
        },
    ]
}

export default (state = initialIngredientsState, action) => {
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
        case ADD_INGREDIENT: {
            const currentItem = state.ingredientsData.find(item => item._id === action.id);
            const itemIndex = state.constructorIngredients.findIndex(product => 
                product.item._id === action.id);
            
            const newConstructorIngredients = itemIndex === -1 ? 
                [...state.constructorIngredients, { item: currentItem, amount: 1} ] :
                state.constructorIngredients.map(product => 
                    product.item._id === action.id ? 
                    { ...product, amount: product.amount + 1 } : product);
                    
            return {
                ...state,
               constructorIngredients: newConstructorIngredients
            }
        }
        case DELETE_INGREDIENT: {
            return {
                ...state
            }
        }
        case SET_INGREDIENTS_TAB: {
            return {
                ...state,
                tabs: state.tabs.map(tab => 
                    tab.id === action.id ? {...tab, ratio: action.ratio} : tab)         
            }
        }
        default: return state;
    }
}