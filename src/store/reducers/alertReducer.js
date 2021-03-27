import * as actionTypes from "../actions/actionTypes";

const initialState = [ ]


const reducer = (state = initialState, action)=>{

    switch(action.type)
    {
        case actionTypes.CREATE_ALERT:
            let newAlert = {...action.payload, show:true}
            let alerts = [...state, newAlert]
            return alerts;

        case actionTypes.REMOVE_ALERT:
            let newAlerts= [state.alerts];
            newAlerts.pop(action.payload);
            return newAlerts;
        default:
        return state;
    }
}

export default reducer;