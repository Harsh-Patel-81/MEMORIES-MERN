import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import memories from '../../images/memories.png'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode';

const Navbar = () => {
    const classes = useStyles();
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();

    const logout =()=>{
        dispatch({type:'LOGOUT'});
       navigate('/');
       setUser(null);
    }

    useEffect(()=>{
        const token=user?.token;
        //jwt
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp*1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <Link to='/' className={classes.brandContainer}>
                <img className={classes.image} src={memories} alt='icon' height="60px"  />
                {/* <img className={classes.image} src={MemoriesLOGO} alt="icon" height="60px" /> */}
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ?(
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6' >{user.result.name}</Typography>
                        <Button className={classes.logout} color='secondary' variant='contained' onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to='/auth' color='primary' variant='contained' >Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar