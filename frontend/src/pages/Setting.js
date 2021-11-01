import React, { useState } from 'react';
import Header from '../components/Header';
import SettingForm from '../components/SettingForm';
import SettingTable from '../components/SettingTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from '../actions/settingActions';

const Setting = () => {
  const dispatch = useDispatch();
  const [openSetting, setOpenSetting] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleClickOpen = () => {
    document.location.href = '/booking';
  };

  const handleDoctorOpen = () => {
    document.location.href = '/doctor';
  };

  const handleClinicOpen = () => {
    document.location.href = '/clinic';
  };

  const handleSettingOpen = () => {
    setOpenSetting(true);
  };

  const handleClose = () => {
    setOpenSetting(false);
  };

  useState(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <Header userInfo={userInfo} />
      <SettingForm
        open={openSetting}
        handleClose={handleClose}
        currentId={currentId}
        setCurrentId={setCurrentId}
      />
      <SettingTable
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

export default Setting;
