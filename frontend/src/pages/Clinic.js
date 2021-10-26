import React, { useState } from 'react';
import Header from '../components/Header';
import DoctorForm from '../components/DoctorForm';
import DoctorTable from '../components/DoctorTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../actions/clinicActions';

const Clinic = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDoctor, setOpenDoctor] = useState(false);
  const [openClinic, setOpenClinic] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleClickOpen = () => {
    document.location.href = '/booking';
  };

  const handleDoctorOpen = () => {
    setOpenDoctor(true);
  };

  const handleClinicOpen = () => {
    document.location.href = '/clinic';
  };

  const handleClose = () => {
    //setOpen(false);
    setOpenDoctor(false);
    //setOpenClinic(false);
  };

  useState(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <Header userInfo={userInfo} />
      <DoctorForm
        open={openDoctor}
        handleClose={handleClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <DoctorTable
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

export default Doctor;
