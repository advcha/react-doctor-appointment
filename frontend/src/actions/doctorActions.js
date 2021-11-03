import axios from 'axios';

import {
  DOCTOR_CREATE,
  DOCTOR_UPDATE,
  DOCTOR_DELETE,
  DOCTOR_DELETE_ALL,
  DOCTOR_FETCH_ALL,
} from '../constants/doctorConstants';

export const createDoctor = (form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/doctor', form, config);
    dispatch({ type: DOCTOR_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchDoctors = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const token = userInfo ? userInfo.token : 'homepage';
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get('/doctor', config);
    dispatch({ type: DOCTOR_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDoctor = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/doctor/${id}`, config);
    dispatch({ type: DOCTOR_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDoctors = (idArr) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/doctor/delete`, idArr, config);
    dispatch({ type: DOCTOR_DELETE_ALL, payload: idArr });
  } catch (error) {
    console.log(error);
  }
};

export const updateDoctor = (id, form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/doctor/${id}`, form, config);
    dispatch({ type: DOCTOR_UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
