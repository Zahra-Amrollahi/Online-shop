import React from 'react';

import { Redirect, Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import {authenticationAction} from '../_actions'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }
    onClickHandler() {
        //debugger
        this.props.dispatch(authenticationAction.register(this.state.email,this.state.password, this.props.history));
        //debugger
           }
    render() {
      
       
        return (
            <div>
                <h1>
                    صفحه عضویت
                </h1>
                <div>
                    <label>ایمیل</label>
                    <input type="text" name="email" onChange={this.onChangeHandler}></input>
                    <br></br>
                    <label>کلمه عبور</label>
                    <input type="password" name="password" onChange={this.onChangeHandler}></input>
                    <br></br>
                    <button onClick={this.onClickHandler}>ثبت نام</button>
                    <Link to="/login">
                        <button type="button">
                            ورود
                    </button>
                    </Link>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log("calling mapStateToProps function of register page") ;
    
    const {redirect, redirectTo} = state.authentication;
   // debugger
    return {redirect, redirectTo};
};

const ConnectedRegisterPage = withRouter(connect(mapStateToProps)(RegisterPage));
export {ConnectedRegisterPage as RegisterPage}; 
