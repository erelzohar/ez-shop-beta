import { combineReducers, createStore } from "redux";
import { authReducer } from "./auth-state";
import { cartItemsReducer } from "./cart-items-state";
import { cartsReducer } from "./cart-state";
import { productsReducer } from "./products-state";

const reducers = combineReducers({ 
    productsState: productsReducer, 
    authState: authReducer,
    cartsState:cartsReducer,
    cartItemsState:cartItemsReducer
});

const store = createStore(reducers);

export default store;