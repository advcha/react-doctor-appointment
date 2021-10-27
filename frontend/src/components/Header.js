import React from 'react';
import logo from '../logo.png'

import { Typography, AppBar, Toolbar, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
  appTitle: {
    backgroundColor: 'white',
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

  const logoutHandler = (e) => {
    e.preventDefault();
    console.log('Ok');
    dispatch(logout());
  };

  return (
    <div>
      <AppBar position='static' className={classes.appTitle} style={{ marginTop: '20px' }}>
        <Toolbar>
          <img src={logo} height="48" className="d-inline-block align-center" alt="logo" />
          {/*userInfo.userInfo && (
            <Typography variant='h6' className={classes.name}>
              {`Hello, ${userInfo.userInfo.firstName} ${userInfo.userInfo.lastName}`}
            </Typography>
          )*/}
          <Typography variant='h6' className={classes.title}>
            Doctor Appointment/Booking
          </Typography>
          {userInfo.userInfo && (
            <Button
              variant='contained'
              style={{ textAlign: 'right' }}
              onClick={logoutHandler}
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
