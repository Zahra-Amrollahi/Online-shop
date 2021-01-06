
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { cartAction } from '../_actions';
import CartItem from "../_components/cartItem";
import Grid from "@material-ui/core/Grid";
import Checkout from "../_components/Checkout";
import { makeStyles } from '@material-ui/core/styles';

const Cart = (props) => {
    debugger
    // let total = 0;
    // let discount = 0
    // const [messageObj, setMessage] = useState({ message: '', id: 1 });
    const [checkout, setCheckout] = useState(calc())

    function calc() {
        const result = {
            quantity:0,
            totalRegularPrice: 0,
            totalSalePrice:0,
            
        }
        const orderDate = new Date().toISOString().substring(0, 10);
        const { addedItems } = props.cart;
        const { products } = props;
        if (addedItems.length)
        {
            addedItems.forEach((item) => {
                let product = products.filter(product => product.id === item.id);
                result.quantity += item.quantity;
                if (product[0]["on_sale"] )
                {
                    
                    result.totalSalePrice += (item.quantity * product[0]["sale_price"]);
                }
                
                result.totalRegularPrice += (item.quantity * product[0]["regular_price"]);
    
    
            })

        }
        
        return result;
    }


    useEffect(() => {

        setCheckout(calc());
    }, [props.cart.addedItems])

    const drawerWidth = 240;
    const useStyles = makeStyles((theme) => ({
        root: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginRight: drawerWidth,

            },
        },
        
    }));
    const classes = useStyles();
    


    return (
        <div className={classes.root} style={{ padding: "12px" }} >
            <Grid container spacing={3} sm={12}>
              
                    {props.cart.addedItems.length && 
                        <Checkout
                          quantity={checkout.quantity}
                          totalSalePrice={checkout.totalSalePrice}
                          totalRegularPrice={checkout.totalRegularPrice}
                          to={"\shipping"}
                          buttonName={"ادامه فرآیند خرید"}
                          
                    />}

               
                <Grid container item>
                    <Grid container item>
                        {props.cart.addedItems.map(cartItem => {
                            return (
                                <CartItem key={cartItem.id}
                                    cartItem={cartItem}
                                    product={props.products.filter(p => p.id === cartItem.id)}
                                    onAddUnit={() => handleAddUnit(cartItem.id, props)}
                                    onDeductUnit={() => handleDeductUnit(cartItem.id, props)}
                                    handleDeleteFromCart={() => handleDeleteFromCart(cartItem.id, cartItem.quantity, props)}
                                ></CartItem>)
                        })}

                    </Grid>
                </Grid>

            </Grid>

        </div>


    )

}


function handleAddUnit(id, props) {
    let quantity = 1;
    props.updateQuantity({ id, quantity })
}
function handleDeleteFromCart(id, quantity, props) {
    //debugger
    props.removeFromCart({ id, quantity })
}
function handleDeductUnit(id, props) {
    let quantity = -1;
    props.updateQuantity({ id, quantity })
}

function mapStateToProps(state) {
    //debugger
    const { cart } = state;
    const { products } = state.products;
    cart.addedItems.slice(0).sort(function (a, b) {

        if (a.createAt < b.createAt)
            return -1
        if (a.createAt > b.createAt)
            return 1
        return 0
    })
    return {
        cart, products
    };


}
function mapActionsToProps(dispatch) {
    return {
        removeFromCart: ({ id, quantity }) => dispatch(cartAction.removeFromCart({ id, quantity })),
        updateQuantity: ({ id, quantity }) => dispatch(cartAction.updateQuantity({ id, quantity })),
        sort: () => dispatch(cartAction.sortByDate())

    }
}

export default connect(mapStateToProps, mapActionsToProps)(Cart);
// <main className="wrapper">

// <div className="row">
//     <div id="content" className="col-xs-12 col-lg-12">


//         <section className="group row">

//             <h2>سبد خرید</h2>


//             <div className="col-xs-12">

//                 {props.cart.addedItems.map(cartItem => {
//                     return (
//                         <CartItem key={cartItem.id}
//                             cartItem={cartItem}
//                             product={props.products.filter(p => p.id === cartItem.id)}
//                             onAddUnit={() => handleAddUnit(cartItem.id, props)}
//                             onDeductUnit={() => handleDeductUnit(cartItem.id, props)}
//                             handleDeleteFromCart={() => handleDeleteFromCart(cartItem.id, cartItem.quantity, props)}
//                         ></CartItem>)
//                 })}


//             </div>
//         </section>

//     </div>
//   {props.cart.addedItems.length &&                 <Checkout  
//     total = {checkout.total}
//     discount = {checkout.discount}

// />}  


//   : <div></div>

// </div>
// </main>