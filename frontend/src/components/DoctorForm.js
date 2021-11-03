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
import { createDoctor, updateDoctor } from '../actions/doctorActions';

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: '15px',
  },
}));

const DoctorForm = ({ currentId, setCurrentId, open, handleClose }) => {
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

  const [doctorData, setDoctorData] = useState(initialState);
  
  const doctorDetails = useSelector((state) =>
    currentId ? state.doctors.find((d) => d._id === currentId) : null
  );


  useEffect(() => {
    if (doctorDetails){setDoctorData(doctorDetails);}else{setDoctorData(initialState);}
  }, [doctorDetails]);

  const clearData = () => {
    setDoctorData(initialState);
    setCurrentId(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    if (currentId === 0) dispatch(createDoctor(doctorData));
    else dispatch(updateDoctor(currentId, doctorData));
    clearData();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Doctor Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To ${
            currentId === 0 ? 'add' : 'update'
          } doctor details from here`}
        </DialogContentText>

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Doctor Name'
          type='text'
          fullWidth
          value={doctorData.name}
          onChange={(e) =>
            setDoctorData({ ...doctorData, name: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='email'
          label='Email Address'
          type='email'
          fullWidth
          value={doctorData.email}
          onChange={(e) =>
            setDoctorData({ ...doctorData, email: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='phn1'
          label='Phone Number'
          type='number'
          fullWidth
          value={doctorData.phoneNo1}
          onChange={(e) =>
            setDoctorData({ ...doctorData, phoneNo1: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='phn2'
          label='Alternative Phone Number'
          type='number'
          fullWidth
          value={doctorData.phoneNo2}
          onChange={(e) =>
            setDoctorData({ ...doctorData, phoneNo2: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='address'
          label='Doctor Address'
          type='text'
          fullWidth
          value={doctorData.address}
          onChange={(e) =>
            setDoctorData({ ...doctorData, address: e.target.value })
          }
        />
        <div className={classes.file}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
            setDoctorData({ ...doctorData, selectedImage: base64 })
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

export default DoctorForm;
