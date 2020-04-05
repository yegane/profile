/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Image} from 'react-native';
import {profileImage} from '../image/index';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function DrawerComponent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={profileImage}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            marginTop: 15,
            marginBottom: 15,
          }}
          resizeMode="cover"
        />
        <Text style={{color: '#fff'}}>{props.nameOfProfile}</Text>
      </View>
      {/* <DrawerItemList
        {...props}
        activeTintColor="red"
        labelStyle={{fontSize: 15}}
      /> */}
      <DrawerItem
        label="خانه"
        onPress={() => props.navigation.navigate('Main')}
        labelStyle={{fontSize: 15, marginLeft: -15, color: '#fff'}}
        icon={({focused}) => (
          <Icon name="md-home" size={25} color={focused ? 'red' : '#fff'} />
        )}
      />
      <DrawerItem
        label="پروفایل"
        onPress={() => props.navigation.navigate('Account')}
        labelStyle={{fontSize: 15, marginLeft: -15, color: '#fff'}}
        icon={() => <Icon name="md-person" size={25} color="#fff" />}
      />
    </DrawerContentScrollView>
  );
}

const mapStateToProps = state => {
  return {
    nameOfProfile: state.auth.nameOfProfile,
  };
};

export default connect(
  mapStateToProps,
  null,
)(DrawerComponent);
