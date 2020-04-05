/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import Screens from './screens';
import DrawerComponent from '../components/drawer';

const drawer = createDrawerNavigator();

function Drawer() {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const screenStyle = {borderRadius, transform: [{scale}]};
  return (
    <LinearGradient
      style={{flex: 1}}
      colors={['#4c669f', '#3b5998', '#192f6a']}>
      <drawer.Navigator
        drawerStyle={{width: '60%', backgroundColor: 'transparent'}}
        overlayColor="transparent"
        drawerType="slide"
        edgeWidth={100}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContentOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'yellow',
        }}
        drawerContent={props => {
          setProgress(props.progress);
          return <DrawerComponent {...props} />;
        }}>
        <drawer.Screen name="screens">
          {props => <Screens {...props} style={screenStyle} />}
        </drawer.Screen>
      </drawer.Navigator>
    </LinearGradient>
  );
}

export default Drawer;