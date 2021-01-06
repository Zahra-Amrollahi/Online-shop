import {combineReducers} from "redux";
import {authentication} from "./authentication.reducer";
 import {cart} from './cart.reducer';
 import {categories} from './category.reducer';

import {products} from './product.reducer'
import {customer} from './customer.reducer'
import {order} from './order.reducer'
const rootReducer = combineReducers({
    authentication,
    products,
    categories,
    cart,
    order
    
});
export default rootReducer;