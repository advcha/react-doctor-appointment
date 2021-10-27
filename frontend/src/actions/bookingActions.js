import axios from 'axios';

import {
  BOOKING_CREATE,
  BOOKING_UPDATE,
  BOOKING_DELETE,
  BOOKING_DELETE_ALL,
  BOOKING_FETCH_ALL,
} from '../constants/bookingConstants';

export const createBooking = (form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post('/booking', form, config);
    dispatch({ type: BOOKING_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchBookings = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get('/booking', config);
    dispatch({ type: BOOKING_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBooking = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/booking/${id}`, config);
    dispatch({ type: BOOKING_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBookings = (idArr) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/booking/delete`, idArr, config);
    dispatch({ type: BOOKING_DELETE_ALL, payload: idArr });
  } catch (error) {
    console.log(error);
  }
};

export const updateBooking = (id, form) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/booking/${id}`, form, config);
    dispatch({ type: BOOKING_UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
