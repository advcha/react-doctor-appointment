import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, IconButton, Grid, CardHeader, CardContent, Typography, Toolbar, Select, MenuItem, InputLabel, FormControl, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../actions/doctorActions';
import { fetchClinics } from '../actions/clinicActions';

const useStyles = makeStyles((theme) => ({
  clinicImage: {
    textAlign: 'center'
  },
}));

const BookingList = ({ idClinic }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  console.log(idClinic);

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
        {bookings.map(b => (
          <Grid item xs={12} sm={6} md={3} key={bookings.indexOf(b)}>
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
                    {b.firstName}
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
                  {b.lastName}
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
