import { combineReducers } from "redux";
import ProductListReducer from "./ProductListReducer";
import ProductItemReducer from "./ProductItemReducer";
import CartReducer from "./CartReducer";

const rootReducer =  combineReducers({
    productList: ProductListReducer,
    productItem: ProductItemReducer,
    cart: CartReducer
})

export default rootReducer;