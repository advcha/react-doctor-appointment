import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  CssBaseline,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import ClinicList from '../components/ClinicList';
import { fetchClinics } from '../actions/clinicActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  title: {
    textAlign: 'left',
    fontSize: '1.5rem',
    color: 'grey',
  },
  sidebar: {
    border: 'none',
  },
  main: {
    flexGrow: 1,
    backgroundColor: 'rgb(247, 247, 247)',
    border: '1px solid rgb(247, 247, 247)',
    borderRadius: '5px',
    padding: '10px'
  }
}));

const LandingPage = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useState(() => {
    dispatch(fetchClinics());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Header userInfo={userInfo} />
      <Container component='main' maxWidth='xl'>
        <CssBaseline />
        <div className={classes.paper}>
          <Grid item xs={12} sm={6} md={3}>
            <div className={classes.sidebar}>
              <Typography variant='h6' className={classes.title}>
                Clinics
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <div className={classes.main}>
              MAIN
              <ClinicList
                open={open}
              />
            </div>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default LandingPage;
