import { combineReducers } from "redux";
import authReducer from './authReducer';
import jobReducer from './jobReducer';
import alertReducer from './alertReducer';

export default combineReducers({
    "auth": authReducer,
    "jobs": jobReducer,
    "alerts":alertReducer,
})