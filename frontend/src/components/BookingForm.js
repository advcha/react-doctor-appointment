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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { createBooking, updateBooking } from '../actions/bookingActions';
import { fetchDoctors } from '../actions/doctorActions';

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: '15px',
  },
}));

const BookingForm = ({ currentId, setCurrentId, open, handleClose }) => {
  const dispatch = useDispatch();
  //const classes = useStyles();

  const initialState = {
    doctor: 0,
    clinic: 0,
    bookingId: '',
    bookingType: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNo: '',
    address: '',
  };

  const [bookingData, setBookingData] = useState(initialState);

  const bookingDetails = useSelector((state) =>
    currentId ? state.bookings.find((c) => c._id === currentId) : null
  );

  useEffect(() => {
    if (bookingDetails) {setBookingData(bookingDetails);}else{setBookingData(initialState);}
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

  const doctors = useSelector((state) => state.doctors);
  console.log(doctors);

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

        <FormControl fullWidth>
          <InputLabel id='doctor-label'>Doctor</InputLabel>  
          <Select 
            labelId='doctor-label'
            id='doctor'
            label='Doctor'
            fullWidth
            defaultValue={0}
            value={bookingData.doctor}
            onChange={(e) =>
              setBookingData({ ...bookingData, doctor: e.target.value })
            }
          >
            <MenuItem value={0}>Select Doctor</MenuItem>  
            {doctors.map(({_id, name}, index) => (
              <MenuItem key={index} value={_id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            autoFocus
            margin='dense'
            id='bookingId'
            label='Booking ID'
            type='text'
            fullWidth
            value={bookingData.bookingId}
            onChange={(e) =>
              setBookingData({ ...bookingData, bookingId: e.target.value })
            }
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='booking-type-label'>Booking Type</InputLabel>
          <Select 
            labelId='booking-type-label'
            id='bookingType'
            label='Booking Type'
            fullWidth
            defaultValue={0}
            value={bookingData.bookingType}
            onChange={(e) =>
              setBookingData({ ...bookingData, bookingType: e.target.value })
            }
          >
            <MenuItem value={0}>Select Booking Type</MenuItem>  
            <MenuItem value={1}>Echo</MenuItem>  
            <MenuItem value={2}>ECG</MenuItem>  
            <MenuItem value={3}>Holter Off</MenuItem> 
            <MenuItem value={4}>ABP Off</MenuItem> 
            <MenuItem value={5}>CPAP Follow Up</MenuItem> 
            <MenuItem value={6}>Miscellanous</MenuItem> 
            <MenuItem value={7}>Remote Follow Up</MenuItem> 
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin='dense'
          id='firstName'
          label='First Name'
          type='text'
          fullWidth
          value={bookingData.firstName}
          onChange={(e) =>
            setBookingData({ ...bookingData, firstName: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='lastName'
          label='Last Name'
          type='text'
          fullWidth
          value={bookingData.lastName}
          onChange={(e) =>
            setBookingData({ ...bookingData, lastName: e.target.value })
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
          id='phoneNo'
          label='Phone Number'
          type='number'
          fullWidth
          value={bookingData.phoneNo}
          onChange={(e) =>
            setBookingData({ ...bookingData, phoneNo: e.target.value })
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
