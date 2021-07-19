import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList, Vibration } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest } from '@assets/constants';
import { Container, Content } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { fontSize, scale } from '@assets/config/RatioScale';
import HeaderComp from '@components/HeaderComp';
import Tab1 from './TabProduct/tab1';
import Tab2 from './TabProduct/tab2';
import Tab3 from './TabProduct/tab3';
import Tab4 from './TabProduct/tab4';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';

const App = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const showVerifyForm = () => {
        console.log('123')
    }
    const [routes] = React.useState([
        { key: 'first', title: 'Thông tin' },
        { key: 'second', title: 'Đại lý - NCC' },
        { key: 'three', title: 'Đánh giá' },
        { key: 'four', title: 'Đợt chăm sóc' },
    ]);
    const [index, setIndex] = React.useState(0);
    const renderScene = SceneMap({
        first: Tab1,
        second: Tab2,
        three: Tab3,
        four: Tab4,
    });
    const renderTabBar = props => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: colorDefault }}
          style={{ backgroundColor: '#fff',height:scale(50) }}
          activeColor = {'#515C6F'}
          inactiveColor ={'#ccc'}
          labelStyle = {{fontSize:fontSize(15)}}
        />
      );
    return (
        <Container style={{}}>
            <HeaderComp
                leftContainerStyle={{ flex: 0.5 }}
                rightContainerStyle={{
                    flex: 2
                }}
                centerComponent={{
                    text: 'Trứng vịt Hưng Phát',
                    style: {
                        color: 'white'
                    }
                }}
                goBack={onGoBack}
                rightComponent={<TouchableOpacity
                    onPress={showVerifyForm}
                >
                    <LinearGradient
                        colors={['#d9d9d9', '#999797', '#696969']}
                        style={{
                            flexDirection: "row",
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 8,
                            // justifyContent:'center',
                            alignItems: 'center'
                        }}>
                        <Image source={require('@assets/Images/Common/search.png')} style={{ width: scale(15), height: scale(15), resizeMode: 'contain' }} />
                        <Text style={{ fontSize: fontSize(15), color: "#fff", fontWeight: "bold", marginLeft: 5 }}>Check Tem</Text>
                    </LinearGradient>
                </TouchableOpacity>}
            />
            <Image
                style={{
                    width: deviceWidth,
                    height: deviceWidth * 2 / 3
                }}
                source={{
                    uri: 'https://placeimg.com/140/140/any'
                }}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: deviceWidth }}
                renderTabBar={renderTabBar}
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
