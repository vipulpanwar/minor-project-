import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./reducers/indexReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware()
  ));

export default store;