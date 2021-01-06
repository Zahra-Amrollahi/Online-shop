
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { authenticationAction } from '../_actions';
import { withRouter, Link } from 'react-router-dom'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grid from '@material-ui/core/Grid';
import RTL from '../_helper/RTL';
import StepConnector from '@material-ui/core/StepConnector'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Checkout from "../_components/Checkout"
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider'

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';






const e2p = (s) => {
    return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}


function getSteps() {
    return ['اطلاعات ارسال', 'پرداخت', 'انجام خرید و ارسال'];
}



const steps = getSteps();



const drawerWidth = 240;
const styles = theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,

        },
    },
});



// const useStyles = makeStyles((theme) => ({
//     root: {
//         [theme.breakpoints.up('sm')]: {
//             width: `calc(100% - ${drawerWidth}px)`,
//             marginRight: drawerWidth,

//         },
//     },

// }));




class ShippingPage extends React.Component {
    debugger
    constructor(props) {
        console.log("calling ShippingPage constructor");
        super(props);
        this.state = {
            checkout: {}
        }
        this.calc = this.calc.bind(this);
    }



    calc() {
        const result = {
            quantity: 0,
            totalRegularPrice: 0,
            totalSalePrice: 0,

        }

        const { addedItems } = this.props.cart;
        const { products } = this.props;
        addedItems.forEach((item) => {
            let product = products.filter(product => product.id === item.id);
            result.quantity += item.quantity;
            if (product[0]["on_sale"]) {

                result.totalSalePrice += (item.quantity * product[0]["sale_price"]);
            }

            result.totalRegularPrice += (item.quantity * product[0]["regular_price"]);


        })
        this.setState({ ...this.state, checkout: result })
    }



    // componentDidMount() {
    //     if (this.props.user_positions[0] ) {
    //       this.props.dispatch(loadJobTitleSkills(this.props.user_positions[0].job_title_id));
    //     }
    //   }
    // componentWillReceiveProps(nextProps) {

    //      if (this.props.user_positions[0] !== nextProps.userPositions[0]) {
    //       this.props.dispatch(loadJobTitleSkills(this.props.user_positions[0].job_title_id));
    //     }
    // }
    componentDidMount() {
        debugger
        this.calc();
        console.log("calling ShippingPage componentDidMount");
        const { customer, user, dispatch } = this.props;
        if (!customer.status) {
            dispatch(authenticationAction.retriveCustomer(user));
        }
    }
    //     componentWillReceiveProps(nextProps) {

    //         debugger
    //         console.log("calling ShippingPage componentWillReceiveProps");
    //         const { customer, user, dispatch } = this.props;
    //         if (this.props.customer.shipping !== nextProps.customer.shipping)
    //         this.setState({...this.state, this.nextProps.tags_list });

    //    }


    // componentWillReceiveProps(nextProps){
    //     debugger
    //     console.log("calling ShippingPage shouldComponentUpdate");
    //     if (this.props.customer.shipping !== nextProps.customer.shipping) {
    //         this.setState({
    //             firstName: nextProps.customer.shipping.first_name,
    //             lastName: nextProps.customer.shipping.last_name,
    //             company: nextProps.customer.shipping.company,
    //             country: nextProps.customer.shipping.country,
    //             state: nextProps.customer.shipping.state,
    //             city: nextProps.customer.shipping.city,
    //             address1: nextProps.customer.shipping.address1,
    //             address2: nextProps.customer.shipping.address2,
    //             postcode: nextProps.customer.shipping.postcode

    //         });
    //     }

    //     return true;
    // }

