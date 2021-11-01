import {
  SETTING_CREATE,
  SETTING_DELETE,
  SETTING_DELETE_ALL,
  SETTING_FETCH_ALL,
  SETTING_UPDATE,
} from '../constants/settingConstants';

export const settingReducer = (settings = [], action) => {
  switch (action.type) {
    case SETTING_FETCH_ALL:
      return action.payload;
    case SETTING_CREATE:
      return [...settings, action.payload];

    case SETTING_UPDATE:
      return settings.map((d) =>
        d._id === action.payload._id ? action.payload : d
      );

    case SETTING_DELETE:
      return settings.filter((d) => d._id !== action.payload);

    case SETTING_DELETE_ALL:
      return settings.filter(function (d) {
        return action.payload.indexOf(d._id) === -1;
      });

    default:
      return settings;
  }
};

/**
 *
 *
 *
 *
 */
