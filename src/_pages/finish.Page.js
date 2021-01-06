
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
// import ProductListItem from '../_components/ProductListItem';
// import selectProducts from '../_selectors/products';
import { productAction } from '../_actions';
import {cartAction} from '../_actions'
// import GetVisibleProducts from '../_selectors/products'
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'


const FinishPage = (props) => {

    const e2p = (s) => {
        return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    }
    const thereDigitSepration = (n) => {
        return n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <Grid container item direction={'column'}>
            <Box item component="h5" textAlign="center" >
                {"سفارش شما با موفقیت ثبت شد"}
            </Box>
            
            
                <Box
                    color="text.secondary"
                    fontSize="1rem"
                    fontWeight="bolder"
                    padding="8px"
                    textAlign="center"
                >
                    {`کد سفارش: ${e2p(String(props.order.order.number))}`}
                </Box>
            
        
            
        </Grid>
    )

}

const mapStateToProps = state => {
    console.log("calling mapStateToProps function of finish page");
   const {order} = state;
    return {
        order
    };

   
};

export default withRouter(connect(mapStateToProps)(FinishPage));


