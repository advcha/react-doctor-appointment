import React, { useState } from 'react';
import { Button, Grid, Typography, Toolbar, Select, MenuItem, FormControl, TextField, } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import BookingCard from '../components/BookingCard';
import BookingInfo from '../components/BookingInfo';
import { fetchBookingsByClinic } from '../actions/bookingActions';
import { fetchDoctors } from '../actions/doctorActions';
import { fetchClinics } from '../actions/clinicActions';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  appointmentGrid: {
    border: '1px solid rgb(239, 239, 239)',
    borderRadius: '10px',
    backgroundColor: 'white',
    padding: '8px'
  },
  appointmentText: {
    textAlign: 'center',
    fontSize: '1.0rem',
    margin: '10px 0',
  },
  gridSearch: {
    border: '1px solid rgb(239, 239, 239)',
    borderRadius: '10px',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  toolbar: {
    padding: '5px 10px 20px 5px',
  },
  inputSearch: {
    display: 'inline-block',
    margin: '0 5px',
  },
  buttonSearch: {
    display: 'inline-block',
    margin: '0 5px',
    border: '1px solid rgb(239, 239, 239)',
    borderRadius: '10px',
    alignItems: 'center',
    backgroundColor: 'rgb(24, 186, 240)',
    color: 'white',
  },
}));

