import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

const db = firebase.db();


export const FetchJobs = ()=>{
    return (dispatch) => {
        dispatch(LoginStart())
        auth.signInWithEmailAndPassword(email, password)
            .then(user=>{
                dispatch(LoginSuccess(user))
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