
import React, { Component, useEffect, useState, useCallback } from "react";
import { Button, View, Image, Alert } from 'react-native';
import Text from '@components/Text';
import { TouchableRipple } from 'react-native-paper';
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest } from '@assets/constants';
import { DrawerItems } from 'react-navigation-drawer';
import { Container, Content, Header, Body, ListItem, Right, Left ,Thumbnail} from 'native-base';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { NavigationActions, StackActions } from 'react-navigation';

const resetAction = StackActions.reset({
  index: 0,
  // actions: [NavigationActions.navigate({ routeName: 'Home' })],
  actions: [NavigationActions.navigate({ routeName: 'Draw' })],
});
const styles = {
  drawerImage: {
    height: 70,
    width: 70,
    resizeMode: 'contain'
  },
  drawerHeader: {
    paddingTop:40,
    height: 140,    
  }
}
const routerDefault = [
  {key: "Home", routeName: "Home"},
  {key: "History", routeName: "History"},
]
const routerLogin = [
  {key: "Home", routeName: "Home"},
  {key: "History", routeName: "History"},
  {key: "CareSession", routeName: "CareSession"},
]
const CustomDrawerContentComponent = (props) => {
  const isLogin = useSelector(state => state.app.isLogin);
  const userInfo = useSelector(state => state.app.userInfo);
  const dispatch = useDispatch();
  const login = ()=>{
    console.log('login');
    props.navigation.navigate('Login')
  }
  const logout = ()=>{
    Alert.alert(
      "Bạn muốn đăng xuất khỏi tài khoản này",
      "",
      [
        {
          text: "Huỷ",
          onPress: () => console.log('Cancel'),
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => props.navigation.navigate('Logout'),
        },
      ],
      {
        cancelable: true,
      }
    );
    // props.navigation.dispatch(resetAction);
  }
  return(
    
  <Container>
   
    <ListItem style={styles.drawerHeader}  noIndent>
      <Thumbnail large source={userInfo?.Avatar ? {uri:userInfo?.Avatar}  : require('@assets/Images/Common/avatar.png')} style={{marginRight:20}}/>
      <Body>
        <Text>Xin chào</Text>
        { isLogin ? <Text style={{color:colorDefault,fontSize:15}}>{userInfo?.DisplayName}</Text>:
        <TouchableRipple  
        style={{justifyContent:'center',alignItems:'flex-start',height:40}}
      onPress = {login}
      >
          <Text style={{color:colorDefault,textDecorationLine:'underline',fontSize:15}}>Đăng nhập</Text>
      </TouchableRipple>
      }
      </Body>
    </ListItem>
    <Content>
      <DrawerItems {...props} 
      items={isLogin ?routerLogin  : routerDefault}
      />
      {isLogin && <TouchableRipple  
        style={{justifyContent:'center',alignItems:'flex-start',height:40,paddingLeft:15}}
      onPress = {logout}
      >
          <Text style={{fontSize:15,fontWeight:'bold',color:colorDefault}}>Đăng xuất</Text>
      </TouchableRipple>}
    </Content>
    <Text style={{marginBottom:20,marginLeft:15}}>Phiên bản: 1.0</Text>
  </Container>
)}
export default CustomDrawerContentComponent;