/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Logo} from '../image/index';
import {
  buttonUpdatePassword,
  passwordChanged,
  confirmPasswordChanged,
} from '../action/changePassword';

class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  changePassword = value => {
    this.props.passwordChanged(value);
  };

  changeConfirmPassword = value => {
    this.props.confirmPasswordChanged(value);
  };

  updatePassword = () => {
    const {password, confirmPassword, borderPassword, navigation} = this.props;
    this.props.buttonUpdatePassword({password, confirmPassword, borderPassword, navigation});
  };

  UNSAFE_componentWillMount = () => {
    this.setState({height: Dimensions.get('window').height - 130});
  };

  render() {
    const {
      main,
      container,
      logo,
      logoImage,
      changePassword,
      inputText,
      buttonChangePassword,
      textButtonChangePassword,
    } = styles;
    const {borderPassword, password, confirmPassword, loading} = this.props;
    return (
      <View style={main}>
        <ScrollView>
          <View style={[container, {height: this.state.height}]}>
            <View style={logo}>
              <Image source={Logo} style={logoImage} />
            </View>
            <View style={changePassword}>
              <TextInput
                placeholder="رمز عبور جدید"
                secureTextEntry={true}
                style={[inputText, {borderColor: borderPassword}]}
                onChangeText={value => this.changePassword(value)}
                value={password}
              />
              <TextInput
                placeholder="تایید رمز عبور جدید"
                secureTextEntry={true}
                style={[inputText, {borderColor: borderPassword}]}
                onChangeText={value => this.changeConfirmPassword(value)}
                value={confirmPassword}
              />

              <TouchableOpacity
                style={buttonChangePassword}
                activeOpacity={0.6}
                onPress={() => this.updatePassword()}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={textButtonChangePassword}>اعمال تغییرات</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    width: '85%',
    maxWidth: 380,
    maxHeight: 600,
    backgroundColor: '#fff',
    marginLeft: '7.5%',
    borderRadius: 5,
    marginTop: 15,
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  changePassword: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    width: '85%',
    height: 50,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    marginVertical: 15,
  },
  buttonChangePassword: {
    backgroundColor: 'red',
    padding: 15,
    width: 120,
    marginTop: 50,
    borderRadius: 5,
  },
  textButtonChangePassword: {
    color: '#fff',
    textAlign: 'center',
  },
});

const mapStateToProps = state => {
  return {
    borderPassword: state.changePassReducer.borderPassword,
    password: state.changePassReducer.password,
    confirmPassword: state.changePassReducer.confirmPassword,
    loading: state.changePassReducer.loading,
  };
};

export default connect(
  mapStateToProps,
  {buttonUpdatePassword, passwordChanged, confirmPasswordChanged},
)(ChangePasswordScreen);
