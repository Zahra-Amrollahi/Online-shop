import React, { useDispatch } from "react";
import { Route, Redirect } from "react-router-dom";
import { authenticationAction } from '../_actions/authentication.action';
import { connect } from 'react-redux';
import ShippingAddressPage from "../_pages/shippingAddress.Page";
import { history } from '../_helper/history';

const PrivateRoute = ({ component: Component, authentication, cartItemsCount, ...rest }) => {
  debugger
 
  return (

    <Route
      {...rest}
      render={props => 
        cartItemsCount ?  (authentication.isAuthenticated ? <Component />
        :  <Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
          : <Redirect to={{ pathname: props.match.path }} />
      
        }
    ></Route>

  )
}

// const mapStateToProps = state => {
// const {user} = state.authentication;
// return {user};
// };

// const ConnectedPirvateRouter = connect(mapStateToProps)(PrivateRoute);

export default PrivateRoute