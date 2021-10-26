import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//import { contactReducer } from './reducers/contactReducer';
import { bookingReducer } from './reducers/bookingReducer';
import { doctorReducer } from './reducers/doctorReducer';
import { clinicReducer } from './reducers/clinicReducer';
import { authReducer } from './reducers/authReducer';

const reducers = combineReducers({
  /*contacts: contactReducer,*/
  bookings: bookingReducer,
  doctors: doctorReducer,
  clinics: clinicReducer,
  userLogin: authReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
