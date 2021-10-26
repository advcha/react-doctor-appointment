import React, { useState } from 'react';
import Header from '../components/Header';
import ClinicForm from '../components/ClinicForm';
import ClinicTable from '../components/ClinicTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClinics } from '../actions/clinicActions';

const Clinic = () => {
  const dispatch = useDispatch();
  const [openClinic, setOpenClinic] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleClickOpen = () => {
    document.location.href = '/booking';
  };

  const handleDoctorOpen = () => {
    document.location.href = '/doctor';
  };

  const handleClinicOpen = () => {
    setOpenClinic(true);
  };

  const handleClose = () => {
    setOpenClinic(false);
  };

  useState(() => {
    dispatch(fetchClinics());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <Header userInfo={userInfo} />
      <ClinicForm
        open={openClinic}
        handleClose={handleClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <ClinicTable
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        handleDoctorOpen={handleDoctorOpen}
        handleClinicOpen={handleClinicOpen}
        setCurrentId={setCurrentId}
      />
    </div>
  );
};

export default Clinic;
