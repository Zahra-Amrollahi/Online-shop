import {orderConstants} from '../_constants'

//products Reducer
//const productReducerDefaultState = [];
//const productReducerDefaultState = {allProducts:[],selectedProduct:{}}
const orderReducerDefaultState = {
    order:{}
}
//const expenseReducer = (state = productsReducerDefaultState, action) => {
    //{...state,loginRequest:false,error};
    export const order =  (state = orderReducerDefaultState, action) => {
debugger
        switch (action.type) {
            
                    case orderConstants.CREATE_ORDER_REQUEST:
                        //debugger
                        console.log("order reducer create order request")
                        return state;
                    case orderConstants.CREATE_ORDER_SUCCESS:
                       // debugger
                        console.log("order reducer create order success")
                        //return {...state,allProducts:action.products};
                        return {...state, order:action.order}
                    case orderConstants.CREATE_ORDER_FAILED:
                      //  debugger
                        console.log("order reducer create order failed")
                        return state;
                    default:
                        return state;
                }

}

