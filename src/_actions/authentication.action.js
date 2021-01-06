import { authenticationConstants } from '../_constants'
import { authenticationService } from '../_service';
 import {history} from '../_helper/history';
 import jwt_decode from 'jwt-decode';
export const authenticationAction = {
  login, register, logout,autoLogin,  setAsLogedIn, retriveShipping, updateShipping, retriveCustomer, updateCustomer
}

function login(email, password, forwardTo) {
  debugger
  console.log("calling authentication.action.login")

  const username = email;
  return dispatch => {
    dispatch(request());
    authenticationService.login(username, password)
      .then((response) => {
        debugger
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        const user = {
          token: data.token,
          user_Email: data.user_email,
          user_Nicename: data.user_nicename,
          user_Displayname: data.user_displayname
        };
        localStorage.setItem('token', user.token);
        localStorage.setItem('user_Email', user.user_Email);
        localStorage.setItem('user_Nicename', user.user_Nicename);
        localStorage.setItem('user_Display_Name', user.user_Displayname);
      //  const user = data;
        dispatch(success(user));
        debugger
       // history.push('/product');

      // history.push(forward)
      if (forwardTo) {
         this.props.location.pathname = forwardTo;
      }
      else 
      history.goBack();
      })
      .catch((error) => {
        dispatch(failed(error))
      });
  }

  function request() { console.log("calling request function of autentication.action"); return { type: authenticationConstants.LOGIN_REQUEST }; }
  function success(user) { console.log("calling success function of autentication.action"); return { type: authenticationConstants.LOGIN_SUCCESS, user, isAuthenticated:true }; }
  function failed(error) { console.log("calling failed function of autentication.action"); return { type: authenticationConstants.LOGIN_FAILED, error } }
}

function retriveCustomer(user) {
  debugger
  const token = user.token;
  var decoded = jwt_decode(token);
  const id = parseInt(decoded.data.user.id);

  return dispatch => {
    dispatch(request());
    authenticationService.retriveCustomer(id)
      .then((response) => {
        debugger
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        const customer = data
      //  const user = data;
        dispatch(success(customer));
        debugger
       // history.push('/product');

      // history.push(forward)
   

      })
      .catch((error) => {
        dispatch(failed(error))
      });
  }

  function request() { console.log("calling request function of autentication.action.retriveCustomer"); return { type: authenticationConstants.RETRIVE_CUSTOMER_REQUEST }; }
  function success(customer) { console.log("calling success function of autentication.action.retriveCustomer"); customer.status = true; return { type: authenticationConstants.RETRIVE_CUSTOMER_SUCCESS, customer }; }
  debugger
  function failed(error) { console.log("calling failed function of autentication.action.retriveCustomer"); return { type: authenticationConstants.RETRIVE_CUSTOMER_FAILED, error } }

}

function updateCustomer(user, data, forwardTo) {
  debugger
  const token = user.token;
  var decoded = jwt_decode(token);
  const id = parseInt(decoded.data.user.id);

  return dispatch => {
    dispatch(request());
    authenticationService.updateCustomer(id, data)
      .then((response) => {
        debugger
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        const customer = data
      //  const user = data;
        dispatch(success(customer));
        debugger
       // history.goBack();
   

      })
      .catch((error) => {
        dispatch(failed(error))
      });
  }

  function request() { console.log("calling request function of autentication.action.updateCustomer"); return { type: authenticationConstants.UPDATE_CUSTOMER_REQUEST }; }
  function success(customer) { console.log("calling success function of autentication.action.updateCustomer"); customer.status = true; return { type: authenticationConstants.UPDATE_CUSTOMER_SUCCESS, customer }; }
  debugger
  function failed(error) { console.log("calling failed function of autentication.action.updateCustomer"); return { type: authenticationConstants.UPDATE_CUSTOMER_FAILED, error } }

}
function register(email, password, history) {
  debugger
  console.log("calling register function of registration.action");

  return dispatch => {
    debugger
    dispatch(request());
    authenticationService.register(email, password)
      .then((response) => {
        debugger
        if (!response.ok && response.status !== 400) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        console.log("data:", data)
        if ((data.status < 200) || (data.status > 300)) {
          throw new Error(data.message);
        }


      })
      .then(() => {
        //const username = email;
        dispatch(success());
        dispatch(authenticationAction.login(email, password));
        history.push('/product');
      })
      .catch((error) => {
        dispatch(failed(error));
      });

  }
  function request() { console.log("calling request function of registration.action"); return { type: authenticationConstants.REGISTER_REQUEST }; }
  function success() { console.log("calling success function of registration.action"); return { type: authenticationConstants.REGISTER_SUCCESS }; }
  function failed(error) { console.log("calling failed function of registration.action"); return { type: authenticationConstants.REGISTER_FAILED, error } }
}

