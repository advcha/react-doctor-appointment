import {
  CLINIC_CREATE,
  CLINIC_DELETE,
  CLINIC_DELETE_ALL,
  CLINIC_FETCH_ALL,
  CLINIC_UPDATE,
} from '../constants/clinicConstants';

export const clinicReducer = (clinics = [], action) => {
  switch (action.type) {
    case CLINIC_FETCH_ALL:
      return action.payload;
    case CLINIC_CREATE:
      return [...clinics, action.payload];

    case CLINIC_UPDATE:
      return clinics.map((d) =>
        d._id === action.payload._id ? action.payload : d
      );

    case CLINIC_DELETE:
      return clinics.filter((d) => d._id !== action.payload);

    case CLINIC_DELETE_ALL:
      return clinics.filter(function (d) {
        return action.payload.indexOf(d._id) === -1;
      });

    default:
      return clinics;
  }
};

/**
 *
 *
 *
 *
 */
