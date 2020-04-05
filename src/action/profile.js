import {CHANGE_PASSWORD, DOWNLOAD_FILE} from './type';
import RNFS from 'react-native-fs';

export const changePasswordButton = ({navigation}) => {
  return dispatch => {
    dispatch({type: CHANGE_PASSWORD});
    navigation.navigate('ChangePasswordScreen');
  };
};
