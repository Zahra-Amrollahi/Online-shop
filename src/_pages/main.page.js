import React from 'react';

import { Redirect, Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import {authenticationAction} from '../_actions'

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            
            
            
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value })
        console.log(this.state)
    }
    onClickHandler(e) {
       e.preventDefault();
      //  debugger
        this.props.dispatch(authenticationAction.login(this.state.email,this.state.password, this.props.history));
     //   debugger
       
    }
    render() {
       // debugger
      
        return (
            <div>
                <h1>
                    ورود به فروشگاه آنلاین
                </h1>
                <div>
                    <label>ایمیل</label>
                    <input type="text" name="email" onChange={this.onChangeHandler} required></input>
                    <br></br>
                    <label>کلمه عبور</label>
                    <input type="password" name="password" onChange={this.onChangeHandler} required></input>
                    <br></br>
                    <button onClick={this.onClickHandler}>Login</button>
                    <label>کاربر جدید هستید؟</label><Link to="/register">
                        <button type="button">
                            ثبت نام کنید
                    </button>
                    </Link>
                </div>
            </div>
        )
    }
}



export  default connect()(MainPage) ;


