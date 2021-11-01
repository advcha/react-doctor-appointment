import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, IconButton, Grid, CardHeader, CardContent, Typography, Toolbar, Select, MenuItem, InputLabel, FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../actions/doctorActions';

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '14px',
  },
  chk: {
    '& span':{
      fontSize: '12px !important',
      padding: '3px',
    }
  },
}));

const DoctorList = ({ idClinic }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.doctors);
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
  }, [dispatch]);

  return (
    <>
      <Typography variant='h6' className={classes.title}>
        Include Doctors in List
      </Typography>
      <FormGroup>
        {doctors.map(d => (
          <FormControlLabel className={classes.chk} control={<Checkbox />} label={d.name} key={doctors.indexOf(d)} />
        ))} 
      </FormGroup> 
    </>
  );
};

export default DoctorList;
