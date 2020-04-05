import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {Logo} from '../image/index';
import {emailChanged, sendButtonCode} from '../action/forgetPassword';

class ForgetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  emailChange = value => {
    this.props.emailChanged(value);
  };

  sendCode = () => {
    const {navigation} = this.props;
    this.props.sendButtonCode({navigation});
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
      forget,
      inputText,
      sendButton,
      sendButtonText,
    } = styles;
    const {email, borderEmail, loading} = this.props;
    return (
      <View style={main}>
        <ScrollView>
          <View style={[container, {height: this.state.height}]}>
            <View style={logo}>
              <Image source={Logo} style={logoImage} />
            </View>
            <View style={forget}>
              <TextInput
                placeholder="ایمیل"
                style={[inputText, {borderColor: borderEmail}]}
                keyboardType="email-address"
                onChangeText={value => this.emailChange(value)}
                value={email}
              />
              <TouchableOpacity
                style={sendButton}
                onPress={() => this.sendCode()}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={sendButtonText}>ارسال کد</Text>
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
  forget: {
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
  sendButton: {
    backgroundColor: 'red',
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    marginTop: 40,
  },
  sendButtonText: {
    fontSize: 15,
    color: '#fff',
  },
});

const mapStateToProps = state => {
  return {
    email: state.forgetPassword.email,
    borderEmail: state.forgetPassword.borderEmail,
    loading: state.forgetPassword.loading,
  };
};

export default connect(
  mapStateToProps,
  {emailChanged, sendButtonCode},
)(ForgetPassword);
