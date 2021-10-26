import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import {
  DialogActions,
  TextField,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { createBooking, updateBooking } from '../actions/bookingActions';

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: '15px',
  },
}));

const BookingForm = ({ currentId, setCurrentId, open, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const initialState = {
    name: '',
    email: '',
    phoneNo1: '',
    phoneNo2: '',
    address: '',
    selectedImage: '',
  };

  const [bookingData, setBookingData] = useState(initialState);

  const bookingDetails = useSelector((state) =>
    currentId ? state.bookings.find((c) => c._id === currentId) : null
  );

  useEffect(() => {
    if (bookingDetails) setBookingData(bookingDetails);
  }, [bookingDetails]);

  const clearData = () => {
    setBookingData(initialState);
    setCurrentId(0);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    if (currentId === 0) dispatch(createBooking(bookingData));
    else dispatch(updateBooking(currentId, bookingData));
    clearData();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Booking Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To ${
            currentId === 0 ? 'add' : 'update'
          } your booking details from here`}
        </DialogContentText>

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Good Name'
          type='text'
          fullWidth
          value={bookingData.name}
          onChange={(e) =>
            setBookingData({ ...bookingData, name: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='email'
          label='Email Address'
          type='email'
          fullWidth
          value={bookingData.email}
          onChange={(e) =>
            setBookingData({ ...bookingData, email: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='phn1'
          label='Phone Number'
          type='number'
          fullWidth
          value={bookingData.phoneNo1}
          onChange={(e) =>
            setBookingData({ ...bookingData, phoneNo1: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='phn2'
          label='Alternative Phone Number'
          type='number'
          fullWidth
          value={bookingData.phoneNo2}
          onChange={(e) =>
            setBookingData({ ...bookingData, phoneNo2: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='address'
          label='Your Address'
          type='text'
          fullWidth
          value={bookingData.address}
          onChange={(e) =>
            setBookingData({ ...bookingData, address: e.target.value })
          }
        />
        <div className={classes.file}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setBookingData({ ...bookingData, selectedImage: base64 })
            }
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button color='primary' onClick={handleSubmit}>
          {`${currentId === 0 ? 'Add' : 'Update'} Booking`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingForm;
