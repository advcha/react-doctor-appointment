import React, { useState, useEffect } from 'react';
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
    '& span': {
      fontSize: '12px !important',
      padding: '3px',
    },
    '& .Mui-checked': {
      color: 'rgb(24, 186, 240)',
    },
  },
}));

const DoctorList = ({ handleSearchBooking }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const doctors = useSelector((state) => state.doctors);

  const [checkedStatus, setCheckedStatus] = useState([]);

  const searchBooking = (e) => {
    let checkedArr = [...checkedStatus];
    if (e.target.checked === true) {
      checkedArr.push(e.target.value);
    } else {
      const checkFiltered = checkedArr.filter(d => {
        return d !== e.target.value;
      })
      checkedArr = checkFiltered;
    }
    setCheckedStatus(checkedArr);
    handleSearchBooking(checkedArr);
  };

  useEffect(() => {
    if (doctors.length) {
      let checkedArr = [];
      doctors.map(d => {
        checkedArr.push(d._id);
        setCheckedStatus(checkedArr);
      });
      handleSearchBooking(checkedArr);
    }
  }, [doctors]);

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
          <FormControlLabel className={classes.chk} control={<Checkbox value={d._id} checked={checkedStatus.indexOf(d._id) > -1 ? true : false} onChange={(e) => searchBooking(e)} />} label={d.name} key={doctors.indexOf(d)} />
        ))}
      </FormGroup>
    </>
  );
};

export default DoctorList;
