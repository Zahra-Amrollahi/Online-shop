
import { customerConstants } from '../_constants'

const customerReducerDefaultState = {

customer : {}

}
export const customer = (state = customerReducerDefaultState, action = {})  => {
    debugger
    switch (action.type) {
        case customerConstants.GETBYID_REQUEST:
            // debugger
             return state;
         case customerConstants.GETBYID_SUCCESS:
             //debugger
             return {...state, customer:action.customer};
         case customerConstants.GETBYID_FAILURE:
             //debugger
             return {...state};              
         default:
             return state;
    }



}
