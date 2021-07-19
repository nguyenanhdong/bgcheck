import React from 'react';
import { View, Image, StatusBar, StyleSheet, Platform } from 'react-native';
import { deviceWidth, isAndroid, colorDefault } from '@assets/constants';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const TitleBar = () => {
  return (
    <View>
      <GeneralStatusBarColor barStyle="light-content" />
    </View>
  );
}

const GeneralStatusBarColor = ({ ...props }) => (
  <View style={styles.statusBar}>
    <StatusBar translucent {...props} />
  </View>
);

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 30 : StatusBar.currentHeight;
export default TitleBar;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: colorDefault,
    ...ifIphoneX({
      height: 48
    })
  }
});

