import { act } from "@testing-library/react";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    alerts:[],
    toasts:[],
}


const reducer = (state = initialState, action)=>{

    switch(action.type)
    {
        case actionTypes.CREATE_TOAST:
            let toasts = [...state.toasts]
            toasts.push(action.payload);
            return {...state, toasts}

        case actionTypes.CREATE_ALERT:
            let newAlert = {...action.payload, show:true}
            let alerts = [...state, newAlert]
            return {...state,alerts};

        case actionTypes.REMOVE_ALERT:
            let newAlerts= [state.alerts];
            newAlerts.splice(action.payload,1);
            return {...state,newAlerts};;
        default:
        return state;
    }
}

export default reducer;