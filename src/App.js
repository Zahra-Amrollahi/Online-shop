import React from 'react';
//import "./App.css";
import { Router, Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
// import { Route } from 'react-router-dom';
// import Navbar from './_components/Navbar';
//import MainPage from './_pages/main.page';
import { LoginPage } from './_pages/login.page';
import { RegisterPage } from './_pages/register.page';
import { ProductPage } from './_pages/product.page';
import ProductDetailsPage from './_pages/productDetails.Page'
import { connect } from 'react-redux'
import CartPage from './_pages/cart.page';
import ShippingPage from './_pages/shipping.Page';
import ShippingAddressPage from './_pages/shippingAddress.Page'
import PaymentPage from './_pages/payment.Page';
import PrivateRoute from './_routes/privateRoute';
import { authenticationAction } from './_actions';
import { useEffect } from 'react';
import FinishPage from './_pages/finish.Page'

import { history } from './_helper/history';
import { authentication } from './_reducers/authentication.reducer';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SimpleAppBar from './_components/SimpleAppBar'
import { TextField } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   typography: {
//     fontFamily: [
//                   "Vazir",
//                 ].join(",")
//   },
//   root: {
//     flexGrow: 1,
//     direction: 'rtl',
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));




const App = (props) => {
  // const classes = useStyles();
  debugger
  const { allProducts } = props;
  useEffect(() => {
    debugger
    console.log("calling useeffect");

    if (localStorage.getItem("user_Email")) {
      const user = {
        token: localStorage.getItem('token'),
        user_Email: localStorage.getItem('user_Email'),
        user_Nicename: localStorage.getItem('user_Nicename'),
        user_Displayname: localStorage.getItem('user_Displayname')
      }
      props.dispatch(authenticationAction.autoLogin(user))

    }

  }, []);

  const logoutClickHandler = (e) => {
    e.preventDefault();
    props.dispatch(authenticationAction.logout());
  }
  return (

    <div className="app" >


      <SimpleAppBar user={props.authentication.user} cartItemsCount={props.cartItemsCount} />


      <Switch>
        <Route path="/" exact component={ProductPage} />
        <Route path="/product" exact component={ProductPage} />
        <Route path="/product/:id" component={ProductDetailsPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/finish" component={FinishPage} />

        <PrivateRoute
          path="/shipping"
          exact component={ShippingPage}
          componentName="ShippingPage"
          authentication={props.authentication}
          cartItemsCount={props.cartItemsCount}
          
        />
        <PrivateRoute
          path="/shippingaddress"
          exact component={ShippingAddressPage}
          componentName="ShippingAddressPage"
          authentication={props.authentication}
          cartItemsCount={props.cartItemsCount}
        />
        <PrivateRoute
          path="/payment"
          exact component={PaymentPage}
          componentName="PaymentPage"
          authentication={props.authentication}
          cartItemsCount={props.cartItemsCount}
        />
        <Route
          component={() => (
            <div style={{ padding: 20 }}>Page not found</div>
          )}
        />
      </Switch>
    </div>


  );
}



const mapStateToProps = state => {
  console.log("calling mapStateToProps function of App.js");

  const { cartItemsCount } = state.cart;
  const { authentication } = state
  //debugger
  return { cartItemsCount, authentication }
};

const mapDispatchToProps = dispatch => {
  console.log("calling mapDispatchToProps");
  return {



  }
}

const ConnectedApp = withRouter(connect(mapStateToProps)(App))

export { ConnectedApp as App }





