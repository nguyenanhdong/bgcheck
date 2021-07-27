import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList, Vibration, Alert } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest, dataDemo, BASE_URL } from '@assets/constants';
import { Container, Content } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { fontSize, scale } from '@assets/config/RatioScale';
import HeaderComp from '@components/HeaderComp';
import Tab1 from './TabProduct/tab1';
import Tab2 from './TabProduct/tab2';
import Tab3 from './TabProduct/tab3';
import Tab4 from './TabProduct/tab4';
import VerifyModal from './VerifyModal';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { showMessage } from 'react-native-flash-message';
import Load from "../Home/load";

const App = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const showVerifyForm = () => {
        verifyModal && verifyModal.show()
    }
    let verifyModal = null;
    let boxload = null;
    const [routes] = React.useState([
        { key: 'first', title: 'Thông tin' },
        { key: 'second', title: 'Đại lý - NCC' },
        { key: 'three', title: 'Đánh giá' },
        { key: 'four', title: 'Nhật ký ' },
    ]);
    const [index, setIndex] = React.useState(0);
    const productInfo = props.navigation.state.params.productInfo;
    console.log('productInfo', productInfo)
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Tab1 ProductId={productInfo?.SanPham?.Id} />;
            case 'second':
                return <Tab2 items={productInfo?.NhaCungCap || []} />;
            case 'three':
                return <Tab3 productInfo={productInfo} />;
            case 'four':
              return <Tab4 productInfo={productInfo} />;
            default:
                return null;
        }
    }
    const Verify = (temCode) => {
        boxload.showload();
        let url = `${BASE_URL}API/Verify?temId=${productInfo.temID}&temCode=${temCode}`;
        console.log('url',url)
        axios.get(url, {}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-localization': 'vi'
            },
        })
            .then((response) => {
                console.log('response product', response);
                if (response.status == 200) {
                    let resJson = response.data;
                    if (resJson == 0) {
                        Alert.alert(
                            "Lỗi",
                            "Tem bạn nhập không tồn tại, vui lòng kiểm tra lại!"
                        )
                    } else if (resJson == 1) {
                        Alert.alert(
                            "Tem hợp lệ!",
                            "Xác thực thành công!"
                        )

                    } else if (resJson == 2) {
                        Alert.alert(
                            "Tem đã sử dụng!",
                            "Tem của bạn đã từng được kiểm tra trước đây, kiểm tra lại!"
                        )
                    }

                } else
                    showMessage({
                        message: 'Có lỗi xảy ra. Vui lòng thử lại sau ít phút!',
                        duration: 3000,
                        type: "danger",
                        icon: 'danger'
                    });
            })
            .catch(function (error) {
                console.log('error', error)
                showMessage({
                    message: 'Có lỗi xảy ra. Vui lòng tắt thoát app và thử lại !',
                    duration: 3000,
                    type: "danger",
                    icon: 'danger'
                });
            })
            .finally(function () {
                // setLoad(false);
                if (boxload)
                    boxload.hideload();
            });

    }
    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colorDefault }}
            style={{ backgroundColor: '#fff', height: scale(50) }}
            activeColor={'#515C6F'}
            inactiveColor={'#ccc'}
            labelStyle={{ fontSize: fontSize(15) }}
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
                    text: productInfo?.SanPham?.Ten,
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
                    uri: BASE_URL + productInfo.SanPham.UrlThumb
                }}
            />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: deviceWidth }}
                renderTabBar={renderTabBar}
            />
            <VerifyModal
                ref={ref => verifyModal = ref}
                Verify={Verify}
            />
            <Load ref={ref => boxload = ref} />
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
