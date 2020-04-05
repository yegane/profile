/* eslint-disable no-unreachable */
import {
  BUTTON_UPDATE_PASSWORD,
  BUTTON_UPDATE_PASSWORD_SUCCESS,
  BUTTON_UPDATE_PASSWORD_FAILED,
  PASSWORD_CHANGE_CHANGE_SCREEN,
  PASSWORD_CHANGE_INVALID_CHANGE_SCREEN,
  PASSWORD_CHANGE_CONFIRM_VALID_CHANGE_SCREEN,
  PASSWORD_CHANGE_CONFIRM_INVALID_CHANGE_SCREEN,
} from '../action/type';

const INITIALIZE_STATE = {
  borderPassword: '#ccc',
  password: '',
  confirmPassword: '',
  loading: false,
};

const changePassReducer = (state = INITIALIZE_STATE, action) => {
  switch (action.type) {
    case PASSWORD_CHANGE_CHANGE_SCREEN:
      return {...state, password: action.payload, borderPassword: '#ccc'};

    case PASSWORD_CHANGE_INVALID_CHANGE_SCREEN:
      return {...state, password: action.payload, borderPassword: 'red'};

    case PASSWORD_CHANGE_CONFIRM_VALID_CHANGE_SCREEN:
      return {
        ...state,
        confirmPassword: action.payload,
        borderPassword: '#ccc',
      };

    case PASSWORD_CHANGE_CONFIRM_INVALID_CHANGE_SCREEN:
      return {...state, confirmPassword: action.payload, borderPassword: 'red'};

    case BUTTON_UPDATE_PASSWORD:
      return {...state, loading: true};

    case BUTTON_UPDATE_PASSWORD_FAILED:
      return {...state, loading: false};

    case BUTTON_UPDATE_PASSWORD_SUCCESS:
      return {...state, loading: false};

    default:
      return {...state};
  }
};

export default changePassReducer;
