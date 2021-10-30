import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, IconButton, Grid, CardHeader, CardContent, Typography, Toolbar, Select, MenuItem, InputLabel, FormControl, } from '@material-ui/core';
import { Call } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../actions/doctorActions';
import { fetchClinics } from '../actions/clinicActions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  clinicImage: {
    textAlign: 'center'
  },
  bookingGridItem: {
    width: '100%',
  },
  bookingCard: {
    boxShadow: 'none',
    border: '1px solid rgb(239, 239, 239)',
    borderRadius: '10px',
    backgroundColor: 'white',
    padding: '0'
  },
  bookingText: {
    textAlign: 'left',
    fontSize: '0.9rem',
    color: 'rgb(14, 139, 181)',
    fontWeight: 'normal',
  },
  cardHeader: {
    padding: '5px',
  },
  cardHeaderTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  cardHeaderSubHeader: {
    fontSize: '14px',
    fontWeight: 'normal',
  },
  bookingContent: {
    padding: '5px',
    '&:last-child': {
      paddingBottom: 5,
    },
  },
  icon: {
    fontSize: '12px',
    marginRight: '5px'
  },
  gridButton: {
    textAlign: 'right',
  },
  buttonInfo: {
    backgroundColor: 'rgb(24, 186, 240)',
    fontSize: '12px',
    fontWeight: 'normal',
    padding: '2px 5px',
    borderRadius: '10px',
    color: '#ffffff',
    textTransform: 'none',
  },
}));

const BookingCard = ({ booking, openInfo, setBookingSelected, gridKey }) => {
  const classes = useStyles();

  /*const openInfo = () => {
    //e.preventDefault();
    //document.location.href = '/appointment/' + id;
    alert(booking._id);
  };*/

  return (
    <>
      <Grid item className={classes.bookingGridItem}>
        <Card className={classes.bookingCard}>
          <CardHeader 
            className={classes.cardHeader}
            title={
              booking.firstName + ' ' + booking.lastName + ' - ' + booking.bookingId
            }
            subheader={`Booking : ${booking.bookingType}`}
            classes={{
              title: classes.cardHeaderTitle,
              subheader: classes.cardHeaderSubHeader,
            }} 
          />
          <CardContent className={classes.bookingContent}>
            <Typography variant='h6' className={classes.bookingText}>
              Doctor: {booking.doctor.name}
            </Typography>
            <Grid
              container
              spacing={2}
              direction='row'
              justify='flex-start'
              alignItems='flex-start'
            >
              <Grid item xs={12} sm={12} md={6}>
                <Typography variant='h6' className={classes.bookingText}>
                  <Call className={classes.icon} />{booking.phoneNo}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} className={classes.gridButton}>
                <Button className={classes.buttonInfo} onClick={() => {
                  setBookingSelected(booking);
                  openInfo();
                }}>
                  Patient Info
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default BookingCard;
