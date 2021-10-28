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
import { createClinic, updateClinic } from '../actions/clinicActions';

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: '15px',
  },
}));

const ClinicForm = ({ currentId, setCurrentId, open, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const initialState = {
    name: '',
    email: '',
    phoneNo1: '',
    phoneNo2: '',
    address: '',
    selectedImage: '',
    bookingInterval: '0',
  };

  const [clinicData, setClinicData] = useState(initialState);
  
  const clinicDetails = useSelector((state) =>
    currentId ? state.clinics.find((c) => c._id === currentId) : null
  );


  useEffect(() => {
    if (clinicDetails){setClinicData(clinicDetails);}else{setClinicData(initialState);}
  }, [clinicDetails]);

  const clearData = () => {
    setClinicData(initialState);
    setCurrentId(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    if (currentId === 0) dispatch(createClinic(clinicData));
    else dispatch(updateClinic(currentId, clinicData));
    clearData();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Clinic Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To ${
            currentId === 0 ? 'add' : 'update'
          } clinic details from here`}
        </DialogContentText>

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Clinic Name'
          type='text'
          fullWidth
          value={clinicData.name}
          onChange={(e) =>
            setClinicData({ ...clinicData, name: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='email'
          label='Email Address'
          type='email'
          fullWidth
          value={clinicData.email}
          onChange={(e) =>
            setClinicData({ ...clinicData, email: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='phn1'
          label='Phone Number'
          type='number'
          fullWidth
          value={clinicData.phoneNo1}
          onChange={(e) =>
            setClinicData({ ...clinicData, phoneNo1: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='phn2'
          label='Alternative Phone Number'
          type='number'
          fullWidth
          value={clinicData.phoneNo2}
          onChange={(e) =>
            setClinicData({ ...clinicData, phoneNo2: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='address'
          label='Clinic Address'
          type='text'
          fullWidth
          value={clinicData.address}
          onChange={(e) =>
            setClinicData({ ...clinicData, address: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='bookingInterval'
          label='Booking Interval (minutes)'
          type='text'
          fullWidth
          value={clinicData.bookingInterval}
          onChange={(e) =>
            setClinicData({ ...clinicData, bookingInterval: e.target.value })
          }
        />
        <div className={classes.file}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
            setClinicData({ ...clinicData, selectedImage: base64 })
            }
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button color='primary' onClick={handleSubmit}>
          {`${currentId === 0 ? 'Add' : 'Update'} Data`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClinicForm;
