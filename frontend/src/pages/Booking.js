import React, { useState } from 'react';
import Header from '../components/Header';
import BookingForm from '../components/BookingForm';
import BookingTable from '../components/BookingTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../actions/bookingActions';

const Booking = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDoctorOpen = () => {
    document.location.href = '/doctor';
  };

  const handleClinicOpen = () => {
    document.location.href = '/clinic';
  };

  const handleClose = () => {
    setOpen(false);
  };

  useState(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <Header userInfo={userInfo} />
      <BookingForm
        open={open}
        handleClose={handleClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <BookingTable
        open={open}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        handleDoctorOpen={handleDoctorOpen}
        handleClinicOpen={handleClinicOpen}
        setCurrentId={setCurrentId}
      />
    </div>
  );
};

export default Booking;
