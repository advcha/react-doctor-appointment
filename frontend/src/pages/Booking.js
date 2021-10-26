import React, { useState } from 'react';
import Header from '../components/Header';
//import ContactForm from '../components/ContactForm';
import BookingForm from '../components/BookingForm';
import DoctorForm from '../components/DoctorForm';
//import ClinicForm from '../components/ClinicForm';
//import ContactTable from '../components/ContactTable';
import DoctorTable from '../components/DoctorTable';
import BookingTable from '../components/BookingTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../actions/contactActions';
import { fetchDoctors } from '../actions/doctorActions';

const Booking = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDoctor, setOpenDoctor] = useState(false);
  //const [openDoctorTable, setOpenDoctorTable] = useState(false);
  const [openClinic, setOpenClinic] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDoctorOpen = () => {
    document.location.href = '/doctor';
  };

  const handleClinicOpen = () => {
    setOpenClinic(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDoctor(false);
    setOpenClinic(false);
  };

  useState(() => {
    dispatch(fetchContacts());
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
