
import React, { useEffect } from 'react';
import {withRouter, Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

import { Typography } from '@material-ui/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import TextField from '@material-ui/core/TextField';
import { useState } from "react";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { productAction } from '../_actions';
import {history} from '../_helper/history';
const e2p = (s) => {
    return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}
const p2e = (s) => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
const thereDigitSepration = (n) => {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const CategoryItem = (props) => {
    debugger
   

    const useStyles = makeStyles((theme) => ({

        lisItem: {
            width: '100%',
            textAlign: 'center',

        },
        listItemText: {
            typography: {

                fontSize: '1.25rem'
            },
        },
    }));

    const classes = useStyles();

    const categoryClickedHandler = ( category) => {
        
        props.dispatch(productAction.getAllByCategoryId(category));
        history.push('/product');
        props.location.pathname = "/product"

    }
    // useEffect(() => {
    //     setCount(e2p(String(count)))
    //   }, [count]); // Onl

    // const dispatch = useDispatch();
    // dispatch(productAction.getById(props.cartItem.id));
    // const selectedProduct = useSelector(state => state.product.selectedProduct);

    return (
        <ListItem id="drawer-list-item" button  className={classes.lisItem} onClick={() => categoryClickedHandler(props.category)}>

            <ListItemText className={classes.typography} id="drawer-list-item-text" primary={props.category.name + " (" + e2p(String(props.category.count)) + ") "} />
        </ListItem>
    )

}


// function mapStateToProps(state) {
//     //debugger
//     const { products } = state;
//     return dispatch;


// }


export default withRouter(connect()(CategoryItem));