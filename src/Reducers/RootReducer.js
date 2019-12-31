import { combineReducers } from "redux";
import ProductListReducer from "./ProductListReducer";
import ProductItemReducer from "./ProductItemReducer";
import CartReducer from "./CartReducer";
import CheckoutReducer from "./CheckoutReducer";

const rootReducer =  combineReducers({
    productList: ProductListReducer,
    productItem: ProductItemReducer,
    cart: CartReducer,
    checkout: CheckoutReducer
})

export default rootReducer;