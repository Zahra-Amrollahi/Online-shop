import React from 'react';
import { useState } from 'react'

import { Redirect, Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { authenticationAction } from '../_actions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/styles'
import RTL from '../_helper/RTL';
import Container from '@material-ui/core/Container';
import { red, yellow } from '@material-ui/core/colors';
import { FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


const emailRegex = /[-.\w]+@([\w-]+\.)+[\w-]+/g ;

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    root: {
        padding: '12px',
        direction: 'rtl',
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginRight: drawerWidth,


        },
        height: '85vh',
        display: 'flex',


        '& .MuiGrid-root': {
            // style={{ padding: "1rem", border: "2px solid black", margin: "0 auto" }} 
            
            
            margin: "auto",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding:"2rem 0"

        },
        '& .MuiTextField-root': {

            maxWidth: "400px",
            margin: theme.spacing(1)


        },
        '& .MuiInputLabel-root': {

        },
        '& .MuiOutlinedInput-input': {
            direction: 'ltr',
            fontSize: '1.5rem'
        },
        '& a:hover':{
            color:"#007bff"
        }
    }
}));

const LoginPage = (props) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState({result:false, helperText:''})
    const [password, setPassword] = useState("");
    const [enable, setEnable] = useState({email:false, password:false})

    const onEmailChangeHandler = (e) => {
        debugger
        const param = e.target.value.trim();
        const result = param.match(emailRegex);
        if (result) {
            
            setEnable({...enable,email:true })
            setError({result:false, helperText:''})
        }
        else {
            setEnable({...enable,email:false })
            setError({result:true, helperText:'آدرس پست الکترونیکی معتبر نیست.'})
        }
        setEmail(param);
    }

    const onPasswordChangeHandler = (e) => {
        debugger
        const param = e.target.value.trim();
        
        if (param) {
            
            setEnable({...enable,password:true })
            
        }
        else {
            setEnable({...enable,password:false })
            
        }
        setPassword(param);
    }

    const onClickHandler = () => {

        const forwardTo = props.location.state ? props.location.state.forwardTo : undefined
        props.dispatch(authenticationAction.login(email, password, forwardTo));
     
    }
        
        

    const classes = useStyles();

    return (

        <div className={classes.root} style={{ padding: "12px" }}>
            <Grid Container xs={12} sm={10} md={8} lg={6}>

                <TextField
                    id="email"
                    label="نشانی پست الکترونیکی"

                    placeholder="example@gmail.com"
                    type="email"
                    required 
                    error = {email && error.result}
                    helperText = {error.helperText}

                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={email}
                    onChange={(e) => onEmailChangeHandler(e)}
                    
                />
                <TextField
                    id="password"
                    label="کلمه عبور"
                    required 

                    placeholder="password"
                    type="password"

                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    value={password}
                    onChange={(e) => onPasswordChangeHandler(e)}
                />
                <Box>
                    <Button variant="outlined" size="large" 
                     disabled={!(enable.email && enable.password)}
                     onClick={() => onClickHandler()}
                     >وارد شوید</Button>
                    <Link to="/register">
                        ثبت نام کنید
                    </Link>
                   
                </Box>

            </Grid>



        </div >



        // <div className={classes.root} style={{ padding: "12px" }}>
        //     <div>
        //         <TextField required id="standard-required" label="This is label" defaultValue="Hello World" />
        //         <TextField disabled id="standard-disabled" label="Disabled" defaultValue="Hello World" />
        //         <TextField
        //             id="standard-password-input"
        //             label="Password"
        //             type="password"
        //             autoComplete="current-password"
        //         />
        //         <TextField
        //             id="standard-read-only-input"
        //             label="Read Only"
        //             defaultValue="Hello World"
        //             InputProps={{
        //                 readOnly: true,
        //             }}
        //         />
        //         <TextField
        //             id="standard-number"
        //             label="Number"
        //             type="number"
        //             InputLabelProps={{
        //                 shrink: true,
        //             }}
        //         />
        //         <TextField id="standard-search" label="Search field" type="search" />
        //         <TextField
        //             id="standard-helperText"
        //             label="Helper text"
        //             defaultValue="Default Value"
        //             helperText="Some important text"
        //         />
        //     </div>





        // </div >

    )
}


const mapStateToProps = state => {
    console.log("calling mapStateToProps function of loginPage");

    const { redirect, redirectTo } = state.authentication;
    // debugger
    return { redirect, redirectTo };
};

const ConnectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage));
export { ConnectedLoginPage as LoginPage };





// class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: '',



//         }
//         this.onChangeHandler = this.onChangeHandler.bind(this);
//         this.onClickHandler = this.onClickHandler.bind(this);
//     }
//     onChangeHandler(e) {
//         this.setState({ [e.target.name]: e.target.value })
//         console.log(this.state)
//     }
//     onClickHandler() {
//         debugger
//         const forwardTo = this.props.location.state ? this.props.location.state.forwardTo : undefined
//         this.props.dispatch(authenticationAction.login(this.state.username, this.state.password, forwardTo));
//         //   debugger

//     }
//     render() {
//         debugger
//         const { classes } = this.props;
//         return (
//             <RTL>
//                 <div className={classes.root} style={{ padding: "12px" }}>
//                     <Grid Container style={{ padding: "1rem", border: "2px solid black", margin: "0 auto" }} xs={12} sm={10} md={8} lg={6}

//                     >

//                         <TextField
//                             id="outlined-full-width"
//                             label="نشانی پست الکترونیکی"

//                             placeholder="example@gmail.com"
//                             style={{ fontSize: "2rem" }}

//                             fullWidth
//                             InputLabelProps={{
//                                 shrink: true,
//                             }}
//                             variant="outlined"
//                         />
//                         <TextField
//                             id="outlined-full-width"
//                             label="کلمه عبور"

//                             placeholder="example@gmail.com"
//                             style={{ fontSize: "2rem" }}

//                             fullWidth
//                             InputLabelProps={{
//                                 shrink: true,
//                             }}
//                             variant="outlined"
//                         />
//                         <FormControl>
//                             <InputLabel htmlFor="my-input">Email address</InputLabel>
//                             <Input id="my-input" aria-describedby="my-helper-text" />
//                             <FormHelperText id="my-helper-text">Well never share your email.</FormHelperText>
//                         </FormControl>
//                     </Grid>



//                 </div >
//             </RTL>


//         )
//     }
// }


// const mapStateToProps = state => {
//     console.log("calling mapStateToProps function of loginPage");

//     const { redirect, redirectTo } = state.authentication;
//     // debugger
//     return { redirect, redirectTo };
// };

// const ConnectedLoginPage = withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(LoginPage)));
// export { ConnectedLoginPage as LoginPage };

{/*
     <label>ایمیل</label>
                            <input type="text" name="username" onChange={this.onChangeHandler} required></input>
                        <br></br>
                        <label>کلمه عبور</label>
                        <input type="password" name="password" onChange={this.onChangeHandler} required></input>
                        <br></br>
                        <button onClick={this.onClickHandler}>ورود</button>
                        <button onClick={() => this.props.dispatch(authenticationAction.logout())}>خارج شوید</button>
                        <label>کاربر جدید هستید؟</label><Link to="/register">
                            <button type="button">
                                ثبت نام کنید
                    </button>
                        </Link>
 */}