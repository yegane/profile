/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  StyleSheet,
  Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {Sign_Out} from '../action/index';
import {changePasswordButton} from '../action/profile';
import {sendPay, resultPayment} from '../action/payment';

class Profile extends React.Component {
  componentDidMount = () => {
    // Linking.getInitialURL().then(url => this.navigate(url));
  };

  navigate = url => {
    if (url !== null) {
      console.log(url);
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.split('/')[1];
      const routeName = route.split('/')[0];
      const {navigation} = this.props;
      this.props.resultPayment(id, routeName, {navigation});
    }
  };

  sign_out = async () => {
    await AsyncStorage.setItem('token', 'false');
    this.props.Sign_Out();
  };

  changePassword = () => {
    const {navigation} = this.props;
    this.props.changePasswordButton({navigation});
  };

  payment = () => {
    this.props.sendPay();
  };

  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity
          style={{width: 150, padding: 15, backgroundColor: 'red'}}
          onPress={() => this.sign_out()}>
          <Text>خروج</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: 150, padding: 15, backgroundColor: '#d2e33e'}}
          onPress={() => this.changePassword()}>
          <Text>تغییر رمز عبور</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: 150, padding: 15, backgroundColor: '#d2e33e'}}
          onPress={() => this.props.navigation.navigate('QrCodeScan')}>
          <Text>اسکن بار کد</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{width: 150, padding: 15, backgroundColor: '#d2e33e'}}
          onPress={() => this.payment()}>
          <Text>خرید</Text>
        </TouchableOpacity>

        <Text style={{color: this.props.color}}>{this.props.texts}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#41d5f8',
  },
});
const mapStateToProps = state => {
  return {
    text: state.profileReducer.text,
    loadingDownload: state.profileReducer.loadingDownload,
    color: state.paymentReducer.color,
    texts: state.paymentReducer.text,
  };
};

export default connect(
  mapStateToProps,
  {Sign_Out, changePasswordButton, sendPay, resultPayment},
)(Profile);
