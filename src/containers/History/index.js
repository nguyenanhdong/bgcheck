import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList, Vibration, Alert } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest,BASE_URL } from '@assets/constants';
import HeaderComp from '@components/HeaderComp';
import { ListItem } from 'react-native-elements';
import { fontSize, scale } from '@assets/config/RatioScale';
import { Container, Content, Button } from 'native-base';
import { TouchableRipple } from 'react-native-paper';
import Storage from '@src/Storage';
import { NormalText ,NormalFlashList} from '../../Theme';
import moment from "moment";

const App = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        getdata();
        props.navigation.addListener('willFocus', () => {
            console.log('voa day')
            getdata();
        });
    }, []);
    const getdata = ()=>{
        Storage.load({
            key: 'ProductHistory'
          }).then(result => {
            let data = result.map(item=>{
                return JSON.parse(item);
            });
            console.log('ProductHistory data',data)
            setData(data);
          }).catch(err => {
                console.log('err load ProductHistory')
          });
    }
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
        props.navigation.toggleDrawer()
    }
    const goDetail = (item = null) => {
        props.navigation.navigate("ProductDetail", {
            productInfo: item
        })
    }
    const renderItem = ({ item }) => {
        // return <TouchableOpacity
        // onPress={()=>goDetail(item)}
        // style={{padding:20}}
        // >
        //         <Text>{item.SanPham.Ten}</Text>
        // </TouchableOpacity>
        return <ListItem
            onPress={()=>goDetail(item)}
            containerStyle={styles.ItemContent}
            style={styles._ListItem}
            leftAvatar={{
                size: 60,
                source: { uri: BASE_URL + item.SanPham.UrlThumb  }
            }}
            title={item.SanPham.Ten}
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
                <Text style={{ fontWeight: 'bold' }}>{moment(item.time).format('DD/MM/YYYY HH:mm')}</Text>
                <View style={{
                    flexDirection: "row",
                    marginTop: 8
                }}>
                    <RenderStar
                        bgColor={"#FFCC00"}
                        star={item?.Diem?.ChatLuong || 0}
                    />
                    <RenderStar
                        bgColor={"#E90F0F"}
                        star={item?.Diem?.NhuCau || 0}
                    />
                </View>
            </View>}
        />
    }
    const clearData = () => {
        Alert.alert(
            'D??? li???u ???? qu??t QR c???a b???n s??? m???t. B???n c?? ch???c ch???n mu???n xo?? l???ch s????',
            "",
            [
                {
                    text:'Hu???',
                    onPress : ()=>{console.log('hu???')},
                    style:'cancel'
                },
                {
                    text:'?????ng ??',
                    onPress : ()=>{removeData()}
                }
            ]
        )
    }
    const removeData = ()=>{
        console.log('vvao day')
        Storage.remove({
            key: 'ProductHistory'
        });
        setData([]);
    }
    return (
        
        <Container style={{}}>
            {console.log('render')}
            <HeaderComp
                // goBack={() => navigation.goBack()}
                showDraw={_Draw}
                centerComponent={{
                    text: 'L???ch s???',
                    style: {
                        color: 'white',
                    }
                }}
                rightComponent={<TouchableRipple
                    onPress={clearData}
                   style={{paddingVertical:10}}
                >
                    <View  style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('@assets/Images/Common/trash.png')} style={{ width: scale(15), height: scale(15), resizeMode: 'contain' }} />
                        <Text style={{ fontSize: fontSize(12), color: "#fff", fontWeight: "bold"}}>Xo?? l???ch s???</Text>
                    </View>

                </TouchableRipple>}
            />
            <View style={{
                flex: 1,
                // paddingHorizontal: 10
            }}>
                <NormalFlashList
                    refreshControlProps={{
                        refreshing: false,
                        onRefresh: getdata
                    }}
                    emptyViewProps={{
                        bigTitle: 'L???ch s??? Qu??t QRCode r???ng',
                        bigTitleStyle: {
                            color: 'black',
                            fontSize:14
                        }
                    }}
                    data={data}
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
