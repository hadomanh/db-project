import rootReducer from "../Reducers/RootReducer"
import { createStore } from 'redux';

const Store = createStore(rootReducer)

export default Store;