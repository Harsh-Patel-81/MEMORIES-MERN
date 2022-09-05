import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
//import { GoogleLogin } from 'react-google-login'
import React, { useState } from 'react';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './Input';
import validator from 'validator'

//import Icon from './icon'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [emailError, setEmailError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword(!showPassword);//(prevShowPassword) => !prevShowPassword

    // every time we have to add e.preventDefault() bcs every time when form is submitted, webpage automatically refresh.
    const handleSubmit = (e) => {
        e.preventDefault();
        var email = formData.email;//
        if (validator.isEmail(email)) {
            if (isSignUp) {
                dispatch(signup(formData, navigate))// jyare signup thay tyare kyak redirect karva mate
            } else {
                dispatch(signin(formData, navigate));
            }
        } else {
            setEmailError('Enter valid Email!');
        }
        // if (isSignUp) {
        //     dispatch(signup(formData, navigate))// jyare signup thay tyare kyak redirect karva mate
        // } else {
        //     dispatch(signin(formData, navigate));
        // }
    }

    const handleChange = (e) => {


        setFormData({ ...formData, [e.target.name]: e.target.value })// [e.target.name]:e.target.vlue etla mate ke initialState  ma rahela name sathe match thay and ema e.target.value assign kare

    }// best way to set all fields in formData



    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }
    //?. ey etle lakhyu ke amuk vakhte res object nai hoy to tyare error na aape etle
    // const googleSuccess = async (res) => {
    //     //console.log(res);
    //     const result =res?.profileObj;
    //     const token =res?.tokenId;

    //     try {
    //         dispatch({type :'AUTH', data:{result,token}})
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    //"details: "Not a valid origin for the client: http://localhost:3000 has not been registered for client ID 52504712414-sh8uofv8slqlvcn01vf7h48ehsrqrihp.apps.googleusercontent.com. Please go to https://console.developers.google.com/ and register this origin for your project's client ID."
    //error: "idpiframe_initialization_failed"
    //details: "You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information."
    //error: "idpiframe_initialization_failed"
    // const googleFailure = (error) => {
    //     console.log(error);
    //     console.log('Google Sign In was unsuccesfull, try again later');
    // }

    return (
        <div>
            <Container component='main' maxWidth='xs'>
                <Paper className={classes.paper} elavation={3}>
                    <Avatar className={classes.avatar} >
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography variant='h5' >{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {isSignUp && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )}
                            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                            {emailError && (<span style={{
                                fontWeight: 'bold',
                                color: 'red',
                                marginLeft:'auto'
                            }}>{emailError}</span>)}
                            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                            {isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password' />}
                        </Grid>
                        <Button color='primary' variant='contained' fullWidth type='submit' className={classes.submit} >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        {/* <GoogleLogin
                            clientId='182824310186-fr1oeambek2loho90ekme2c6ojjokh3a.apps.googleusercontent.com'
                            render={(renderProps) => (
                                <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={'single_host_origin'}
                        /> */}

                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Button onClick={switchMode}>
                                    {isSignUp ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

            </Container>
        </div>
    )
}

export default Auth