/* eslint-disable no-unreachable */
import {
  BACK_BUTTON_SIGNUP,
  NAME_CHANGE_SIGNUP,
  NAME_CHANGE_INVALID_SIGNUP,
  EMAIL_CHANGE_SIGNUP,
  EMAIL_CHANGE_INVALID_SIGNUP,
  PASSWORD_CHANGE_SIGNUP,
  PASSWORD_CHANGE_INVALID_SIGNUP,
  CONFIRM_PASSWORD_CHANGE_SIGNUP,
  CONFIRM_PASSWORD_CHANGE_INVALID_SIGNUP,
  SIGN_UP_ATTEMPT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  NETWORK_ERROR,
} from '../action/type';

const INITIALIZE_STATE = {
  borderName: '#ccc',
  borderEmail: '#ccc',
  borderPass: '#ccc',
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  loading: false,
};

const signUpReducer = (state = INITIALIZE_STATE, action) => {
  switch (action.type) {
    case BACK_BUTTON_SIGNUP:
      return {...state};
      break;

    case NAME_CHANGE_INVALID_SIGNUP:
      return {...state, borderName: 'red', loading: false};
      break;

    case NAME_CHANGE_SIGNUP:
      return {...state, name: action.payload, borderName: '#ccc'};
      break;

    case EMAIL_CHANGE_INVALID_SIGNUP:
      return {
        ...state,
        email: action.payload,
        borderEmail: 'red',
        loading: false,
      };
      break;

    case EMAIL_CHANGE_SIGNUP:
      return {...state, email: action.payload, borderEmail: '#ccc'};
      break;

    case PASSWORD_CHANGE_SIGNUP:
      return {...state, password: action.payload, borderPass: '#ccc'};
      break;

    case PASSWORD_CHANGE_INVALID_SIGNUP:
      return {
        ...state,
        password: action.payload,
        borderPass: 'red',
        loading: false,
      };
      break;

    case CONFIRM_PASSWORD_CHANGE_INVALID_SIGNUP:
      return {
        ...state,
        confirmPassword: action.payload,
        borderPass: 'red',
        loading: false,
      };
      break;

    case CONFIRM_PASSWORD_CHANGE_SIGNUP:
      return {...state, confirmPassword: action.payload, borderPass: '#ccc'};
      break;

    case SIGN_UP_ATTEMPT:
      return {...state, loading: true};
      break;

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        name: '',
        password: '',
        confirmPassword: '',
        loading: false,
      };
      break;

    case SIGN_UP_FAILED:
      return {...state, loading: false};
      break;

    case NETWORK_ERROR:
      return {...state};
      break;

    default:
      return {...state};
      break;
  }
};

export default signUpReducer;
