import { combineReducers } from "redux";
import {
    ingredients,
    order
} from './reducer';

const rootReducer = combineReducers({
    ingredients,
    order
});

export default rootReducer;