import {customerConstants} from '../_constants'

export const customerAction = {
    getByEmail
}
//debugger

function getByEmail(email){
    return {
        type:customerConstants.GET_BY_EMAIL,
        payload:{email}
    }
}
//  function addToCart({id,createAt}) {
//     return {
//         type: cartConstants.ADD_TO,
//         payload : {id,createAt}
//     }
// }
//  function removeFromCart({id, quantity}) {
//     return {
//         type: cartConstants.REMOVE_FROM ,
//         payload: {id, quantity}
//     }
// }
//  function updateQuantity({id, quantity}) {
//     return {
//         type: cartConstants.UPDATE_QUANTITY,
//         payload: {id, quantity}
//     }
// }

// function sortByDate() {
//     return {
//         type:cartConstants.SORTBY_DATE,
//         payload:{}
//     }
// }