    render() {
        const { classes } = this.props;
        console.log("calling ShippingPage render");


        const { customer } = this.props;

        if (!customer.shipping) {
            return (
                <h1>Loading...</h1>
            )
        }

        const { shipping } = this.props.customer
        const shipTo = `${shipping.first_name} ${shipping.last_name}`
        let shippingAddress = `${shipping.state}, ${shipping.city}, ${shipping.address_1}`
        if (shipping.address_2)
            shippingAddress += `, ${shipping.address_2}`
        shippingAddress += ` کدپستی :${shipping.postcode}`
        debugger
        return (
            <div className={classes.root} style={{ padding: "12px" }}>
                <Grid container spacing={3} direction="column" >

                    <Grid item>
                        <RTL>
                            <Stepper alternativeLabel style={{ width: '100%', backgroundColor: '#fafafa' }} connector={<StepConnector />}>
                                {steps.map((label) => (
                                    <Step key={label} >
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </RTL>
                    </Grid>

                    <div style={{ padding: "12px" }}>
                        <Grid container item spacing={3} justify={'center'}>
                            <Grid item xs={12} md={4} style={{ maxWidth: '300px' }}>
                                {this.props.cart.addedItems.length &&
                                    <Checkout
                                        quantity={this.state.checkout.quantity}
                                        totalSalePrice={this.state.checkout.totalSalePrice}
                                        totalRegularPrice={this.state.checkout.totalRegularPrice}
                                        to={"/payment"}
                                        buttonName={"ادامه فرآیند خرید"}

                                    />}
                            </Grid>
                            <Grid item xs={12} md={8} direction={'column'}>

                                <Grid item style={{ maxWidth: "250px" }}>
                                    <Box component="h5" textAlign="right" >
                                        {'مشخصات تحویل سفارش'}
                                    </Box>
                                    <Divider variant="right" />
                                </Grid>
                                <div style={{ padding: "8px" }}>
                                    <Grid container item spacing={2}>
                                        <Grid item>
                                            <FontAwesomeIcon icon={faUser} size='1.5x' />
                                        </Grid>
                                        <Grid item>
                                            <Box component="h6" textAlign="right" >
                                                {shipTo}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ padding: "8px" }}>
                                    <Grid container item spacing={2}>
                                        <Grid item>
                                            <FontAwesomeIcon icon={faMapMarkerAlt} size='1.5x' />
                                        </Grid>
                                        <Grid item>
                                            <Box component="h6" textAlign="right" >
                                                {e2p(shippingAddress)}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Grid item>
                                    <Link to="/shippingaddress">
                                        <Button variant="outlined" color="primary">
                                            ویرایش
                                      </Button>
                                    </Link>
                                </Grid>
                            </Grid>

                            <Grid item >



                            </Grid>


                        </Grid>
                    </div>

                </Grid>






            </div>

        )


    }
}


const mapStateToProps = state => {
    console.log("calling mapStateToProps function of shipping page");
    const { cart } = state;
    const { customer, user } = state.authentication;
    const { products } = state.products;
    cart.addedItems.slice(0).sort(function (a, b) {

        if (a.createAt < b.createAt)
            return -1
        if (a.createAt > b.createAt)
            return 1
        return 0
    })
    return {
        cart, products, customer, user
    };


};

export default withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(ShippingPage)));




{/*const ShippingPage = (props) => {
    debugger




    // if (!props.customer.status)

    //     props.dispatch(authenticationAction.retriveCustomer(props.user));

    //  const user = useSelector(state => state.authentication.user);
    //   alert(customer.shipping)
    //   alert(customer.shipping.first_name)
    // const { first_name, last_name, company, state, city, address_1, postcode, email, phone } = props.customer.billing
    const { shipping } = props.customer
    let [shippingAddress, setShippingAddress] = useState(`${shipping.state}, ${shipping.city}, ${shipping.address_1}`)
    if (shipping.address_2)
        shippingAddress += `, ${shipping.address_2}`
    shippingAddress += ` کدپستی :${shipping.postcode}`

    const Connector = withStyles({
        alternativeLabel: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)',
        },
        active: {
            '& $line': {
                borderColor: '#784af4',
            },
        },
        completed: {
            '& $line': {
                borderColor: '#784af4',
            },
        },
        line: {
            borderColor: '#eaeaf0',
            borderTopWidth: 3,
            borderRadius: 1,
        },
        text: {
            fontSize: '3rem'
        }
    })(StepConnector);

   

const mapStateToProps = state => {
    //debugger


    // const { allProducts } = state.products;



    // return { allProducts };
    return {
        user: state.authentication.user,
        customer: state.authentication.customer
    };
};
// function onSaveHandler(){
//     props.dispatch(authenticationAction.updateShipping(props.shipping));
// }
//

// const ConnectedShippingAddressPage = withRouter(connect(mapStateToProps)(ShippingAddressPage))
// export { ConnectedShippingAddressPage as ShippingAddressPage };
export default withRouter(connect(mapStateToProps)(ShippingPage));

*/}