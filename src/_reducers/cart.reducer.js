
import { cartConstants } from '../_constants'

const cartReducerDefaultState = {

    addedItems: [], 
    cartItemsCount:0
  //  total: 0

}
export const cart = (state = cartReducerDefaultState, action = {})  => {
   // debugger
    switch (action.type) {
        case cartConstants.ADD_TO:
            //debugger
                console.log("Add_TO is dispatched")
            let existingIndex = findProductIndex(state.addedItems, action.payload.id);
            const newTotal = state.total + Number(action.payload.price * 1);
            if (existingIndex !== -1) {
                let newQuantity = state.addedItems[existingIndex].quantity + 1;
                let createAt = state.addedItems[existingIndex].createAt;
                
                // state.addedItems[existingIndex].quantity += 1;
                return  {...state,addedItems:[...state.addedItems].filter((item) => item.id !== action.payload.id ).
                                                                   concat({id:action.payload.id,quantity:newQuantity,createAt:createAt}),cartItemsCount:state.cartItemsCount+1}

            }
           
            return {...state,addedItems:[...state.addedItems].concat({id:action.payload.id,quantity:1,createAt:action.payload.createAt}),cartItemsCount:state.cartItemsCount+1}
            

        case cartConstants.UPDATE_QUANTITY:
            debugger
            let existingI = findProductIndex(state.addedItems, action.payload.id);
           // const newTo = state.total + Number(state.addedItems[existingI].price);
            if (state.addedItems[existingI].quantity === 1 && action.payload.quantity === -1) {
               return {...state,addedItems:[...state.addedItems].filter((item) => item.id !== action.payload.id ),cartItemsCount:state.cartItemsCount -1}
              //return state;
            }
            const newQuantity = state.addedItems[existingI].quantity + action.payload.quantity;
            // const price = state.addedItems[existingI].price;
            return  {...state,addedItems:[...state.addedItems].filter((item) => item.id !== action.payload.id ).
                concat({id:action.payload.id,quantity:newQuantity}),cartItemsCount:state.cartItemsCount+ action.payload.quantity}

        case cartConstants.REMOVE_FROM:
            let indexToDel = findProductIndex(state.addedItems, action.payload.id);
            if (indexToDel !== -1)
            {
                const quantity = state.addedItems[indexToDel].quantity;
                // const newT = state.total - state.addedItems[indexToDel].price * state.addedItems[indexToDel].quantity
                 return {...state,addedItems:[ ...state.addedItems.slice(0, indexToDel), ...state.addedItems.slice(indexToDel + 1)],cartItemsCount:state.cartItemsCount - quantity};
            }
            return state;
        
        case cartConstants.MAKE_CART_EMPTY:
            return {...state,
                addedItems: [], 
                cartItemsCount:0
            }
            
        // case cartConstants.SORTBY_DATE:
            
        //     return state.addedItems.slice().sort(function(a, b) {
        //         // var nameA = a.name.toLowerCase(),
        //         //   nameB = b.name.toLowerCase()
        //         // if (nameA < nameB)
        //         //   return -1
        //         // if (nameA > nameB)
        //         //   return 1
        //         // return 0
        //         if (a.createAt < b.createAt)
        //             return -1
        //             if(a.createAt > b.createAt)
        //             return 1
        //             return 0
        //       })
        //       case cartConstants.FILTERBY_PRODUCTID:
        //           //debugger
        //         console.log("FILTERBY_PRODUCTID is dispatched")
        //         let existingIndex = findProductIndex(state.addedItems, action.payload.id);
            
        //         return existing

          

           
    }


    function findProductIndex(products, id) {
        return products.findIndex((p) => p.id === id)
    }

    return state;

}
