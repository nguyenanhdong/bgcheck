import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList,Vibration } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest } from '@assets/constants';
import { Container, Content,Button } from 'native-base';
import HeaderComp from '@components/HeaderComp';
import HomeSlide from './HomeSlide';

const App = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const _Draw = () => {
        console.log('_Draw',props.navigation)
        props.navigation.toggleDrawer()
      }
    const goCheck = ()=>{
        props.navigation.navigate('ScanScreen')
    }
    return (
        <Container style={{backgroundColor:'#ccc'}}>
            <HeaderComp
                centerComponent={{
                    text: 'Trang chủ',
                    style: {
                        color: 'white',
                    }
                }}
                showDraw={_Draw}
            />
            <Content>
                <HomeSlide />
            </Content >
            <Button full 
            style={{backgroundColor:colorDefault,justifyContent:'center',alignItems:'center',height:60}}
            onPress = {goCheck}
            >
                <Text style={{color:'#fff'}}>Kiểm tra mã</Text>
            </Button>
        </Container>
    )
}

export default App;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
   
}
