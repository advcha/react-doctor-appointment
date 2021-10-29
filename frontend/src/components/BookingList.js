import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, IconButton, Grid, CardHeader, CardContent, Typography, Toolbar, Select, MenuItem, InputLabel, FormControl, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
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
  }
}));

const BookingList = ({ idClinic }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const bookings = useSelector((state) => state.bookings);
  const doctors = useSelector((state) => state.doctors);
  const clinics = useSelector((state) => state.clinics);

  const goToAppointment = (e, id) => {
    e.preventDefault();
    document.location.href = '/appointment/' + id;
  };

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
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.appointmentGrid}>
            <Typography variant='h6' className={classes.appointmentText}>
              Appointment Tomorrow
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.appointmentGrid}>
            <Typography variant='h6' className={classes.appointmentText}>
              Appointment Today
            </Typography>
          </div>
        </Grid>
        {bookings.map(b => (
          <Grid item xs={12} sm={6} md={4} key={bookings.indexOf(b)}>
            <Card>
              <CardHeader
                title={
                  <Link
                    to='#'
                    variant='body2'
                    onClick={(e) => {
                      goToAppointment(e, b._id);
                    }}
                    key={bookings.indexOf(b)}
                  >
                    {b.firstName + ' ' + b.lastName}
                  </Link>
                }
                subheader={`phone : ${b.phoneNo}`}
              />
              <CardContent className={classes.clinicImage}>
                <Link
                  to='#'
                  variant='body2'
                  onClick={(e) => {
                    goToAppointment(e, b._id);
                  }}
                  key={bookings.indexOf(b)}
                >
                  {moment(b.bookingDateTime).format('MM/DD/YYYY HH:mm')}
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BookingList;
