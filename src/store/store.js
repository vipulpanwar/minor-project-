import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./reducers/indexReducers";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) || compose;
  
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
  ));

export default store;