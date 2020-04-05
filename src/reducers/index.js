import {combineReducers} from 'redux';
import authReducer from './authReducer';
import signUpReducer from './signUpReducer';
import forgetPassReducer from './forgetPassReducer';
import profileReducer from './profileReducer';
import changePassReducer from './changePassReducer';
import homeReducer from './homeReducer';
import qrCodeScanner from './qrCodeScanner';
import paymentReducer from './paymentReducer';
export default combineReducers({
  auth: authReducer,
  signUp: signUpReducer,
  forgetPassword: forgetPassReducer,
  profileReducer,
  changePassReducer,
  homeReducer,
  qrCodeScanner,
  paymentReducer,
});
