import * as actionTypes from './actionTypes';

export const CreateAlert= (alert)=>({
    type: actionTypes.CREATE_ALERT,
    payload: alert,
});


export const RemoveAlert= (i)=>({
    type: actionTypes.REMOVE_ALERT,
    payload: i,
});

export const CreateToast= (toast)=>({
    type: actionTypes.CREATE_TOAST,
    payload: toast,
});