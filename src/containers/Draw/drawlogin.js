
import * as React from 'react';
import { Button, View } from 'react-native';
import Login from '@containers/Login';
import Home from '@containers/Home';
import History from '@containers/History';
import Setting from '@containers/Setting';
import {createAppContainer} from 'react-navigation';

import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawerContentComponent  from './CustomDrawerContentComponent';


const Drawer = createDrawerNavigator(
  {
    Home:{
        screen:Home,
        navigationOptions:{
          title:'Trang chủ'
        }
    },
    History:{
        screen:History,
        navigationOptions:{
          title:'Lịch sử'
        }
    },
    Setting:{
        screen:Setting,
        navigationOptions:{
          title:'Cài đặt'
        }
    },
    // Login:{
    //     screen:Login,
    //     navigationOptions:{
    //       title:'Đăng nhập'
    //     }
    // },
  },
  {
    initialRouteName: "Home",
    drawerType:'front',
    contentComponent: CustomDrawerContentComponent,
  },

);
export default createAppContainer(Drawer);