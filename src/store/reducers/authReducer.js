import * as actionTypes from "../actions/actionTypes";
import firebase from '../../firebase';

const initialState = {
    user: firebase.auth().user,
    isAuthenticated:undefined,
    isLoginFormLoading: false,
    loginError: null,
}

const reducer = (state = initialState, action)=>{

    switch(action.type)
    {
        case actionTypes.USER_LOGIN:
            return {...state, isLoginFormLoading: true, loginError: null};

        case actionTypes.USER_LOGIN_FAILED:
            return {...state, isLoginFormLoading: false,loginError :action.payload }

        case actionTypes.USER_LOGIN_SUCCESS:
            return {...state, isLoginFormLoading: false, user: action.payload.user}


        case actionTypes.FIREBASE_AUTH_STATECHANGED:
            if(action.payload == null)
                return {...state, loading: false, user: action.payload, isAuthenticated:false}
            else
                return {...state, loading: false, user: action.payload, isAuthenticated:true}

        case actionTypes.USER_LOGOUT:
            return {...state, loading: true};

        case actionTypes.USER_LOGOUT_FAILED:
            return {...state, loading: false, logoutError :action.payload }

        case actionTypes.USER_LOGOUT_SUCCESS:
            return {...state, loading: false, user: null}

        default:
        return state;
    }
}

export default reducer;