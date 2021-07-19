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
    const goDetail = ()=>{
        console.log('1231')
    }
    const addRow = () => {
        props.addRow('AddFertilizer');
    }
    const renderItem = ({item}) =>{
        return(
            <ListItem style={{flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',backgroundColor:'#fff'}} noIndent
            onPress = {goDetail}
            >
                <Text>Người bón: Đợt chăm sóc cuối năm</Text>
                <Text>Ngày bón: 13/07/2021</Text>
                <Text>Tên thương phẩm: Thuốc trừ sâu</Text>
                
            </ListItem>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={[{}, {}, {}]}
                renderItem={renderItem}
            />
            <Button
                style={styles.touchAdd}
                onPress={addRow}
            >
                <Image source={require('@assets/Images/Common/add.png')} style={styles.IconAdd} />
            </Button>
        </View>
    )
}

export default App;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    touchAdd: { position: 'absolute', bottom: 50, width: 60, height: 60, backgroundColor: colorDefault, right: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 30 },
    IconAdd: { width: scale(25), height: scale(25), resizeMode: 'contain' }
}
