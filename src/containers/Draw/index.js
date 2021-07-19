
import * as React from 'react';
import { Button, View } from 'react-native';
import Login from '@containers/Login';
import Home from '@containers/Home';
import History from '@containers/History';
import CareSession from '@containers/CareSession';
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
    CareSession:{
        screen:CareSession,
        navigationOptions:{
          title:'Đợt chăm sóc'
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