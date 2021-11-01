import React, { useState } from 'react';
import Header from '../components/Header';
import DoctorForm from '../components/DoctorForm';
import DoctorTable from '../components/DoctorTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../actions/doctorActions';

const Doctor = () => {
  const dispatch = useDispatch();
  const [openDoctor, setOpenDoctor] = useState(false);
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

  const handleSettingOpen = () => {
    document.location.href = '/setting';
  };

  const handleClose = () => {
    setOpenDoctor(false);
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
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        handleDoctorOpen={handleDoctorOpen}
        handleClinicOpen={handleClinicOpen}
        handleSettingOpen={handleSettingOpen}
        setCurrentId={setCurrentId}
      />
    </div>
  );
};

export default Doctor;
