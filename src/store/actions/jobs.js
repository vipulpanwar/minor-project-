import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

const db = firebase.firestore();


export const FetchJobs = ()=>{
    return (dispatch, getState) => {
        
        console.log(getState());
        dispatch(FetchJobsStart())
        // auth.signInWithEmailAndPassword(email, password)
        //     .then(user=>{
        //         dispatch(LoginSuccess(user))
        //     })
        //     .catch(err=>{
        //         dispatch(LoginFailed(err))
        //     })
    }
}

export const FetchJobsStart = ()=>({
    type: actionTypes.FETCH_JOBS
});

// export const LoginSuccess = (user)=>({
//     type: actionTypes.USER_LOGIN_SUCCESS,
//     payload: user,
// });

// export const LoginFailed = (err)=>({
//     type: actionTypes.USER_LOGIN_FAILED,
//     payload: err,
// });