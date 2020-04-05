import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Home from '../screen/home';
import Icon from 'react-native-vector-icons/Ionicons';
const screen = createStackNavigator();

function Main(props) {
  const {iconMenu} = styles;
  const {navigation} = props;
  return (
    <screen.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgb(1,147,207)',
          shadowColor: '#ccc',
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.9,
          shadowRadius: 5,
          elevation: 10,
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        ...TransitionPresets.SlideFromRightIOS,
        headerLeft: () => (
          <Icon
            name="md-menu"
            size={25}
            color="#fff"
            style={iconMenu}
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }}>
      <screen.Screen name="Home" component={Home} options={{title: 'خانه'}} />
    </screen.Navigator>
  );
}

const styles = StyleSheet.create({
  iconMenu: {
    padding: 15,
  },
});

export default Main;
