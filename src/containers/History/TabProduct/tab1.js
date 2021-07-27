import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList,Vibration } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest,BASE_URL } from '@assets/constants';
import { Container, Content } from 'native-base';
import { WebView } from 'react-native-webview';

const Tab1 = (props) => {
    let ProductId = props.ProductId;
    return (
        <WebView source={{ uri: `${BASE_URL}Portal/ChiTiet?productId=${ProductId}` }} />
    )
}
export default Tab1;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
   
}
