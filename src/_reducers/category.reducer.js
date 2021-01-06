import {categoryConstants} from '../_constants'

//products Reducer
const categoryReducerDefaultState = {status:false, categories:[]}
//const expenseReducer = (state = productsReducerDefaultState, action) => {
    export const categories =  (state = categoryReducerDefaultState, action) => {

        switch (action.type) {
                    case categoryConstants.GETALL_REQUEST:
                        //debugger
                        console.log("category reducer GETALL_REQUEST")
                        return state;
                    case categoryConstants.GETALL_SUCCESS:
                       // debugger
                        console.log("category reducer GETALL_SUCCESS")
                        return {...state, status:true, categories:action.categories};
                    case categoryConstants.GETALL_FAILURE:
                      //  debugger
                        console.log("product reducer GETALL_FAILURE")
                        return state;
                    // case productConstants.GETBYID_REQUEST:
                    //    // debugger
                    //     return state;
                    // case productConstants.GETBYID_SUCCESS:
                    //     //debugger
                    //     return {...state, product:action.product};
                    // case productConstants.GETBYID_FAILURE:
                    //     //debugger
                    //     return {...state};              
                    default:
                        return state;
                }

}

