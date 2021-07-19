import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList,Vibration } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest,SwipeRow } from '@assets/constants';
import { Container, Content,Button,ListItem } from 'native-base';
import HeaderComp from '@components/HeaderComp';
import { TouchableRipple } from 'react-native-paper';
import { fontSize, scale } from '@assets/config/RatioScale';

const App = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const _Draw = () => {
        console.log('_Draw',props.navigation)
        props.navigation.toggleDrawer()
      }
    const goDetail = (item)=>{
        console.log('21123')
        props.navigation.navigate('DetailCare')
    }
    const addCareSession = ()=>{
        console.log('123')
        props.navigation.navigate('AddCare')
    }
    const renderItem = ({item}) =>{
        return(
            <ListItem style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#fff'}} noIndent
            onPress = {item=>goDetail(item)}
            >
                <Text>Tên đợt: Đợt chăm sóc cuối năm</Text>
                <Text>Ngày tạo: 13/07/2021</Text>
                <Text>Tên sp: Súp lơ</Text>
                <Text>Mã số hộ: 123</Text>
                <Text>Mô tả: đợt chăm sóc 2</Text>
            </ListItem>
        )
    }
    return (
        <Container style={{backgroundColor:'#fff'}}>
            <HeaderComp
                centerComponent={{
                    text: 'Đợt chăm sóc',
                    style: {
                        color: 'white',
                    }
                }}
                showDraw={_Draw}
                rightComponent={<TouchableRipple
                    onPress={addCareSession}
                   style={{padding:10}}
                >
                    <View  style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('@assets/Images/Common/add.png')} style={{ width: scale(15), height: scale(15), resizeMode: 'contain' }} />
                        <Text style={{ fontSize: fontSize(12), color: "#fff", fontWeight: "bold"}}>Thêm đợt</Text>
                        </View>

                </TouchableRipple>}
            />
           <FlatList
            data = {[{},{},{}]}
            renderItem = {renderItem}
           />
               
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
