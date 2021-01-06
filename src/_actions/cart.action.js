import {cartConstants} from '../_constants'

export const cartAction = {
   addToCart, removeFromCart, updateQuantity, sortByDate, makeCartEmpty
}
//debugger
 function addToCart({id,createAt}) {
    return {
        type: cartConstants.ADD_TO,
        payload : {id,createAt}
    }
}
 function removeFromCart({id}) {
    return {
        type: cartConstants.REMOVE_FROM ,
        payload: {id}
    }
}
function makeCartEmpty(){
    return {
        type: cartConstants.MAKE_CART_EMPTY
    }
}
 function updateQuantity({id, quantity}) {
    return {
        type: cartConstants.UPDATE_QUANTITY,
        payload: {id, quantity}
    }
}

function sortByDate() {
    return {
        type:cartConstants.SORTBY_DATE,
        payload:{}
    }
}

