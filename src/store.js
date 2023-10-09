import { createStore, combineReducers, applyMiddleware, compose  } from 'redux';
import cartReducer from './reducers/cartReducer';
import authReducer from './reducers/auth';
import messageReducer from './reducers/message';
import thunk from "redux-thunk"; 
import { composeWithDevTools } from "redux-devtools-extension";   
import propertyReducer from './reducers/property';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  message: messageReducer,
  properties: propertyReducer
});

const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(...middleware)));

export default store;
