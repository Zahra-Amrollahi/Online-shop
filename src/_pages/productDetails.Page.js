

import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { productAction, cartAction } from '../_actions';

import Carousel from 'react-material-ui-carousel'
import { Paper } from '@material-ui/core'
import { Button } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';

import { Typography } from '@material-ui/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faCart } from '@fortawesome/fontawesome-svg-core'
import TextField from '@material-ui/core/TextField';



//<a  className="buy" onClick={() => this.props.handleOnAdd(this.props.product)}>افزودن به سبد خرید</a>
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({


    
    root: {

        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,

        },
        justifyContent: 'flex-start'
    },
    image: {
        position: 'relative',
        height: 200,

        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

const ProductDetailsPage = (props) => {

    const e2p = (s) => {
        return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
    }
    const p2e = (s) => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))


    debugger
    const [index, setIndex] = useState(0);
    // const [addedToCart, setAddedToCart] = useState(false);
    // useEffect(() => {
    //     debugger
    //     const result = props.cart.addedItems.filter((item) => item.id === props.history.location.state.product.id);
    //     if (result.length)
    //         setAddedToCart(true);
    //         else setAddedToCart(false);
    // }); // Onl
    const [count, setCount] = useState(e2p("0"));
    useEffect(() => {
        debugger
        const result = props.cart.addedItems.filter((item) => item.id === props.history.location.state.product.id);
        if (result.length)
        setCount(props.cart.addedItems.filter((item) => item.id === props.history.location.state.product.id)[0].quantity)
        else setCount(e2p("0"));
    }); // Onl
    

    function handleAddToCart(id, createAt, props) {
        
        props.addToCart({id, createAt});
    }
    function handleAddUnit(id, props) {
        debugger
        if (count > 1)
        props.updateQuantity({ id, quantity:1 })
        else props.addToCart({id, createAt:new Date().getTime()});
    }
    function handleDeductUnit(id, props) {
        if (count > 0)
        props.updateQuantity({ id, quantity:-1 })
        else props.removeFromCart({ id })
    }
    function handleRemoveFromCart(id, props) {
        //debugger
        props.removeFromCart({ id })
    }
    const classes = useStyles();
    debugger
    const { product, prp, psp } = props.history.location.state
    const dispatch = useDispatch();
    // dispatch(productAction.getById(Number(props.match.params.id)));
    // const selectedProduct = useSelector(state => state.product.selectedProduct);
    // console.log(selectedProduct);

    return (
        <div className={classes.root} style={{ padding: "12px" }} >
            <Grid container spacing={3} sm={12}>
                <Grid container item xs={12} sm={9} lg={4}  >
                    <Carousel
                        autoPlay={false} indicators={false}
                        index={index}
                    >

                        {
                            product.images.map((item) => (
                                <Paper>
                                    <img key={item.id} src={item.src} style={{ maxWidth: "100%" }}></img>
                                </Paper>
                            )

                            )
                        }
                    </Carousel>

                </Grid>
                <Grid container item className={classes.root} sm={3} direction-sm-column order={-1}>
                    {
                        product.images.map((img, index) => (


                            <ButtonBase

                                focusRipple
                                key={img.id}
                                className={classes.image}
                                focusVisibleClassName={classes.focusVisible}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    margin: '0 5px'
                                }}
                                onClick={() => setIndex(index)}
                            >
                                <span
                                    className={classes.imageSrc}
                                    style={{
                                        backgroundImage: `url(${img.src})`,
                                    }}
                                />
                            </ButtonBase>

                        )

                        )
                    }
                </Grid>
                <Grid container item direction={'column'} justifyContent={'center'}>
                    <Grid item >
                        <Box component="h4" textAlign="center" >
                            {product.name}
                        </Box>
                    </Grid>
                    <Grid container item style={{ justifyContent: 'space-evenly' }}>


                        {product.on_sale &&
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
                                    {psp + " تومان"}
                                </Box>
                                <Box


                                    color="text.disabled"
                                    fontSize="1rem"
                                    padding="0 8px"
                                >
                                    <del>{prp + " تومان"}</del>
                                </Box>

                            </Box>


                        }
                        {product.on_sale ||
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
                                    {prp + " تومان"}
                                </Box>
                            </Box>


                        }



                        <Grid item flexDirection={'column'}>
                            <Grid container item >
                                <IconButton className={classes.menuButton} component={Button} onClick={() => handleAddUnit(product.id, props)} color="inherit" aria-label="menu">
                                    <FontAwesomeIcon icon={faPlus} size='0.5x' />

                                </IconButton>
                                <TextField id="outlined-basic" value={count} variant="outlined" size="small" style={{ width: "3rem" }} />
                                <IconButton className={classes.menuButton} component={Button} onClick={() => handleDeductUnit(product.id, props)} color="inherit" aria-label="menu">
                                    <FontAwesomeIcon icon={faMinus} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                {count > 0 || <Button variant="outlined" color="success.main" onClick={() => handleAddToCart(product.id, new Date().getTime(), props)}>
                                    افزودن به سبد خرید
                                                </Button>
                                }
                                {count > 0 && <Button variant="outlined" color="success.main" onClick={() => handleRemoveFromCart(product.id, props)}>
                                    حذف
                                            </Button>
                                }

                            </Grid>
                        </Grid>
                    </Grid>


                </Grid>





                <Grid container item xs={12} style={{ padding: "16px" }} >
                    <Typography variant="subtitle1" gutterBottom>
                        <Box item textAlign="justify" >
                            {product.description}
                        </Box>
                    </Typography>

                </Grid>
            </Grid>

        </div>

    )
}
function mapStateToProps(state) {
    //debugger
    const { cart } = state;



    return {
        cart
    };


}
function mapActionsToProps(dispatch) {
    return {
        addToCart: ({ id, createAt  }) => dispatch(cartAction.addToCart({ id, createAt })),
        removeFromCart: ({ id, quantity }) => dispatch(cartAction.removeFromCart({ id, quantity })),
        updateQuantity: ({ id, quantity }) => dispatch(cartAction.updateQuantity({ id, quantity })),


    }
}

export default connect(mapStateToProps, mapActionsToProps)(ProductDetailsPage);

//export default withRouter(ProductDetailsPage)
/*
<button type="button" onClick={() => dispatch(cartAction.addToCart({ id: product.id }))}>
            Add To Cart
               </button>*/

