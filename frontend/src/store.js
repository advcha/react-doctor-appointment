import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { bookingReducer } from './reducers/bookingReducer';
import { doctorReducer } from './reducers/doctorReducer';
import { clinicReducer } from './reducers/clinicReducer';
import { settingReducer } from './reducers/settingReducer';
import { authReducer } from './reducers/authReducer';

const reducers = combineReducers({
  bookings: bookingReducer,
  doctors: doctorReducer,
  clinics: clinicReducer,
  settings: settingReducer,
  userLogin: authReducer,
});

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { 
  userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
  /*composeWithDevTools(applyMiddleware(...middleware))*/
);

export default store;
