/* eslint-disable handle-callback-err */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import {
  EMAIL_CHANGE_FORGET_PASSWORD,
  EMAIL_CHANGE_INVALID_FORGET_PASSWORD,
  GENERATE_CODE_SEND,
  GENERATE_CODE_SEND_VALID,
  GENERATE_CODE_SEND_INVALID,
} from './type';
import {ToastAndroid} from 'react-native';
import RNSmtpMailer from 'react-native-smtp-mailer';
const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailChanged = value => {
  if (!reg.test(value)) {
    return {
      type: EMAIL_CHANGE_INVALID_FORGET_PASSWORD,
      payload: value,
    };
  } else {
    return {
      type: EMAIL_CHANGE_FORGET_PASSWORD,
      payload: value,
    };
  }
};

export const sendButtonCode = ({navigation}) => {
  return (dispatch, getState) => {
    getState().forgetPassword.code = '';
    let code = '';
    const min = 1;
    const max = 9;
    if (getState().forgetPassword.email === '' || getState().forgetPassword.borderEmail === 'red'){
      alert('لطفا ایمیل را به درستی وارد نمایید.');
    } else {
      for (let i = 0; i < 5; i++) {
        code = getState().forgetPassword.code.concat(Math.floor( (min + Math.random() * max)));
        dispatch({type: GENERATE_CODE_SEND, payload: code});
      }
      RNSmtpMailer.sendMail({
        mailhost: 'smtp.gmail.com',
        port: '465',
        ssl: true, //if ssl: false, TLS is enabled,**note:** in iOS TLS/SSL is determined automatically, so either true or false is the same
        username: 'zahra.yegane79@gmail.com',
        password: '',
        from: 'zahra.yegane79@gmail.com',
        recipients: getState().forgetPassword.email,
        subject: 'کد ریکاوری رمز عبور',
        htmlBody: '<p>' + getState().forgetPassword.code + '</p></br> <p>در فیلد رمز عبور کد ارسالی را وارد نمایید و پس از ورود رمز عبور خود را تغییر دهید.</p>',
        attachmentPaths: [],
        attachmentNames: [],
        attachmentTypes: [],
      })
        .then(success => {
          dispatch({type: GENERATE_CODE_SEND_VALID});
          ToastAndroid.showWithGravityAndOffset(
          'کد با موفقیت ارسال شد.',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
        navigation.navigate('Login');
        fetch( 'http://172.20.10.11/student/forgetPass.php', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
            },
            body: JSON.stringify({
              email: getState().forgetPassword.email,
              code: getState().forgetPassword.code,
            }),
        }).then(response => response.json()).then(responseJson => {
          if (responseJson === 'success'){
          } else {
            alert('خطا در به روز رسانی اطلاعات');
          }
        });
        })
        .catch(err => {
          dispatch({type: GENERATE_CODE_SEND_INVALID});
          ToastAndroid.showWithGravityAndOffset(
           'کد ارسال نشد.',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        });
    }
  };
};
