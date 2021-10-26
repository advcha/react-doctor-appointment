import axios from 'axios';

import {
  CLINIC_CREATE,
  CLINIC_UPDATE,
  CLINIC_DELETE,
  CLINIC_DELETE_ALL,
  CLINIC_FETCH_ALL,
} from '../constants/clinicConstants';

export const createClinic = (form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/clinic', form, config);
    dispatch({ type: CLINIC_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchClinics = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/clinic', config);
    dispatch({ type: CLINIC_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteClinic = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/clinic/${id}`, config);
    dispatch({ type: CLINIC_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deleteClinics = (idArr) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/clinic/delete`, idArr, config);
    dispatch({ type: CLINIC_DELETE_ALL, payload: idArr });
  } catch (error) {
    console.log(error);
  }
};

export const updateClinic = (id, form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/clinic/${id}`, form, config);
    console.log(data);
    dispatch({ type: CLINIC_UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
