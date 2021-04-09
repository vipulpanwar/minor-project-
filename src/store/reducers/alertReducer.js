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
            let alerts = [...state.alerts, newAlert]
            return {...state,alerts};

        case actionTypes.REMOVE_ALERT:
            let newAlerts= [state.alerts];
            newAlerts.splice(action.payload,1);
            return {...state, alerts:newAlerts};;
        
        case actionTypes.REMOVE_TOAST:
            let newToasts =[...state.toasts];
            newToasts.splice(action.payload,1);
            return {...state, toasts:newToasts};
    
        default:
        return state;
    }
}

export default reducer;