import {
  DOCTOR_CREATE,
  DOCTOR_DELETE,
  DOCTOR_DELETE_ALL,
  DOCTOR_FETCH_ALL,
  DOCTOR_UPDATE,
} from '../constants/doctorConstants';

export const doctorReducer = (doctors = [], action) => {
  console.log(action.type);
  switch (action.type) {
    case DOCTOR_FETCH_ALL:
      return action.payload;
    case DOCTOR_CREATE:
      return [...doctors, action.payload];

    case DOCTOR_UPDATE:
      return doctors.map((d) =>
        d._id === action.payload._id ? action.payload : d
      );

    case DOCTOR_DELETE:
      return doctors.filter((d) => d._id !== action.payload);

    case DOCTOR_DELETE_ALL:
      return doctors.filter(function (d) {
        return action.payload.indexOf(d._id) === -1;
      });

    default:
      return doctors;
  }
};

/**
 *
 *
 *
 *
 */
