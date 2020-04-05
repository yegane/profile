/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from '../screen/home';
import Account from '../navigation/account';
import Main from '../navigation/main';
import Animated from 'react-native-reanimated';
import {connect} from 'react-redux';

const screen = createStackNavigator();

function Screens(props) {
  return (
    <Animated.View style={[{flex: 1}, props.style]}>
      <screen.Navigator
        headerMode="none"
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'rgb(1,147,207)',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <screen.Screen name="Main" component={Main} />
        <screen.Screen name="Account" component={Account} />
      </screen.Navigator>
    </Animated.View>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Screens);
