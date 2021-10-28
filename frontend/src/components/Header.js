import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png'

import { Typography, AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
  appTitle: {
    backgroundColor: 'white',
    boxShadow: 'none',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '1.96rem',
    backgroundColor: 'white',
    color: '#28aeee',
  },
  name: {
    textAlign: 'left',
  },
}));

const Header = (userInfo) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log(userInfo);

  const signInOutHandler = (e) => {
    if (userInfo.userInfo) {
      e.preventDefault();
      dispatch(logout());
    } else {
      document.location.href = '/login';
    }
  };

  const bookingHandler = (e) => {
    document.location.href = '/booking';
  };

  return (
    <div>
      <AppBar position='static' className={classes.appTitle} style={{ marginTop: '20px' }}>
        <Toolbar>
          <Link to='/'>
          <img src={logo} height='48' className='d-inline-block align-center' alt='logo' />
          </Link>
          <Typography variant='h6' className={classes.title}>
            Doctor Appointment
          </Typography>
          {userInfo.userInfo && (
            <Button
              variant='contained'
              style={{ textAlign: 'right' }}
              onClick={bookingHandler}
            >
              Admin
            </Button>
          )}
          <Button
            variant='contained'
            style={{ textAlign: 'right' }}
            onClick={signInOutHandler}
          >
            {`${userInfo.userInfo ? 'Sign Out' : 'Sign In'
              }`}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
