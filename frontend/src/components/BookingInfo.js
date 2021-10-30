import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
//import FileBase from 'react-file-base64';
import {
  DialogActions,
  TextField,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextareaAutosize,
  Grid,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { createBooking, updateBooking } from '../actions/bookingActions';
import { fetchDoctors } from '../actions/doctorActions';
import { fetchClinics } from '../actions/clinicActions';

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: '15px',
  },
}));

const BookingInfo = ({ open, bookingSelected, closeInfo }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  /*const initialState = {
    doctor: {_id:0},
    clinic: {_id:0},
    bookingId: '',
    bookingType: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    address: '',
    age: '',
    gender: '',
    bookingDateTime: '',
    bookingNotes: '',
  };

  const [bookingData, setBookingData] = useState(initialState);

  const bookingDetails = useSelector((state) =>
    currentId ? state.bookings.find((c) => c._id === currentId) : null
  );

  const doctors = useSelector((state) => state.doctors);
  const clinics = useSelector((state) => state.clinics);

  useEffect(() => {
    if (bookingDetails) {
      setBookingData(bookingDetails);
    } else {
      setBookingData(initialState);
    }
  }, [bookingDetails]);

  useState(() => {
    dispatch(fetchDoctors());
    dispatch(fetchClinics());
  }, [dispatch]);

  const clearData = () => {
    setBookingData(initialState);
    setCurrentId(0);
  };
  ;*/
  const handleSubmit = (e) => {
    e.preventDefault();
    closeInfo();
    /*if (currentId === 0) dispatch(createBooking(bookingData));
    else dispatch(updateBooking(currentId, bookingData));
    clearData();*/
  }

  return (
    <Dialog
      open={open}
      onClose={closeInfo}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={12} sm={6} md={4}>
            <Button className={classes.buttonInfo}>
              Confirmed
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button className={classes.buttonInfo}>
              Confirmed
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button className={classes.buttonInfo}>
              Confirmed
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {bookingSelected.firstName} <span class='patientLastName'>{bookingSelected.lastName}</span>'s {bookingSelected.bookingType}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={closeInfo}>
          Close
        </Button>
        <Button color='primary' onClick={handleSubmit}>
          Save Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingInfo;
