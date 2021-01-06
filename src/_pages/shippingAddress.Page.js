
import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { authenticationAction } from '../_actions';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import RTL from '../_helper/RTL';
import {history} from '../_helper/history';


const e2p = (s)=> {
    return s.replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[d])
}

// const [checkout, setCheckout] = useState(calc())

    


//     useEffect(() => {

//         setCheckout(calc());
//     }, [props.cart.addedItems])

class ShippingAddressPage extends React.Component {
    debugger
    constructor(props) {
        console.log("calling ShippingPage constructor");
        super(props);
        const {shipping} = this.props.customer;
        this.state = {
            firstName: shipping.first_name,
            lastName: shipping.last_name,
            company: shipping.company,
            state: shipping.state,
            city: shipping.city,
            address1: shipping.address_1,
            address2: shipping.address_2,
            postcode: shipping.postcode,
           
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onButtonHandler = this.onButtonHandler.bind(this);
        


    }
    
    
    componentDidMount() {
        debugger
        
        console.log("calling ShippingPage componentDidMount");
        const { customer, user, dispatch } = this.props;
        if (!customer.status)
        {
            dispatch(authenticationAction.retriveCustomer(user)); 
        }
    }

    onChangeHandler(e) {
        debugger
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })

    }

    onSubmitHandler(e) {
        e.preventDefault();
    }
    

    onButtonHandler(e){
        const shipping = this.state;
        debugger
        const data = {
            shipping: {
                first_name: shipping.firstName,
                last_name: shipping.lastName,
                company: shipping.company,
                state: shipping.state,
                city: shipping.city,
                address_1: shipping.address1,
                address_2: shipping.address2,
                postcode: shipping.postcode
            }

        }
        e.preventDefault();
        const forwardTo = "/shipping"
        this.props.dispatch(authenticationAction.updateCustomer(this.props.user, data, forwardTo  ));
        this.props.dispatch(authenticationAction.retriveCustomer(this.props.user));
        history.goBack();
        
    }
    
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
        console.log("calling ShippingPage render");
        debugger
        const { customer } = this.props;

        if (!customer.shipping) {
            return (
                <h1>Loading...</h1>
            )
        }

        return (<RTL>
            <div style={{ padding: "12px" }}>
                <Grid container direction='column' justify="space-between" spacing={3} alignItems="center" style={{ padding: "40px 20px" }}>

                    <Grid container item spacing={3} style={{ padding: "10px 20px " }}>
                        <Grid item xs='12' >
                            <Typography variant="h6">آدرس تحویل سفارش</Typography>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3} style={{ padding: "10px 20px " }}>
                        <Grid item xs='12' sm='6' md='4' lg='4'>
                            <TextField required  style={{ maxWidth: "300px" }} label="نام" fullWidth name="firstName" defaultValue={this.state.firstName} onChange={this.onChangeHandler} />
                        </Grid>
                        <Grid item xs='12' sm='6' md='4' lg='4'>
                            <TextField required  label="نام خانوادگی" style={{ maxWidth: "300px" }} name="lastName" fullWidth defaultValue={this.state.lastName} onChange={this.onChangeHandler} />
                        </Grid>
                        <Grid item xs='12' sm='6' md='4' lg='4'>
                            <TextField  label="شرکت" style={{ maxWidth: "300px" }} name="company" fullWidth defaultValue={this.state.company} onChange={this.onChangeHandler} />
                        </Grid>
                    </Grid>


                    <Grid container item spacing={3} style={{ padding: "10px 20px " }}>
                        <Grid item xs='12' sm='6'  md='4'>
                            <TextField required  label="استان" style={{ maxWidth: "300px" }} name="state"fullWidth defaultValue={this.state.state} onChange={this.onChangeHandler} />
                        </Grid>
                        <Grid item xs='12' sm='6' md='4'>
                            <TextField required  label="شهر" style={{ maxWidth: "300px" }} name="city" fullWidth defaultValue={this.state.city} onChange={this.onChangeHandler} />
                        </Grid>
                    </Grid>
                    <Grid container item spacing={3} style={{ padding: "10px 20px " }}>
                        <Grid item xs='12' sm='6' md="5">
                            <TextField required  label="آدرس" name="address1" fullWidth defaultValue={e2p(this.state.address1)}  onChange={this.onChangeHandler}/>
                        </Grid>
                        <Grid item xs='12' sm='6' md="5">
                            <TextField  label="آدرس" name="address2" fullWidth defaultValue={e2p(this.state.address2)} onChange={this.onChangeHandler} />
                        </Grid>
                        <Grid item xs='12' sm='6' md="2">
                            <TextField required  label="کدپستی" name="postcode" defaultValue={e2p(this.state.postcode)} onChange={this.onChangeHandler}/>
                        </Grid>
                    </Grid>
                        
                        <Link to="/shipping">
                        <Button variant="outlined" onClick={this.onButtonHandler} color="primary">
                            ذخیره و ادامه فرآیند خرید
                    </Button>
             
            
                    </Link>
                    <Link to="/shippingaddress">
                
                    انصراف
        
                        </Link>
                      
                    
                    <Grid item >
    
    
    
                    </Grid>
    
    
                </Grid>
    
           
    
    
    
    
        </div>
            </RTL>

        )
    }
}

const mapStateToProps = state => {
    console.log("calling mapStateToProps function of shipping page");
    const { customer, user } = state.authentication;
    // debugger
    return { customer, user };
    
};

export default withRouter(connect(mapStateToProps)(ShippingAddressPage));


    // useEffect(() => {
    //     debugger
    //     console.log("calling useeffect");





    //         dispatch(authenticationAction.retriveCustomer(user));

    //   }, []);


    // }





