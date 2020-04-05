import {SEND_PAY, PAYMENT_SUCCESS, PAYMENT_FAILED} from './type';
import {Linking} from 'react-native';

export const sendPay = () => {
  return dispatch => {
    Linking.openURL('http://172.20.10.11/payment/sendPay.php');
    dispatch({type: SEND_PAY});
  };
};

export const resultPayment = (id, routeName) => {
  return dispatch => {
    if (routeName === 'payment' && id === '1') {
      dispatch({type: PAYMENT_SUCCESS});
    } else if (routeName === 'payment' && id === '2') {
      dispatch({type: PAYMENT_FAILED});
    }
  };
};
