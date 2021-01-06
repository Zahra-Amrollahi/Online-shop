
import React from 'react';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

import { Typography } from '@material-ui/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

import { faTrashAlt} from  '@fortawesome/free-solid-svg-icons'  
import TextField from '@material-ui/core/TextField';
import { useState } from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { productAction } from '../_actions';
const e2p = (s) => {
    return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}
const p2e = (s) => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
const thereDigitSepration = (n) => {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const CartItem = (props) => {
    debugger
    const [count, setCount] = useState(e2p(String(props.cartItem.quantity)));
    // useEffect(() => {
    //     setCount(e2p(String(count)))
    //   }, [count]); // Onl
    const increment = () => {
        setCount(e2p(String(Number(p2e(count))+1)))
    }
    const decrement = () => {
        if (Number(p2e(count)) >= 2)
        setCount(e2p(String(Number(p2e(count))-1)))
    }
    // const dispatch = useDispatch();
    // dispatch(productAction.getById(props.cartItem.id));
    // const selectedProduct = useSelector(state => state.product.selectedProduct);

    return (
        <Grid container item>
            <Grid item>
                <img src={props.product[0].images[0].src} style={{maxWidth:'120px'}}></img>
            </Grid>
            <Grid item direction={'column'}>
                <Box component="h4" textAlign="center" >
                    {props.product[0].name}
                </Box>


                {props.product[0].on_sale &&

                    <Grid container item direction={'column'}>
                        <Box


                            color="success.main"
                            fontSize="1.25rem"
                            fontWeight="bolder"
                            padding="0 8px"
                        >
                            {e2p(thereDigitSepration(props.product[0]["sale_price"])) + " تومان"}
                        </Box>
                        <Box


                            color="secondary.main"
                            fontSize=".75rem"
                            fontWeight="bolder"
                            padding="0 8px"
                        >
                            {"تخفیف :" +  e2p(thereDigitSepration(String(+props.product[0]["regular_price"] - +props.product[0]["sale_price"]))) + " تومان"}
                        </Box>



                        </Grid>


                }
                
                {props.product[0].on_sale ||
                   <Grid container item direction={'flex'}>
                   <Box display="flex" style={{
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <Box


                        color="success.main"
                        fontSize="1.25rem"
                        fontWeight="bolder"
                        padding="0 8px"
                    >
                        {e2p(thereDigitSepration(props.product[0]["regular_price"])) + " تومان"}
                    </Box>
                </Box>

                   </Grid>
                   

                }
                <Grid  item >
                                <IconButton  component={Button} onClick={() => increment() } color="inherit" aria-label="menu">
                                    <FontAwesomeIcon icon={faPlus} size='0.5x'/>

                                </IconButton>
                                <TextField id="outlined-basic" value={count} variant="outlined" size="small" style={{ width: "3rem" }} />
                                <IconButton  component={Button} onClick={() => decrement()} color="inherit" aria-label="menu">
                                    <FontAwesomeIcon icon={faMinus} />
                                </IconButton>
                                <IconButton  component={Button} onClick={() => decrement()} color="inherit" aria-label="menu">
                                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => props.handleDeleteFromCart()}/>
                                </IconButton>
                                
                            </Grid>



            </Grid>

           
        </Grid >
    )

    // return (
    //     <div className='cartItem'>
    //         <div>
    //             <div>
    //                 <h5>{props.cartItem.title}Price: INR {props.cartItem.price}</h5>
    //             </div>
    //             <div>
    //                 <p>units :&nbsp;
    //                     <label > {props.cartItem.quantity} </label>
    //                     <b>{props.cartItem.id}</b>
    //                     &nbsp;
    //                     <button onClick={() => props.onAddUnit()}>+</button>
    //                     <button onClick={() => props.onDeductUnit()}>-</button>
    //                 </p>
    //             </div>
    //             <div>
    //                 <button onClick={() => props.handleDeleteFromCart()}>DEL</button>
    //             </div>
    //         </div>
    //     </div>
    // );
}


export default CartItem;