import { TProductItem } from '../../utils/types';

import  {
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

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly ingredients: TProductItem[];
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface ISetCurrentIngredientAction {
    readonly type: typeof SET_CURRENT_INGREDIENT;
    readonly data: TProductItem;
}
export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    readonly id: string;
}
export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    readonly id: string;
}
export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    readonly id: string;
}
export interface IResetCurrentIngredientAction {
    readonly type: typeof RESET_CURRENT_INGREDIENT;
}
export interface IMoveIngredientAction {
    readonly type: typeof MOVE_INGREDIENT;
    readonly drag: number;
    readonly hover: number;
}
export interface IClearContructorIngredientsAction {
    readonly type: typeof CLEAR_CONSTRUCTOR_INGREDIENTS;
}
export interface ISetIngredientsTabAction {
    readonly type: typeof SET_INGREDIENTS_TAB;
    readonly id: string;
    readonly ratio: number;
}

export type TIngredientsAction = 
    IGetIngredientsRequestAction |
    IGetIngredientsSuccessAction |
    IGetIngredientsFailedAction |
    ISetCurrentIngredientAction |
    IAddIngredientAction |
    IAddBunAction |
    IDeleteIngredientAction |
    IResetCurrentIngredientAction |
    IMoveIngredientAction |
    IClearContructorIngredientsAction |
    ISetIngredientsTabAction;