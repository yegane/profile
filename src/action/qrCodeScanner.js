/* eslint-disable no-alert */
import {START_SCAN_QR_CODE, SCAN_DONE} from './type';
import {PermissionsAndroid, Linking} from 'react-native';

export const openScanner = () => {
  return dispatch => {
    dispatch({type: START_SCAN_QR_CODE});
    startOpenScanner();
  };
};

export const scanDon = value => {
  return dispatch => {
    dispatch({type: SCAN_DONE, payload: value});
    Linking.openURL(value);
  };
};

const startOpenScanner = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera App Permission',
        message: 'Camera App needs access to your camera ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('ok');
    } else {
      console.log('not allow');
    }
  } catch (error) {
    alert(error);
  }
};
