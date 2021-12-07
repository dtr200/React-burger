import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_CURRENT_INGREDIENT,
    RESET_CURRENT_INGREDIENT,
    SET_INGREDIENTS_TAB
} from '../actions/action-types';

const initialIngredientsState = {
    ingredientsRequest: true,
    ingredientsFailed: false,
    ingredientsData: [],
    constructorIngredients: [],
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
                constructorIngredients: action.constructorIngredients,
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

export const getIngredients = (ingredientsURL, defaultCart) => {
    return async (dispatch) => {
        try{
            dispatch({ 
                type: GET_INGREDIENTS_REQUEST 
            });
            const res = await fetch(ingredientsURL);
            const json = await res.json();
            
            const products = [];
            json.data.forEach(item => {
              for(let i = 0; i < defaultCart.length; i++){
                if(defaultCart[i].id === item._id)
                  products.push(
                    { item, pcs: defaultCart[i].pcs }
                  );
              }
            });
            dispatch({ 
                type: GET_INGREDIENTS_SUCCESS, 
                ingredients: json.data,
                constructorIngredients: products
            });
        }
        catch(err){
            dispatch({ 
                type: GET_INGREDIENTS_FAILED
            }); 
        }
    }    
}