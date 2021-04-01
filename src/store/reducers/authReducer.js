import * as actionTypes from "../actions/actionTypes";
import firebase from '../../firebase';

const initialState = {
    user: firebase.auth().user,
    isAuthenticated:undefined,
    isProfileLoaded: false,
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
            return {...state, isLoginFormLoading: false, user: action.payload.user, isProfileLoaded:false}


        case actionTypes.FIREBASE_AUTH_STATECHANGED:
            if(action.payload == null)
                return {...state, user: action.payload, isAuthenticated:false, isProfileLoaded:true}
            else
                return {...state, user: action.payload, isAuthenticated:true}

        case actionTypes.GET_PROFILE:
            return {...state, isProfileLoaded:false}

        case actionTypes.SET_PROFILE:
            return {...state, isProfileLoaded:true, profile: action.payload}

        case actionTypes.USER_LOGOUT:
            return {...state, loading: true, isAuthenticated: undefined};

        case actionTypes.USER_LOGOUT_FAILED:
            return {...state, loading: false, isAuthenticated:true, logoutError :action.payload }

        case actionTypes.USER_LOGOUT_SUCCESS:
            return {...state, loading: false, isAuthenticated:false, user: null, profile: undefined}

        default:
        return state;
    }
}

export default reducer;