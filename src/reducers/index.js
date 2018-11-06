
import { combineReducers } from "redux";

import data from "./dataReducer";
import basic from "./basicReducer";

export default combineReducers({
    data,
    basic,
});