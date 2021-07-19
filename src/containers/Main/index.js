import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { colorDefault } from '@assets/constants';
import Diary from '@containers/Diary';
import History from '@containers/History';
import Qrcode from '@containers/Qrcode';
import Setting from '@containers/Setting';
import Me from '@containers/Me';
import { View, TouchableOpacity, Image, ScrollView, Animated, Easing, Alert, ImageBackground, ActivityIndicator, StyleSheet, PermissionsAndroid, Linking } from 'react-native';

const styles = {
  icon: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
    // marginBottom:2
  },
};

const BottomNavigator = createBottomTabNavigator(
  {
    History: {
      screen: History,
      // title: 'Giao dịch',
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          tabBarIcon: ({ focused }) => {
            let icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            if (focused)
              icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            return icon_source;
          },
          title: 'Lịch sử'
        };
      },
    },
    Diary: {
      screen: Diary,
      // title: 'Giao dịch',
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          tabBarIcon: ({ focused }) => {
            let icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            if (focused)
              icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            return icon_source;
          },
          title: 'Nhật ký'
        };
      },
    },
    Qrcode: {
      screen: Qrcode,
      // title: 'Giao dịch',
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          tabBarIcon: ({ focused }) => {
            let icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            if (focused)
              icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            return icon_source;
          },
          title: 'Quét mã'
        };
      },
    },
    Setting: {
      screen: Setting,
      // title: 'Giao dịch',
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          tabBarIcon: ({ focused }) => {
            let icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            if (focused)
              icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            return icon_source;
          },
          title: 'Cài đặt'
        };
      },
    },
    Me: {
      screen: Me,
      // title: 'Giao dịch',
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          tabBarIcon: ({ focused }) => {
            let icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            if (focused)
              icon_source = <Image source={require('@assets/Images/Common/menu_history.png')} style={styles.icon}/>
            return icon_source;
          },
          title: 'Tài khoản'
        };
      },
    },
    
  },
  {
    initialRouteName: 'History',

    tabBarOptions: {
      activeTintColor: colorDefault,
      inactiveTintColor: '#3a3a3a',
      labelStyle: { fontSize: 12 },
      style: { paddingTop: 5, height: 50 },
    },
    // tabBarComponent: (props) => (
    //   <TabBar {...props} />
    // ),
    lazy: false
  },
);
const Container = createAppContainer(BottomNavigator);

export default Container;
