import * as actionTypes from './actionTypes';
import {auth,db} from '../../firebase'
import {CreateAlert } from './alert';
// const auth = firebase.auth();


console.log("auth inited")

export const Login = (email, password)=>{
    return (dispatch) => {
        dispatch(LoginStart())
        auth.signInWithEmailAndPassword(email, password)
            .then(async user=>{
                
                let token = await auth.currentUser.getIdTokenResult();
                token.claims.userType = "company";    
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

        let token = await auth.currentUser.getIdTokenResult();
        token.claims.userType ="company";              
        if(token.claims?.userType === "company")
        {
            console.log(await auth.currentUser.getIdToken())
            dispatch(GetCompanyProfile());
            dispatch(AuthStateChangedStart(user));
            let profile = await db.collection('company').doc(user.uid).get();
            
            if(profile.data()?.verified == false)
            {
                dispatch(CreateAlert({subtitle:'Your profile verification is under process, kindly wait for 24 hours.',title:"Profile Created", code:'success'}))
                dispatch(Logout())
            }
            else
                dispatch(SetCompanyProfile(profile.data()))
        }
        else
        {
            dispatch(LoginFailed({message:"Please login with a company account."})) ;
            dispatch(Logout())
        }
    }
}

export const GetCompanyProfile = ()=>({
    type: actionTypes.GET_PROFILE,
})

export const SetCompanyProfile = (profile)=>({
    type: actionTypes.SET_PROFILE,
    payload: profile,
})

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

