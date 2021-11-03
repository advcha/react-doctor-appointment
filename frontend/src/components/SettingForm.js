import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { createSetting, updateSetting } from '../actions/settingActions';

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: '15px',
  },
}));

const SettingForm = ({ currentId, setCurrentId, open, handleClose }) => {
  const dispatch = useDispatch();

  const initialState = {
    name: '',
    nameValue: '',
  };

  const [settingData, setSettingData] = useState(initialState);
  
  const settingDetails = useSelector((state) =>
    currentId ? state.settings.find((c) => c._id === currentId) : null
  );


  useEffect(() => {
    if (settingDetails){setSettingData(settingDetails);}else{setSettingData(initialState);}
  }, [settingDetails]);

  const clearData = () => {
    setSettingData(initialState);
    setCurrentId(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    if (currentId === 0) dispatch(createSetting(settingData));
    else dispatch(updateSetting(currentId, settingData));
    clearData();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Setting Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`To ${
            currentId === 0 ? 'add' : 'update'
          } setting details from here`}
        </DialogContentText>

        <TextField
          autoFocus
          margin='dense'
          id='name'
          label='Setting Name'
          type='text'
          fullWidth
          value={settingData.name}
          onChange={(e) =>
            setSettingData({ ...settingData, name: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin='dense'
          id='address'
          label='Setting Values'
          type='text'
          fullWidth
          value={settingData.nameValue}
          onChange={(e) =>
            setSettingData({ ...settingData, nameValue: e.target.value })
          }
        />
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

export default SettingForm;
