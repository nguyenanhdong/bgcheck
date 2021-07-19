import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList, Vibration } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest } from '@assets/constants';
import HeaderComp from '@components/HeaderComp';
import { ListItem } from 'react-native-elements';
import { fontSize, scale } from '@assets/config/RatioScale';
import { Container, Content, Button } from 'native-base';
import { TouchableRipple } from 'react-native-paper';

import moment from "moment";

const App = (props) => {
    const RenderStar = ({ bgColor, star }) => {
        return <View
            style={{
                backgroundColor: bgColor,
                padding: 5,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
                marginRight: 8
            }}
        >
            <Image source={require('@assets/Images/Common/star.png')} style={{ width: fontSize(13), height: fontSize(13), resizeMode: 'contain' }} />
            <Text style={{ fontSize: fontSize(13), letterSpacing: 1, color: '#fff', fontWeight: 'bold' }}>{star}</Text>
        </View>
    }
    const _Draw = () => {
        console.log('_Draw', props.navigation)
        props.navigation.toggleDrawer()
    }
    const goDetail = (item = null) => {
        console.log('132')
        props.navigation.navigate("ProductDetail", {
            productInfo: item
        })
    }
    const renderItem = ({ item }) => {
        return <ListItem
            onPress={goDetail}
            containerStyle={styles.ItemContent}
            style={styles._ListItem}
            leftAvatar={{
                size: 60,
                source: { uri: 'https://placeimg.com/140/140/any' }
            }}
            title={'Trừng vịt Hưng Phát'}
            titleStyle={{
                fontSize: fontSize(15),
            }}
            subtitle={<View
                style={{
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    marginTop: 5
                }}
            >
                <Text style={{ fontWeight: 'bold' }}>{moment().format('DD/MM/YYYY HH:mm')}</Text>
                <View style={{
                    flexDirection: "row",
                    marginTop: 8
                }}>
                    <RenderStar
                        bgColor={"#FFCC00"}
                        star={3}
                    />
                    <RenderStar
                        bgColor={"#E90F0F"}
                        star={0}
                    />
                </View>
            </View>}
        />
    }
    const showVerifyForm = () => {

    }
    return (
        <Container style={{}}>
            <HeaderComp
                // goBack={() => navigation.goBack()}
                showDraw={_Draw}
                centerComponent={{
                    text: 'Lịch sử',
                    style: {
                        color: 'white',
                    }
                }}
                rightComponent={<TouchableRipple
                    onPress={showVerifyForm}
                   style={{padding:10}}
                >
                    <View  style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('@assets/Images/Common/trash.png')} style={{ width: scale(15), height: scale(15), resizeMode: 'contain' }} />
                        <Text style={{ fontSize: fontSize(12), color: "#fff", fontWeight: "bold"}}>Xoá lịch sử</Text>
                        </View>

                </TouchableRipple>}
            />
            <View style={{
                flex: 1,
                // paddingHorizontal: 10
            }}>
                <FlatList
                    // refreshControlProps={{
                    //     refreshing: false,
                    //     // onRefresh: handlerRefresh
                    // }}
                    // emptyViewProps={{
                    //     bigTitle: 'Lịch sử Quét QRCode rỗng',
                    //     bigTitleStyle: {
                    //         color: 'black'
                    //     }
                    // }}
                    data={[{}]}
                    keyExtractor={(item, index) => index.toString()}
                    // onEndReachedThreshold={0}
                    // onEndReached={debounce(loadmore, 500)}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: 15 }}
                />
            </View>
        </Container>
    )
}

export default App;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    _ListItem: {
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 3,
        marginBottom: 8,
    },
    ItemContent: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

}
