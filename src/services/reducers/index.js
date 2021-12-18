import { combineReducers } from "redux";
import ingredients from './ingredients';
import order from './order';
import modal from './modal';
import access from './access';

const rootReducer = combineReducers({
    ingredients,
    modal,
    order,
    access
});

export default rootReducer;