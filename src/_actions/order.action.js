import { orderConstants } from '../_constants'
import { cartConstants} from '../_constants';
import { cartAction} from '../_actions'
import { orderService } from '../_service';
 import {history} from '../_helper/history';
 import jwt_decode from 'jwt-decode';
export const orderAction = {
  createOrder
}

function createOrder(order) {
  debugger
  console.log("calling order.action.createOrder")

  
  return dispatch => {
    dispatch(request());
    orderService.createOrder(order)
      .then((response) => {
        debugger
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        console.log("data:", data)
        
        dispatch(success(data));
        dispatch(cartAction.makeCartEmpty());
        
       

      })
      
      .catch((error) => {
        dispatch(failed(error));
      });

  }

  function request() { debugger;  console.log("calling request function of order.createOrder"); return { type: orderConstants.CREATE_ORDER_REQUEST }; }
  function success(order) { console.log("calling success function of order.createOrder"); return { type: orderConstants.CREATE_ORDER_SUCCESS, order }; }
  function failed(error) { console.log("calling failed function of order.createOrder"); return { type: orderConstants.CREATE_ORDER_FAILED, error } }
}



