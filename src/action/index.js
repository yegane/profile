/* eslint-disable no-alert */
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
} from './type';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

export const emailChanged = text => {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (reg.test(text) === false) {
    return {
      type: EMAIL_CHANGE_INVALID,
      payload: text,
    };
  } else {
    return {
      type: EMAIL_CHANGE,
      payload: text,
    };
  }
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGE,
    payload: text,
  };
};

export const checkAuth = () => {
  return async function(dispatch) {
    if ((await AsyncStorage.getItem('token')) === 'true') {
      const name = await AsyncStorage.getItem('name');
      dispatch({type: CHECK_AUTH_SUCCESS, payload: name});
    } else {
      dispatch({type: CHECK_AUTH_FAILED});
    }
  };
};

export const login_User = ({email, password}) => {
  return dispatch => {
    dispatch({type: LOGIN_USER});
    fetch('http://172.20.10.11/student/user_login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 'invalid user or pass') {
          alert('نام کاربری و یا رمز عبور اشتباه است.');
          failedLogin(dispatch);
        } else {
          successLogin(dispatch, responseJson[0].name);
        }
      })
      .catch(error => {
        dispatch({type: NETWORK_ERROR});
        alert('خطا در ارتباط با سرور');
      });
  };
};

const successLogin = async (dispatch, name) => {
  await AsyncStorage.setItem('token', 'true');
  await AsyncStorage.setItem('name', name);
  dispatch({type: LOGIN_USER_SUCCESS, payload: name});
};

const failedLogin = dispatch => {
  dispatch({type: LOGIN_USER_FAILED});
};

export const Sign_Out = () => {
  return dispatch => {
    dispatch({type: SIGN_OUT});
  };
};

export const Sign_Up = () => {
  return dispatch => {
    dispatch({type: SIGN_UP});
  };
};
