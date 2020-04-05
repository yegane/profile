/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {connect} from 'react-redux';
import ChangePasswordScreen from '../screen/changePassword';
import Profile from '../screen/profile';
import {profileImage} from '../image/index';
import Icon from 'react-native-vector-icons/Ionicons';
import QrCodeScan from '../screen/qrCodeScan';

const screen = createStackNavigator();

function Account(props) {
  const {navigation} = props;
  const {iconLeft} = styles;
  return (
    <screen.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(1,147,207)',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <screen.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'پروفایل',
          headerRight: () => (
            <Image
              source={profileImage}
              style={{
                width: 45,
                height: 45,
                borderRadius: 45,
                marginRight: 10,
              }}
              resizeMode="cover"
            />
          ),
          headerLeft: () => (
            <Icon
              name="md-menu"
              size={25}
              color="#fff"
              style={iconLeft}
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        }}
      />
      <screen.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{title: 'تغییر رمز عبور'}}
      />
      <screen.Screen
        name="QrCodeScan"
        component={QrCodeScan}
        options={{title: 'اسکن بار کد'}}
      />
    </screen.Navigator>
  );
}

const styles = StyleSheet.create({
  iconLeft: {
    padding: 15,
  },
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Account);
