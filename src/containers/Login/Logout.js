import React, { Component, useEffect, useState, useCallback } from "react";
import {
  View,
  
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { logout } from '@containers/Home/actions';
import { useSelector, useDispatch, shallowEqual } from "react-redux";

const resetAction = StackActions.reset({
  index: 0,
  // actions: [NavigationActions.navigate({ routeName: 'Home' })],
  actions: [NavigationActions.navigate({ routeName: 'Draw' })],
});
const  Logout = (props) => {
  const dispatch = useDispatch();
    useEffect(() => {
      console.log('logout');
      props.navigation.dispatch(resetAction);
      dispatch(logout());
    }, []);
    return (
      <View></View>
    );
}
export default Logout;