const BookingList = ({ idClinic, doctorSelected }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const initialState = {
    search1: 'bookingType',
    search2: 'bookingId',
    search3: '',
  };

  //const [bookingSearch, setBookingSearch] = useState(initialState); // run every dom update?
  const [bookingSearch, setBookingSearch] = useState(() => initialState); // run once. faster!

  const [open, setOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState(false);
  const [bookingSelected, setBookingSelected] = useState([]);

  useState(() => {
    dispatch(fetchDoctors());
    dispatch(fetchClinics());
  }, [dispatch]);

  const bookings = useSelector((state) => {
    if (doctorSelected.length) {
      const bookingDoctorFiltered = [];
      state.bookings.filter(b => {
        doctorSelected.map(d => {
          if (d === b.doctor._id) {
            bookingDoctorFiltered.push(b);
          }
        });
      });
      if (searchFilter && bookingDoctorFiltered) {
        if (bookingSearch.search2 === 'bookingId') {
          const bookingFiltered = bookingDoctorFiltered.filter(b => {
            return b.bookingId.includes(bookingSearch.search3);
          });

          return bookingFiltered;
        } else if (bookingSearch.search2 === 'firstName') {
          const bookingFiltered = bookingDoctorFiltered.filter(b => {
            return b.firstName.toLowerCase().includes(bookingSearch.search3.toLowerCase());
          });

          return bookingFiltered;
        } else if (bookingSearch.search2 === 'lastName') {
          const bookingFiltered = bookingDoctorFiltered.filter(b => {
            return b.lastName.toLowerCase().includes(bookingSearch.search3.toLowerCase());
          });

          return bookingFiltered;
        }
      }else{
        return bookingDoctorFiltered;
      }
    } else {
      //return state.bookings;
      return [];
    }
  });

  const clinics = useSelector((state) => state.clinics);

  const openInfo = () => {
    setOpen(true);
  };

  const closeInfo = () => {
    setOpen(false);
  };

  const bookingTwoDaysAfter = bookings.filter(b => (moment(b.bookingDateTime).format('MM/DD/YYYYT') === moment().add(2, 'days').format('MM/DD/YYYYT')));
  const bookingTomorrow = bookings.filter(b => (moment(b.bookingDateTime).format('MM/DD/YYYYT') === moment().add(1, 'days').format('MM/DD/YYYYT')));
  const bookingToday = bookings.filter(b => (moment(b.bookingDateTime).format('MM/DD/YYYYT') === moment().format('MM/DD/YYYYT')));

  const goToClinic = (e, id) => {
    e.preventDefault();
    document.location.href = '/appointment/' + id;
  };

  const searchBooking = (e) => {
    e.preventDefault();
    if (bookingSearch.search3) {
      setSearchFilter(true);
      dispatch(fetchBookingsByClinic(idClinic));
    } else {
      setSearchFilter(false);
    }
  };

  return (
    <>
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          spacing={2}
          direction='row'
          justify='flex-start'
          alignItems='flex-start'
        >
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <Select
                name='clinic'
                labelId='clinic-label'
                id='clinic'
                label='Clinic'
                defaultValue=''
                value={idClinic}
                onChange={(e) =>
                  goToClinic(e, e.target.value)
                }
              >
                {clinics.map(({ _id, name }, index) => (
                  <MenuItem key={index} value={_id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={8} className={classes.gridSearch}>
            <Select
              name='search1'
              labelId='search-1-label'
              id='search1'
              label='Search 1'
              defaultValue={bookingSearch.search1}
              value={bookingSearch.search1}
              className={classes.inputSearch}
              onChange={(e) => {
                setSearchFilter(false);
                setBookingSearch({ ...bookingSearch, search1: e.target.value });
              }}
            >
              <MenuItem key={0} value='bookingDateTime'>
                Time
              </MenuItem>
              <MenuItem key={1} value='bookingType'>
                Booking Type
              </MenuItem>
            </Select>
            <Select
              name='search2'
              labelId='search-2-label'
              id='search2'
              label='Search 2'
              defaultValue={bookingSearch.search2}
              value={bookingSearch.search2}
              className={classes.inputSearch}
              onChange={(e) => {
                setSearchFilter(false);
                setBookingSearch({ ...bookingSearch, search2: e.target.value });
              }}
            >
              <MenuItem key={0} value='firstName'>
                First Name
              </MenuItem>
              <MenuItem key={1} value='lastName'>
                Last Name
              </MenuItem>
              <MenuItem key={2} value='doctor'>
                Doctor
              </MenuItem>
              <MenuItem key={3} value='bookingId'>
                Booking Number
              </MenuItem>
              <MenuItem key={4} value='clinic'>
                Clinic
              </MenuItem>
              <MenuItem key={5} value='phoneNo'>
                Phone Number
              </MenuItem>
            </Select>
            <TextField
              autoFocus
              margin='none'
              id='textSearch'
              placeholder='Search'
              type='text'
              value={bookingSearch.search3}
              className={classes.inputSearch}
              onChange={(e) => {
                setSearchFilter(false);
                setBookingSearch({ ...bookingSearch, search3: e.target.value });
              }}
            />
            <Button 
              color='primary' 
              className={classes.buttonSearch} 
              onClick={(e) => {
                searchBooking(e);
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
      <BookingInfo
        open={open}
        bookingSelected={bookingSelected}
        closeInfo={closeInfo}
      />
      <Grid
        container
        spacing={2}
        direction='row'
        justify='flex-start'
        alignItems='flex-start'
      >
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.appointmentGrid}>
            <Typography variant='h6' className={classes.appointmentText}>
              Appointment in 2 days
            </Typography>
            <Grid
              container
              spacing={2}
              direction='column'
              justify='flex-start'
              alignItems='flex-start'
            >
              {bookingTwoDaysAfter.map(b => (
                <BookingCard
                  booking={b}
                  openInfo={openInfo}
                  closeInfo={closeInfo}
                  setBookingSelected={setBookingSelected}
                  key={bookingTwoDaysAfter.indexOf(b)}
                />
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.appointmentGrid}>
            <Typography variant='h6' className={classes.appointmentText}>
              Appointment Tomorrow
            </Typography>
            <Grid
              container
              spacing={2}
              direction='column'
              justify='flex-start'
              alignItems='flex-start'
            >
              {bookingTomorrow.map(b => (
                <BookingCard
                  booking={b}
                  openInfo={openInfo}
                  setBookingSelected={setBookingSelected}
                  key={bookingTomorrow.indexOf(b)}
                />
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.appointmentGrid}>
            <Typography variant='h6' className={classes.appointmentText}>
              Appointment Today
            </Typography>
            <Grid
              container
              spacing={2}
              direction='column'
              justify='flex-start'
              alignItems='flex-start'
            >
              {bookingToday.map(b => (
                <BookingCard
                  booking={b}
                  openInfo={openInfo}
                  setBookingSelected={setBookingSelected}
                  key={bookingToday.indexOf(b)}
                />
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default BookingList;
