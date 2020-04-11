import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {
  back_button,
  nameChanged,
  emailChanged,
  passwordChanged,
  confirmPasswordChanged,
  signUpAttempt,
} from '../action/signup';
import {Logo} from '../image/index';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  UNSAFE_componentWillMount = () => {
    this.setState({height: Dimensions.get('window').height - 130});
  };

  setName = value => {
    this.props.nameChanged(value);
  };

  setEmail = value => {
    this.props.emailChanged(value);
  };

  setPassword = value => {
    this.props.passwordChanged(value);
  };

  confirmPassword = value => {
    this.props.confirmPasswordChanged(value);
  };
  signupUser = () => {
    const {
      name,
      email,
      password,
      borderEmail,
      borderPass,
      confirmPassword,
    } = this.props;
    this.props.signUpAttempt({
      name,
      email,
      password,
      borderEmail,
      borderPass,
      confirmPassword,
    });
  };
  render() {
    const {
      main,
      container,
      logo,
      logoImage,
      signUp,
      inputText,
      buttonSignUp,
      buttonSignUpText,
      bss,
    } = styles;
    const {
      borderName,
      borderEmail,
      borderPass,
      name,
      email,
      password,
      confirmPassword,
      loading,
    } = this.props;
    return (
      <View style={main}>
        <ScrollView>
          <View
            style={[
              container,
              {
                height: this.state.height,
              },
            ]}>
            <View style={logo}>
              <Image source={Logo} style={logoImage} resizeMode="cover" />
            </View>
            <View style={signUp}>
              <TextInput
                placeholder="نام"
                style={[inputText, {borderColor: borderName}]}
                onChangeText={value => this.setName(value)}
                value={name}
              />
              <TextInput
                placeholder="ایمیل"
                value={email}
                style={[inputText, {borderColor: borderEmail}]}
                onChangeText={value => this.setEmail(value)}
                keyboardType="email-address"
              />
              <TextInput
                placeholder="رمز عبور"
                value={password}
                style={[inputText, {borderColor: borderPass}]}
                secureTextEntry={true}
                onChangeText={value => this.setPassword(value)}
              />
              <TextInput
                placeholder="تایید رمز عبور"
                value={confirmPassword}
                style={[inputText, {borderColor: borderPass}]}
                secureTextEntry={true}
                onChangeText={value => {
                  this.confirmPassword(value);
                }}
              />
            </View>
            <View style={buttonSignUp}>
              <TouchableOpacity
                style={bss}
                activeOpacity={1}
                onPress={() => this.signupUser()}>
                {!loading ? (
                  <Text style={buttonSignUpText}>ثبت نام</Text>
                ) : (
                  <ActivityIndicator color="#fff" />
                )}
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              style={linkLogin}
              onPress={() => navigation.navigate('Login')}>
              <Icon name="md-arrow-back" size={25} color="rgb(1,147,207)" />
            </TouchableOpacity> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    borderName: state.signUp.borderName,
    borderEmail: state.signUp.borderEmail,
    borderPass: state.signUp.borderPass,
    name: state.signUp.name,
    email: state.signUp.email,
    password: state.signUp.password,
    confirmPassword: state.signUp.confirmPassword,
    loading: state.signUp.loading,
  };
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    width: '90%',
    maxWidth: 380,
    maxHeight: 600,
    backgroundColor: '#fff',
    marginLeft: '5%',
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
  signUp: {
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputText: {
    width: '90%',
    height: 50,
    padding: 10,
    // borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    marginVertical: 10,
  },
  buttonSignUp: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  bss: {
    backgroundColor: 'red',
    width: 100,
    padding: 10,
    borderRadius: 5,
  },
  buttonSignUpText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
  linkLogin: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#eee',
    width: 45,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default connect(
  mapStateToProps,
  {
    back_button,
    nameChanged,
    emailChanged,
    passwordChanged,
    confirmPasswordChanged,
    signUpAttempt,
  },
)(SignUp);
