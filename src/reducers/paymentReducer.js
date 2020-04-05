import {SEND_PAY, PAYMENT_SUCCESS, PAYMENT_FAILED} from '../action/type';

const INITIALIZE_STATE = {
  color: '',
  text: '',
};

const paymentReducer = (state = INITIALIZE_STATE, action) => {
  switch (action.type) {
    case SEND_PAY:
      return {...state};

    case PAYMENT_SUCCESS:
      return {...state, color: 'green', text: 'success'};

    case PAYMENT_FAILED:
      return {...state, color: 'yellow', text: 'failed'};

    default:
      return {...state};
  }
};

export default paymentReducer;
