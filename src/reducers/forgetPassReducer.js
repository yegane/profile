/* eslint-disable no-unreachable */
import {
  EMAIL_CHANGE_FORGET_PASSWORD,
  EMAIL_CHANGE_INVALID_FORGET_PASSWORD,
  GENERATE_CODE_SEND_INVALID,
  GENERATE_CODE_SEND_VALID,
  GENERATE_CODE_SEND,
} from '../action/type';

const INITIALIZE_STATE = {
  email: '',
  borderEmail: '#ccc',
  code: '',
  loading: false,
};

const forgetPassReducer = (state = INITIALIZE_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGE_FORGET_PASSWORD:
      return {...state, email: action.payload, borderEmail: '#ccc'};
      break;

    case EMAIL_CHANGE_INVALID_FORGET_PASSWORD:
      return {...state, email: action.payload, borderEmail: 'red'};
      break;

    case GENERATE_CODE_SEND:
      return {...state, code: action.payload, loading: true};
      break;

    case GENERATE_CODE_SEND_VALID:
      return {...state, loading: false};
      break;

    case GENERATE_CODE_SEND_INVALID:
      return {...state, loading: false};
      break;

    default:
      return {...state};
      break;
  }
};

export default forgetPassReducer;
