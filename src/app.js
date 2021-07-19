import React, { Component } from 'react';
import Storage from '@src/Storage';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import AppContainer from '@containers/StackNavigation';
import { StatusBar, Platform, View, Alert, SafeAreaView, Vibration } from "react-native";
import SplashScreen from 'react-native-splash-screen'
const store = configureStore();
import { Themebackground, isAndroid, oneSignalID,urlAPI, headersRequest } from '@assets/constants';
import FlashMessage from "react-native-flash-message";
import TitleBar from '@components/TitleScreen/TitleBar';
// import Toast from 'react-native-toast-message'
import Toast from '@components/Toastmessage';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
    console.ignoredYellowBox = ['Setting a timer'];
    
  }
  
  componentDidMount() {
    
  }
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" translucent backgroundColor={'transparent'} />
          {/* <TitleBar barStyle="light-content" /> */}
          <AppContainer />
          <FlashMessage position="top" style={{ paddingTop: Platform.OS === 'android' ? 30 : 0 }} />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
      </Provider>
    );
  }
}

export default (App);
