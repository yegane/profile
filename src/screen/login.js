import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Logo} from '../image/index';
import {connect} from 'react-redux';
import {
  emailChanged,
  passwordChanged,
  login_User,
  Sign_Up,
} from '../action/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  UNSAFE_componentWillMount = () => {
    this.setState({height: Dimensions.get('window').height - 130});
  };

  emailChange = value => {
    this.props.emailChanged(value);
  };

  passwordChange = value => {
    this.props.passwordChanged(value);
  };

  signUp = () => {
    this.props.Sign_Up();
    this.props.navigation.navigate('SignUp');
  };

  loginUser = () => {
    const {email, password} = this.props;
    this.props.login_User({email, password});
  };

  render() {
    const {
      main,
      container,
      logo,
      logoImage,
      login,
      inputText,
      forgetPass,
      buttonLogin,
      buttonLoginText,
      linkSignUp,
      bls,
    } = styles;
    return (
      <View style={main}>
        <ScrollView>
          <View style={[container, {height: this.state.height}]}>
            <View style={logo}>
              <Image source={Logo} style={logoImage} resizeMode="cover" />
            </View>
            <View style={login}>
              <TextInput
                placeholder="ایمیل"
                keyboardType="email-address"
                style={[inputText, {borderColor: this.props.borderError}]}
                onChangeText={value => this.emailChange(value)}
                value={this.props.email}
              />
              <TextInput
                placeholder="رمز عبور"
                style={inputText}
                secureTextEntry={true}
                onChangeText={value => this.passwordChange(value)}
                value={this.props.password}
              />
            </View>
            <View style={forgetPass}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgetPassword')
                }>
                <Text>فراموش کردن رمز عبور</Text>
              </TouchableOpacity>
            </View>
            <View style={buttonLogin}>
              <TouchableOpacity
                style={bls}
                activeOpacity={1}
                onPress={() => this.loginUser()}>
                {!this.props.loading ? (
                  <Text style={buttonLoginText}>ورود</Text>
                ) : (
                  <ActivityIndicator color="#fff" />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={linkSignUp} onPress={() => this.signUp()}>
              <Text>ثبت نام</Text>
            </TouchableOpacity>
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
  titleText: {
    fontSize: 25,
  },
  login: {
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
  forgetPass: {
    paddingLeft: 35,
    paddingTop: 5,
  },
  buttonLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
  },
  bls: {
    backgroundColor: 'red',
    width: 100,
    padding: 10,
    borderRadius: 5,
  },
  buttonLoginText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
  },
  linkSignUp: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    loading: state.auth.loading,
    borderError: state.auth.borderError,
    title: state.auth.titleOfScreen,
  };
};

export default connect(
  mapStateToProps,
  {emailChanged, passwordChanged, login_User, Sign_Up},
)(Login);
