import axios from 'axios';

import {
  SETTING_CREATE,
  SETTING_UPDATE,
  SETTING_DELETE,
  SETTING_DELETE_ALL,
  SETTING_FETCH_ALL,
} from '../constants/settingConstants';

export const createSetting = (form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/setting', form, config);
    dispatch({ type: SETTING_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchSettings = () => async (dispatch, getState) => {
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

    const { data } = await axios.get('/setting', config);
    dispatch({ type: SETTING_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSetting = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/setting/${id}`, config);
    dispatch({ type: SETTING_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSettings = (idArr) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/setting/delete`, idArr, config);
    dispatch({ type: SETTING_DELETE_ALL, payload: idArr });
  } catch (error) {
    console.log(error);
  }
};

export const updateSetting = (id, form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/setting/${id}`, form, config);
    dispatch({ type: SETTING_UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
