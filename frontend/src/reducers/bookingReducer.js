import {
  BOOKING_CREATE,
  BOOKING_DELETE,
  BOOKING_DELETE_ALL,
  BOOKING_FETCH_ALL,
  BOOKING_UPDATE,
} from '../constants/bookingConstants';

export const bookingReducer = (bookings = [], action) => {
  switch (action.type) {
    case BOOKING_FETCH_ALL:
      return action.payload;
    case BOOKING_CREATE:
      return [...bookings, action.payload];

    case BOOKING_UPDATE:
      return bookings.map((d) =>
        d._id === action.payload._id ? action.payload : d
      );

    case BOOKING_DELETE:
      return bookings.filter((d) => d._id !== action.payload);

    case BOOKING_DELETE_ALL:
      return bookings.filter(function (d) {
        return action.payload.indexOf(d._id) === -1;
      });

    default:
      return bookings;
  }
};

/**
 *
 *
 *
 *
 */
