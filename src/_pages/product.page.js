
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import CartPage from './cart.page';
import ProductItem from '../_components/ProductItem';
import { productAction, cartAction } from '../_actions'
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';
// import GetVisibleProducts from '../_selectors/products'


const ProductPage = (props) => {
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

    if (!props.products.status)
        props.dispatch(productAction.getAll());
    // const { allProducts } = props;
    // useEffect(() => {
    //     //debugger
    //     console.log("calling useeffect");

    //     //  dispatch(productAction.getAll());
    //     //  dispatchGetAllProducts();
    //     //  props.getAllProducts();
    //     props.dispatch(productAction.getAll());


    // }, []);
    // product.then(value => console.log(value ))
    // props.dispatch(productAction.getAll());


    function dispatchAddToCart(id) {
        props.addToCart(id);
    }

    function dispatchGetAllProducts() {
        props.getAllProducts();
    }


    return <div className={classes.root} style={{ padding: "12px", display: "flex", flexDirection: "column" }} >
        <Grid id="grid_container_for_allProducts" container spacing={3} justify="flex-staa">
            {props.products.products.map((product) => {
                return (

                    <Grid id="products_item" item xs={12} sm={12} md={6} lg={4}>
                        <ProductItem key={product.ID} handleOnAdd={({ id, createAt, count }) => props.dispatch(cartAction.addToCart({ id, createAt, count }))} product={product} />
                    </Grid>

                )
            })}


        </Grid>
        {props.products.category.count && <Box style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
                count={Math.trunc(props.products.category.count / 10) + 1}
                variant="outlined"
                color="primary"
                shape="rounded"
                size="large"

                defaultPage={1}
                siblingCount={0}
                boundaryCount={4}
            />
        </Box>
        }
    </div>











}



const mapDispatchToProps = dispatch => {
    console.log("calling mapDispatchToProps");
    return {

        // dispatching actions returned by action creators
        addToCart: ({ id, createAt, count }) => dispatch(cartAction.addToCart({ id, createAt, count })),
        getAllProducts: () => dispatch(productAction.getAll())

    }
}

const mapStateToProps = state => {
    //debugger


    // const { allProducts } = state.products;



    // return { allProducts };
    return {
        products: state.products
    };
};

//const ConnectedProductPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductPage));
const ConnectedProductPage = withRouter(connect(mapStateToProps)(ProductPage))
export { ConnectedProductPage as ProductPage };


