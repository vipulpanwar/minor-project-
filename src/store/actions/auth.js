import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

const auth = firebase.auth();

console.log("auth inited")

export const Login = (email, password)=>{
    return (dispatch) => {
        dispatch(LoginStart())
        auth.signInWithEmailAndPassword(email, password)
            .then(async user=>{
                let token = await firebase.auth().currentUser.getIdTokenResult()              
                if(token.claims?.userType === "company")
                    dispatch(LoginSuccess(user));
                else
                dispatch(LoginFailed({message:"Please Login with a Company Account."})) ;
                
            })
            .catch(err=>{
                dispatch(LoginFailed(err))
            })
    }
}

export const LoginStart = ()=>({
    type: actionTypes.USER_LOGIN
});

export const LoginSuccess = (user)=>({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: user,
});

export const LoginFailed = (err)=>({
    type: actionTypes.USER_LOGIN_FAILED,
    payload: err,
});


export const AuthStateChanged = (user)=>{
    return async(dispatch)=>{
        if(!user)
            return dispatch(AuthStateChangedStart(user));

        let token = await firebase.auth().currentUser.getIdTokenResult()              
        if(token.claims?.userType === "company")
            dispatch(AuthStateChangedStart(user));
        else
        {
            dispatch(LoginFailed({message:"Please login with a company account."})) ;
            dispatch(Logout())
        }
    }
}

export const AuthStateChangedStart = (user)=>({
    type: actionTypes.FIREBASE_AUTH_STATECHANGED,
    payload: user,
});



export const Logout = ()=>{
    return async (dispatch) => {
        dispatch(LogoutStart())
        auth.signOut()
            .then(()=>{
                dispatch(LogoutSuccess())
            })
            .catch(err=>{
                dispatch(LogoutFailed(err))
            })
    }
}

export const LogoutStart = ()=>({
    type: actionTypes.USER_LOGOUT
});

export const LogoutSuccess = (user)=>({
    type: actionTypes.USER_LOGOUT_SUCCESS,
});

export const LogoutFailed = (err)=>({
    type: actionTypes.USER_LOGOUT_FAILED,
    payload: err,
});

