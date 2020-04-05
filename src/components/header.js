/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class Header extends React.Component {
  render() {
    const {
      main,
      iconRightView,
      titleView,
      iconLeftView,
      iconRight,
      iconLeft,
      titleText,
    } = styles;
    const {iconLeftDisplay, title, navigation} = this.props;
    return (
      <View style={main}>
        <View style={iconRightView}>
          <Icon
            name="md-menu"
            color="#fff"
            size={25}
            style={[iconRight, {display: 'flex'}]}
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View style={titleView}>
          <Text style={titleText}>{title}</Text>
        </View>
        <View style={iconLeftView}>
          <Icon
            name="md-arrow-back"
            color="#fff"
            size={25}
            style={[iconLeft, {display: iconLeftDisplay}]}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'rgb(1,147,207)',
  },
  iconRightView: {
    width: '28.33%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  iconRight: {
    padding: 15,
  },
  titleView: {
    width: '43.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: '#fff',
    fontSize: 20,
  },
  iconLeftView: {
    width: '28.33%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconLeft: {
    padding: 15,
  },
});

export {Header};
