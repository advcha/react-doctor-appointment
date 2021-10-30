import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, IconButton, Grid, CardHeader, CardContent, Typography, Toolbar, Select, MenuItem, InputLabel, FormControl, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import BookingCard from '../components/BookingCard';
import BookingInfo from '../components/BookingInfo';
import { fetchDoctors } from '../actions/doctorActions';
import { fetchClinics } from '../actions/clinicActions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  clinicImage: {
    textAlign: 'center'
  },
  appointmentGrid: {
    border: '1px solid rgb(239, 239, 239)',
    borderRadius: '10px',
    backgroundColor: 'white',
    padding: '8px'
  },
  appointmentText: {
    textAlign: 'center',
    fontSize: '1.0rem',
    margin: '10px 0',
  }
}));

const BookingList = ({ idClinic }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [bookingSelected, setBookingSelected] = useState([]);

  const bookings = useSelector((state) => state.bookings);
  const doctors = useSelector((state) => state.doctors);
  const clinics = useSelector((state) => state.clinics);

  const openInfo = () => {
    setOpen(true);
  };

  const closeInfo = () => {
    setOpen(false);
  };

  const bookingTwoDaysAfter = bookings.filter(b=>(moment(b.bookingDateTime).format('MM/DD/YYYYT') == moment().add(2,'days').format('MM/DD/YYYYT')));
  const bookingTomorrow = bookings.filter(b=>(moment(b.bookingDateTime).format('MM/DD/YYYYT') == moment().add(1,'days').format('MM/DD/YYYYT')));
  const bookingToday = bookings.filter(b=>(moment(b.bookingDateTime).format('MM/DD/YYYYT') == moment().format('MM/DD/YYYYT')));

  /*const goToAppointment = (e, id) => {
    e.preventDefault();
    document.location.href = '/appointment/' + id;
  };*/

  const goToClinic = (e, id) => {
    e.preventDefault();
    document.location.href = '/appointment/' + id;
  };

  useState(() => {
    dispatch(fetchDoctors());
    dispatch(fetchClinics());
  }, [dispatch]);

  return (
    <>
      <Toolbar>
        <FormControl fullWidth>
          <InputLabel id='clinic-label'>Clinic</InputLabel>
          <Select
            labelId='clinic-label'
            id='clinic'
            label='Clinic'
            defaultValue={0}
            value={idClinic}
            onChange={(e) =>
              goToClinic(e, e.target.value)
            }
          >
            {clinics.map(({ _id, name }, index) => (
              <MenuItem key={index} value={_id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Toolbar>
      <BookingInfo
        open={open}
        bookingSelected={bookingSelected}
        closeInfo={closeInfo}
      />
      <Grid
        container
        spacing={2}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
      >
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.appointmentGrid}>
            <Typography variant='h6' className={classes.appointmentText}>
              Appointment in 2 days
            </Typography>
            <Grid
              container
              spacing={2}
              direction='column'
              justify='flex-start'
              alignItems='flex-start'
            >
              {bookingTwoDaysAfter.map(b => (
                <BookingCard 
                  booking={b} 
                  openInfo={openInfo}
                  closeInfo={closeInfo}
                  setBookingSelected={setBookingSelected}
                  key={bookingTwoDaysAfter.indexOf(b)}
                />
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.appointmentGrid}>
            <Typography variant='h6' className={classes.appointmentText}>
              Appointment Tomorrow
            </Typography>
            <Grid
              container
              spacing={2}
              direction='column'
              justify='flex-start'
              alignItems='flex-start'
            >
              {bookingTomorrow.map(b => (
                <BookingCard 
                  booking={b} 
                  openInfo={openInfo}
                  setBookingSelected={setBookingSelected}
                  key={bookingTomorrow.indexOf(b)}
                />
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.appointmentGrid}>
            <Typography variant='h6' className={classes.appointmentText}>
              Appointment Today
            </Typography>
            <Grid
              container
              spacing={2}
              direction='column'
              justify='flex-start'
              alignItems='flex-start'
            >
              {bookingToday.map(b => (
                <BookingCard 
                  booking={b} 
                  openInfo={openInfo}
                  setBookingSelected={setBookingSelected}
                  key={bookingToday.indexOf(b)}
                />
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default BookingList;
