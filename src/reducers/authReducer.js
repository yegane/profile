/* eslint-disable no-unreachable */
import {
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILED,
  EMAIL_CHANGE,
  EMAIL_CHANGE_INVALID,
  PASSWORD_CHANGE,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  SIGN_OUT,
  NETWORK_ERROR,
  SIGN_UP,
} from '../action/type';

export const INITIAL_STATE = {
  email: '',
  password: '',
  loading: false,
  token: 'false',
  borderError: '#ccc',
  loadingSplash: 'true',
  titleOfScreen: 'ورود',
  nameOfProfile: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loadingSplash: 'false',
        token: 'true',
        nameOfProfile: action.payload,
      };
      break;

    case CHECK_AUTH_FAILED:
      return {...state, loadingSplash: 'false', token: 'false'};
      break;

    case EMAIL_CHANGE_INVALID:
      return {...state, borderError: 'red', email: action.payload};
      break;

    case EMAIL_CHANGE:
      return {...state, email: action.payload, borderError: '#ccc'};
      break;

    case PASSWORD_CHANGE:
      return {...state, password: action.payload};
      break;

    case LOGIN_USER:
      return {...state, loading: true};
      break;

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loadingSplash: 'false',
        token: 'true',
        loading: false,
        password: '',
        nameOfProfile: action.payload,
      };
      break;

    case LOGIN_USER_FAILED:
      return {...state, password: '', loading: false};
      break;

    case SIGN_OUT:
      return {
        ...state,
        token: 'false',
        loadingSplash: 'false',
      };
      break;

    case NETWORK_ERROR:
      return {...state, loading: false};
      break;

    case SIGN_UP:
      return {...state, titleOfScreen: 'ثبت نام'};
      break;

    default:
      return {...state};
  }
};

export default authReducer;
