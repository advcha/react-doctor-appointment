import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  CssBaseline,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Header from '../components/Header';
import DoctorList from '../components/DoctorList';
import BookingList from '../components/BookingList';
import { fetchBookingsByClinic } from '../actions/bookingActions';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
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

const Appointment = () => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { id } = useParams();

  const [doctorSelected, setDoctorSelected] = useState('');

  const handleSearchBooking = (ids) => {
    setDoctorSelected(ids);
  }

  useState(() => {
    dispatch(fetchBookingsByClinic(id));
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
              <DoctorList 
                handleSearchBooking={handleSearchBooking}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={9}>
            <div className={classes.main}>
              <BookingList
                idClinic={id}
                doctorSelected={doctorSelected}
              />
            </div>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Appointment;
