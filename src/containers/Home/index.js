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
            <View style={{justifyContent:'center',flex:1}}>
                <View style={{flex:1}}><HomeSlide /></View>
                
            </View>
            
           
            <Button full 
            style={{backgroundColor:colorDefault,justifyContent:'center',alignItems:'center',height:60,position:'absolute',bottom:0,width:'100%'}}
            onPress = {goCheck}
            >
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={require('@assets/Images/Common/qr_code.png')} style={{width:30,height:30}}/>
                <Text style={{color:'#fff'}}>Quét QRCode</Text>
                </View>
                
                
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
