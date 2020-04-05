/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
import {
  BACK_BUTTON_SIGNUP,
  NAME_CHANGE_SIGNUP,
  NAME_CHANGE_INVALID_SIGNUP,
  EMAIL_CHANGE_SIGNUP,
  PASSWORD_CHANGE_SIGNUP,
  PASSWORD_CHANGE_INVALID_SIGNUP,
  CONFIRM_PASSWORD_CHANGE_SIGNUP,
  EMAIL_CHANGE_INVALID_SIGNUP,
  CONFIRM_PASSWORD_CHANGE_INVALID_SIGNUP,
  SIGN_UP_ATTEMPT,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILED,
  NETWORK_ERROR,
} from './type';
import AsyncStorage from '@react-native-community/async-storage';
const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const back_button = () => {
  return (dispatch, getState) => {
    getState().auth.titleOfScreen = 'ورود';
    dispatch({type: BACK_BUTTON_SIGNUP});
  };
};

export const nameChanged = value => {
  return {
    type: NAME_CHANGE_SIGNUP,
    payload: value,
  };
};

export const emailChanged = value => {
  if (reg.test(value)) {
    return {
      type: EMAIL_CHANGE_SIGNUP,
      payload: value,
    };
  } else {
    return {
      type: EMAIL_CHANGE_INVALID_SIGNUP,
      payload: value,
    };
  }
};

export const passwordChanged = value => {
  return (dispatch, getState) => {
    if (getState().signUp.confirmPassword !== '') {
      if (value !== getState().signUp.confirmPassword) {
        dispatch({type: PASSWORD_CHANGE_INVALID_SIGNUP, payload: value});
      } else {
        dispatch({type: PASSWORD_CHANGE_SIGNUP, payload: value});
      }
    } else {
      dispatch({type: PASSWORD_CHANGE_SIGNUP, payload: value});
    }
  };
};

export const confirmPasswordChanged = value => {
  return (dispatch, getState) => {
    if (value !== getState().signUp.password) {
      dispatch({type: CONFIRM_PASSWORD_CHANGE_INVALID_SIGNUP, payload: value});
    } else {
      dispatch({type: CONFIRM_PASSWORD_CHANGE_SIGNUP, payload: value});
    }
  };
};

export const signUpAttempt = ({
  name,
  email,
  password,
  borderEmail,
  borderPass,
  confirmPassword,
}) => {
  return (dispatch, getState) => {
    dispatch({type: SIGN_UP_ATTEMPT});
    if (name === '' || email === '' || password === '' || borderEmail === 'red' || borderPass === 'red' || confirmPassword === '') {
      if (name === '') {
        dispatch({type: NAME_CHANGE_INVALID_SIGNUP});
      }
      if (borderEmail === 'red' || email === '') {
        dispatch({type: EMAIL_CHANGE_INVALID_SIGNUP});
      }
      if (borderPass === 'red' || password === '') {
        dispatch({type: PASSWORD_CHANGE_INVALID_SIGNUP});
      }
      if (confirmPassword === '' || borderPass === 'red') {
        dispatch({type: CONFIRM_PASSWORD_CHANGE_INVALID_SIGNUP});
      }
      alert("لطفا تمانی فیلدها را به درستی وارد نمایید.");
    } else {
      fetch('http://172.20.10.11/student/signup_user.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson === 'success') {
            signUpSuccess(dispatch, getState);
          } else {
            signUpFailed(dispatch);
          }
        })
        .catch(error => {
          dispatch({type: NETWORK_ERROR});
          alert('لطفا اتصال خود را بررسی نمایید.');
        });
    }
  };
};

const signUpSuccess = async (dispatch, getState) => {
  getState().auth.titleOfScreen = "خانه";
  getState().auth.token = 'true';
  getState().auth.email = getState().signUp.email;
  await AsyncStorage.setItem('token', 'true');
  dispatch({type: SIGN_UP_SUCCESS});
};

const signUpFailed = dispatch => {
  dispatch({type: SIGN_UP_FAILED});
};
