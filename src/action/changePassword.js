/* eslint-disable no-alert */
import {
  BUTTON_UPDATE_PASSWORD,
  BUTTON_UPDATE_PASSWORD_SUCCESS,
  BUTTON_UPDATE_PASSWORD_FAILED,
  PASSWORD_CHANGE_CHANGE_SCREEN,
  PASSWORD_CHANGE_INVALID_CHANGE_SCREEN,
  PASSWORD_CHANGE_CONFIRM_VALID_CHANGE_SCREEN,
  PASSWORD_CHANGE_CONFIRM_INVALID_CHANGE_SCREEN,
} from './type';
import {ToastAndroid} from 'react-native';

export const passwordChanged = value => {
  return (dispatch, getState) => {
    if (getState().changePassReducer.confirmPassword !== '') {
      if (value === getState().changePassReducer.confirmPassword) {
        dispatch({type: PASSWORD_CHANGE_CHANGE_SCREEN, payload: value});
      } else {
        dispatch({type: PASSWORD_CHANGE_INVALID_CHANGE_SCREEN, payload: value});
      }
    } else {
      dispatch({type: PASSWORD_CHANGE_CHANGE_SCREEN, payload: value});
    }
  };
};

export const confirmPasswordChanged = value => {
  return (dispatch, getState) => {
    if (value !== getState().changePassReducer.password) {
      dispatch({
        type: PASSWORD_CHANGE_CONFIRM_INVALID_CHANGE_SCREEN,
        payload: value,
      });
    } else {
      dispatch({
        type: PASSWORD_CHANGE_CONFIRM_VALID_CHANGE_SCREEN,
        payload: value,
      });
    }
  };
};

export const buttonUpdatePassword = ({
  password,
  confirmPassword,
  borderPassword,
  navigation,
}) => {
  return (dispatch, getState) => {
    dispatch({type: BUTTON_UPDATE_PASSWORD});
    if (password === '' || confirmPassword === '' || borderPassword === 'red') {
      // console.log(getState());
      alert('لطفا رمز را به درستی وارد نمایید.');
      dispatch({type: BUTTON_UPDATE_PASSWORD_FAILED});
    } else {
      fetch('http://172.20.10.11/student/updatePass.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: getState().auth.email,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson === 'success') {
            updateSuccess(dispatch, navigation);
          } else {
            failedSuccess(dispatch);
          }
        })
        .catch(e => {
          dispatch({type: BUTTON_UPDATE_PASSWORD_FAILED});
          alert(e);
        });
    }
  };
};

const updateSuccess = (dispatch, navigation) => {
  dispatch({type: BUTTON_UPDATE_PASSWORD_SUCCESS});
  ToastAndroid.show('رمز عبور با موفقیت به روز گردید.', ToastAndroid.SHORT);
  navigation.navigate('Home');
};
const failedSuccess = dispatch => {
  dispatch({type: BUTTON_UPDATE_PASSWORD_FAILED});
  ToastAndroid.show('مجداا تلاش نمایید.', ToastAndroid.SHORT);
};
