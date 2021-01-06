
import React from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../_helper/history';
import { authenticationAction } from '../_actions';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'


const CheckoutBill = (props) => {
    const e2p = (s) => {
        return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    }
    const thereDigitSepration = (n) => {
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const discount = props.totalRegularPrice - props.totalSalePrice;
    const discountPercent = Math.floor((discount / props.totalRegularPrice) * 100)
    debugger
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

    const billing = useSelector(state => state.authentication.user.billing);
    const dispatch = useDispatch();
    // dispatch(authenticationAction.retriveShipping(user));
    //debugger
    // const dispatch = useDispatch();
    // dispatch(productAction.getById(props.cartItem.id));
    // const selectedProduct = useSelector(state => state.product.selectedProduct);

    return (
        <Grid container item direction={'column'}>
            <Box item component="h5" textAlign="center" >
                {'صورت حساب'}
            </Box>
            <Divider variant="middle" />
            {props.quantity > 1 &&
                <Box


                    color="text.secondary"
                    fontSize="1rem"
                    fontWeight="bolder"
                    padding="8px"
                    textAlign="center"
                >
                    {"قیمت کالا‌ها (" + e2p(thereDigitSepration(String(props.quantity))) + "):" + e2p(thereDigitSepration(String(props.totalRegularPrice))) + "تومان"}
                </Box>
            }
            {props.quantity === 1 &&
                <Box


                    color="text.secondary"
                    fontSize="1rem"
                    fontWeight="bolder"
                    padding="8px"
                    textAlign="center"
                >

                    {"قیمت کالا (" + e2p(thereDigitSepration(String(props.quantity))) + "):" + e2p(thereDigitSepration(String(props.totalRegularPrice))) + "تومان"}
                </Box>
            }
            {props.totalSalePrice !== props.totalRegularPrice &&
                <Box
                    color="secondary.main"
                    fontSize=".75rem"
                    fontWeight="bolder"
                    padding="8px"
                    textAlign="center"
                >
                    {"تخفیف کل (" + "%" + e2p(thereDigitSepration(String(discountPercent))) + "): " + e2p(thereDigitSepration(String(discount))) + "تومان"}
                </Box>
            }
            <Divider variant="middle" />
            <Box


                color="text.secondary"
                fontSize="1.25rem"
                fontWeight="bolder"
                padding="8px"
                textAlign="center"
            >

                {"جمع سبد خرید : " + e2p(thereDigitSepration(String(props.totalSalePrice))) + "تومان"}
            </Box>
            <Box


            color="text.secondary"
            fontSize="1rem"
            fontWeight="bolder"
            padding="8px"
            textAlign="center"
        >

            {"هزینه حمل :" + e2p(thereDigitSepration(String(props.shippingTotal))) + "تومان"}
        </Box>
            <Box display='flex' justifyContent='center'
            >

               <Link to={"/finish"}>
               <Button variant="outlined" color="primary" onClick={props.buttonClickedHandler}>
               {"پرداخت و ثبت نهایی سفارش"}
                       </Button>
               </Link>
            </Box>
        </Grid>
    )


}




export default CheckoutBill;
// <aside id="sidebar" className="col-xs-12 ">
//     <section className="group row">
//         <h2>صورت حساب</h2>
//         <div className="col-xs-12 ">
//             <article className="summary">
//                 <div><span>جمع قیمت کالاها:</span> <span>{props.total}</span></div>
//                 <div><span>تخفیف کالاها:</span><span>{props.total - props.withDiscount}</span></div>
//                 <div><span>مبلغ پرداختی:</span><span>{props.withDiscount}</span></div>
//                 <div>
//                      {!isAuthenticated &&  <Link to={{
//                         pathname: "/login",

//                         state: { forwardto: "/shipping" }
//                       }}>
//                                 <button type="button">
//                                     تکمیل فرآیند خرید
//                                 </button>
//                                 </Link> }

//                      {!!isAuthenticated && true && <Link to="/shipping">
//                                                         <button type="button">
//                                                         تکمیل فرآیند خرید
//                                                         </button>
//                                                     </Link> }


//                   {!!isAuthenticated && false  && <Link to="/shipping-address">
//                                                          <button type="button">
//                                                             تکمیل فرآیند خرید
//                                                         </button>
//                                                         </Link> }

//                 </div>



//             </article>
//         </div>

//     </section>

// </aside >