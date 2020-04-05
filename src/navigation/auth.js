import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Login from '../screen/login';
import SignUp from '../screen/signup';
import ForgetPassword from '../screen/forgetpassword';

const auth = createStackNavigator();

function Auth() {
  return (
    <auth.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...TransitionPresets.ModalPresentationIOS,
        headerStyle: {
          backgroundColor: 'rgb(1,147,207)',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <auth.Screen
        name="Login"
        component={Login}
        options={{
          title: 'ورود',
        }}
      />
      <auth.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: 'ثبت نام',
        }}
      />
      <auth.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          title: 'رمز عبور',
        }}
      />
    </auth.Navigator>
  );
}

export default Auth;
