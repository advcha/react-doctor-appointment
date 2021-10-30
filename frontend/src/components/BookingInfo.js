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
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { ChatBubbleOutline, Telegram } from '@material-ui/icons';
import { createBooking, updateBooking } from '../actions/bookingActions';
import { fetchDoctors } from '../actions/doctorActions';
import { fetchClinics } from '../actions/clinicActions';

const useStyles = makeStyles((theme) => ({
  dialog: {
    width: '900px',
    maxWidth: '900px',
  },
  patientName: {
    fontSize: '24px',
    fontWeight: '700',
  },
  doctorName: {
    fontSize: '16px',
    fontWeight: 'normal',
  },
  gridContent: {
    border: '1px solid rgb(239, 239, 239)',
    borderRadius: '10px',
    padding: '8px',
    marginTop: '10px',
  },
  infoText: {
    fontSize: '14px',
    fontWeight: 'normal',
    color: 'rgb(194, 194, 194)',
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'rgb(24, 186, 240)',
    borderRadius: '10px',
    textAlign: 'center',
  },
  infoValue1: {
    display: 'inline-block',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'rgb(24, 186, 240)',
    borderRadius: '10px',
    textAlign: 'center',
    width: '50%',
  },
  buttonDownload: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: 'rgb(24, 186, 240)',
    borderRadius: '10px',
    textAlign: 'center',
    textTransform: 'none',
  },
  commentText: {
    alignItems: 'flex-start',
  },
  commentBox: {
    backgroundColor: 'rgb(194, 194, 194)',
    borderRadius: '10px',
    alignItems: 'middle',
  },
  commentButton: {
    backgroundColor: 'rgb(24, 186, 240)',
    color: '#ffffff',
    borderRadius: '20px',
    alignItems: 'middle',
    padding: '2px 3px 2px 1px',
  }
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
          <Typography className={classes.patientName}>
            {bookingSelected.firstName} <span class='patientLastName'>{bookingSelected.lastName}</span>'s {bookingSelected.bookingType}
          </Typography>
          <Typography className={classes.doctorName}>
            {bookingSelected.doctor ? bookingSelected.doctor.name : ''}
          </Typography>
          <Grid
            container
            spacing={2}
            direction='row'
            justify='flex-start'
            alignItems='flex-start'
            className={classes.gridContent}
          >
            <Grid item xs={12} sm={6} md={8}>
              <Typography className={classes.infoText}>
                Booking Type
              </Typography>
              <Typography className={classes.infoValue}>
                {bookingSelected.bookingType}
              </Typography>
              <Typography className={classes.infoText}>
                Booking Date/Time
              </Typography>
              <Typography className={classes.infoValue1}>
                {moment(bookingSelected.bookingDateTime).format('MM/DD/YYYY')}
              </Typography>
              <Typography className={classes.infoValue1}>
                {moment(bookingSelected.bookingDateTime).format('HH:mm')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button className={classes.buttonDownload}>
                Download Patient Info Form
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            direction='row'
            justify='flex-start'
            alignItems='flex-start'
            className={classes.gridContent}
          >
            <Grid item xs={12} sm={12} md={12} className={classes.commentText}>
              <Typography className={classes.infoText}>
                <ChatBubbleOutline /> Comment
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} className={classes.commentBox}>
              <TextareaAutosize
                aria-label='minimum height'
                placeholder='Write a comment'
                style={{ minHeight: 50, width: '85%' }}
              />
              <Telegram className={classes.commentButton} />
            </Grid>
          </Grid>
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
