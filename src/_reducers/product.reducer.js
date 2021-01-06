import {productConstants} from '../_constants'

//products Reducer
//const productReducerDefaultState = [];
//const productReducerDefaultState = {allProducts:[],selectedProduct:{}}
const productsReducerDefaultState = {
    category:{},
    products: [],
    status: false,
    error:{}
}
//const expenseReducer = (state = productsReducerDefaultState, action) => {
    //{...state,loginRequest:false,error};
    export const products =  (state = productsReducerDefaultState, action) => {
//debugger
        switch (action.type) {
            
                    case productConstants.GETALL_REQUEST:
                        //debugger
                        console.log("product reducer GETALL_REQUEST")
                        return state;
                    case productConstants.GETALL_SUCCESS:
                       // debugger
                        console.log("product reducer GETALL_SUCCESS")
                        //return {...state,allProducts:action.products};
                        return {status:true, products:action.products,category:{}}
                    case productConstants.GETALL_FAILURE:
                      //  debugger
                        console.log("product reducer GETALL_FAILURE")
                        return {status:false, products:[],error:action.error};
                    case productConstants.GETALL_BY_CATEGORY_ID_REQUEST:
                        return state;
                    case productConstants.GETALL_BY_CATEGORY_ID_SUCCESS:
                        return {...state,products:action.products, status:true, category:action.category};
                    case productConstants.GETALL_BY_CATEGORY_ID_FAILURE:
                        return {status:false, products:[],error:action.error};
                    case productConstants.GETBYID_REQUEST:
                       // debugger
                        return state;
                    case productConstants.GETBYID_SUCCESS:
                        //debugger
                        return {...state, selectedProduct:action.product};
                    case productConstants.GETBYID_FAILURE:
                        //debugger
                        return {...state};              
                    default:
                        return state;
                }

}

