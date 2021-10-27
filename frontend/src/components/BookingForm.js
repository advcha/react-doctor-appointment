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

const BookingForm = ({ currentId, setCurrentId, open, handleClose }) => {
  const dispatch = useDispatch();
  //const classes = useStyles();

  const initialState = {
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
      /*if (bookingDetails.doctor._id !== undefined && bookingDetails.clinic._id !== undefined) {
        const doctorId = bookingDetails.doctor._id;
        const clinicId = bookingDetails.clinic._id;
        bookingDetails.doctor = doctorId;
        bookingDetails.clinic = clinicId;
      }*/
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
          {`To ${currentId === 0 ? 'add' : 'update'
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
            value={bookingData.doctor._id}
            onChange={(e) =>
              setBookingData({ ...bookingData, doctor: {_id:e.target.value} })
            }
          >
            <MenuItem value={0}>Select Doctor</MenuItem>
            {doctors.map(({ _id, name }, index) => (
              <MenuItem key={index} value={_id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id='clinic-label'>Clinic</InputLabel>
          <Select
            labelId='clinic-label'
            id='clinic'
            label='Clinic'
            fullWidth
            defaultValue={0}
            value={bookingData.clinic._id}
            onChange={(e) =>
              setBookingData({ ...bookingData, clinic: {_id:e.target.value} })
            }
          >
            <MenuItem value={0}>Select Clinic</MenuItem>
            {clinics.map(({ _id, name }, index) => (
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
            <MenuItem value='Echo'>Echo</MenuItem>
            <MenuItem value='ECG'>ECG</MenuItem>
            <MenuItem value='Holter Off'>Holter Off</MenuItem>
            <MenuItem value='ABP Off'>ABP Off</MenuItem>
            <MenuItem value='CPAP Follow Up'>CPAP Follow Up</MenuItem>
            <MenuItem value='Miscellanous'>Miscellanous</MenuItem>
            <MenuItem value='Remote Follow Up'>Remote Follow Up</MenuItem>
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
        <TextField
          autoFocus
          margin='dense'
          id='age'
          label='Your Age'
          type='text'
          fullWidth
          value={bookingData.age}
          onChange={(e) =>
            setBookingData({ ...bookingData, age: e.target.value })
          }
        />
        <FormControl fullWidth>
          <InputLabel id='gender-label'>Gender</InputLabel>
          <Select
            labelId='gender-label'
            id='gender'
            label='Gender'
            fullWidth
            defaultValue={0}
            value={bookingData.gender}
            onChange={(e) =>
              setBookingData({ ...bookingData, gender: e.target.value })
            }
          >
            <MenuItem value={0}>Select Gender</MenuItem>
            <MenuItem value='Male'>Male</MenuItem>
            <MenuItem value='Female'>Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id='bookingDateTime'
            label='Next appointment'
            type='datetime-local'
            sx={{ width: 300 }}
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={
              bookingData.bookingDateTime ? moment(bookingData.bookingDateTime).format('YYYY-MM-DDTHH:mm') : moment().format('YYYY-MM-DDTHH:mm')
            }
            onChange={(e) =>
              setBookingData({ ...bookingData, bookingDateTime: e.target.value })
            }
          />
        </FormControl>
        <FormControl fullWidth>
          <TextareaAutosize
            id='bookingNotes'
            aria-label='minimum height'
            placeholder='Problem'
            defaultValue={bookingData.bookingNotes}
            onChange={(e) =>
              setBookingData({ ...bookingData, bookingNotes: e.target.value })
            }
            style={{ minHeight: 50 }}
          />
        </FormControl>
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
