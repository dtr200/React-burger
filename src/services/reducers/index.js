import { combineReducers } from "redux";
import {
    ingredients,
    modal,
    order
} from './reducer';

const rootReducer = combineReducers({
    ingredients,
    modal,
    order
});

export default rootReducer;