function logout() {
  debugger
  localStorage.removeItem('token');
  localStorage.removeItem('user_Email');
  localStorage.removeItem('user_Nicename');
  localStorage.removeItem('user_Displayname');
  
  return { type:authenticationConstants.LOGOUT_REQUEST, user:{}, isAuthenticated:false}
}

function autoLogin(user) {
  debugger
  console.log("calling authentication.action.autoLogin")

  
       return dispatch => {
        dispatch(success(user));
        
       }
      //  const user = data;
        
       // history.push('/product');

      // history.push(forward)
   

  function success(user) { console.log("calling success function of autentication.action.autoLogin"); return { type: authenticationConstants.LOGIN_SUCCESS, user, isAuthenticated:true }; }
}


function setAsLogedIn(username) {
  // debugger
  // console.log("calling authentication.action.setAsLogedIn")
  // let error = ""
  // let user = users.filter(u => u.email.toLowerCase() === username.toLowerCase())
  // if (!user.length) {
  //   error = "آدرس ایمیل  پیدا نشد";
  //   localStorage.removeItem("User");
  //   return { type: authenticationConstants.SETASLOGEDIN_FAILED, error };

  //}

  // if (!error) {

  //    user = localStorage.getItem("User");
  //   return { type: authenticationConstants.SETASLOGEDIN_SEUCCESS, user };

  // }


  //     return dispatch => {
  //       //  debugger
  //         dispatch(request());
  //         authenticationService.login(username, password).then((result) => {
  //                 let responseJSON = result;
  //                 console.log(responseJSON);
  //                 if (responseJSON.token) {
  //                     localStorage.setItem('User', responseJSON.user_email);
  //                 } else {
  //                     console.log("login error response does not have jwt token");
  //                 }
  //             }).then(
  //                     response => {
  //                         const user = localStorage.getItem("User");
  //                         console.log(user);
  //                        // debugger
  //                         dispatch(success(user))
  //                       //  debugger
  //                         history.push('/');
  //                     },
  //                     error => {
  //                         debugger
  //                         dispatch(failed(error))
  //                     }
  //                 )
  //     }
  //   function request() { console.log("calling request function of autentication.action") ;return {type:authenticationConstants.LOGIN_REQUEST};}
  //   function success(user) {console.log("calling success function of autentication.action") ; return {type:authenticationConstants.LOGIN_SUCCESS,user};}
  //   function failed(error) {console.log("calling failed function of autentication.action") ;return {type:authenticationConstants.LOGIN_FAILED,error}}
}

function retriveShipping(email) {
  //debugger
  console.log("calling authentication.action.retriveShipping")
  // let error = ""
  // let user = users.filter(u => u.email.toLowerCase() === email.toLowerCase())
  // if (!user.length) {
  //   error = "آدرس ایمیل  پیدا نشد";

  // }

  // if (!error) {
  //   // localStorage.setItem('User', user[0].email);

  //   return { type: authenticationConstants.RETRIVE_SHIPPING_SUCCESS, customer:user[0]};

  // }
  // return { type: authenticationConstants.RETRIVE_SHIPPING_FAILED, error };

}

function updateShipping(shipping) {
  //debugger
  console.log("calling authentication.action.updateshipping");
  //   let error = "";
  //   // let newShipping = users[1].shipping;
  // // let id = "25";
  // let customer = users.filter(u => u.email === shipping.useremail);
  // let index = users.indexOf(customer[0]);
  // customer[0].shipping = shipping;

  // users[index] =  customer[0];

  // return {type:authenticationConstants.UPDATE_SHIPPING_SUCCESS, customer:users[index]}
}


