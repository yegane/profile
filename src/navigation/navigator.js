import 'react-native-gesture-handler';
import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {connect} from 'react-redux';
import {login_User, checkAuth} from '../action/index';
import Auth from '../navigation/auth';
import Drawer from '../navigation/drawer';

const Root = createStackNavigator();

class Navigator extends React.Component {
  componentDidMount = () => {
    this.props.checkAuth();
  };
  render() {
    const {loadingPage} = styles;
    const {token, loadingSplash} = this.props;
    if (loadingSplash === 'true') {
      return (
        <View style={loadingPage}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <NavigationContainer>
        <Root.Navigator headerMode="none">
          {token === 'false' ? (
            <Root.Screen name="auth" component={Auth} />
          ) : (
            <Root.Screen name="drawer" component={Drawer} />
          )}
        </Root.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  loadingPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    loadingSplash: state.auth.loadingSplash,
  };
};

export default connect(
  mapStateToProps,
  {login_User, checkAuth},
)(Navigator);
