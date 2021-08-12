import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import SubmitCodeText from './SubmitCodeText'
import { ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';
import HeaderComp from '@components/HeaderComp';
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest, BASE_URL } from '@assets/constants';
import Text from '@components/Text';
import Storage from '@src/Storage';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import moment from "moment";
import Load from "./load";
import { debounce } from "lodash";
import { Container, Content, Button, ListItem, ScrollableTab, Tab, Tabs } from 'native-base';

const AREA_WIDTH = deviceWidth / 3 * 2;
const ScanScreen = (props) => {
    let unmounted = false;
    // useEffect(() => {
    //     props.navigation.addListener('willFocus', () => {
    //         console.log('fafpafad')
    //         unmounted = false;
    //         setLoad(false);
    //         console.log('unmounted',unmounted)
    //     });
    // }, []);
    // let helpViewRef: HelpView;

    const [question, setQuestion] = React.useState(false)
    const onShowQuestion = () => {
        setQuestion(true)
        // helpViewRef && helpViewRef.show(() => setQuestion(false))
    }

    const [isCameraReady, setCameraReady] = React.useState(false)
    const [isLight, setLight] = React.useState(false)
    const [load, setLoad] = React.useState(false);
    const [inputLayout, setInputLayout] = React.useState(null)
    const [areaLayout, setAreaLayout] = React.useState(null)
    const [lightLayout, setLightLayout] = React.useState(null)

    const handleCameraReady = () => {
        setCameraReady(true)
    }
    const getTemID = (url) => {
        var regex = /[?&]([^=#]+)=([^&#]*)/g,
            params = {},
            match;
        while (match = regex.exec(url)) {
            params[match[1]] = match[2];
        }
        return params?.temId || null
    }
    const setlayoutInput = (layout) => {
        console.log("input layout ", layout)
        setInputLayout(layout)
    }
    const handler = React.useCallback(debounce((url) => getdata(url), 2000), []);
    let BoxLoad = null;
    let showAlert = false;
    const getdata = (url) => {

        // if (load) return;
        // setLoad(true);
        console.log('url', url, BoxLoad);
        // return;
        if (BoxLoad)
            BoxLoad.showload();
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
                    let resJson = response.data.data;
                    resJson.time = moment();
                    resJson.temID = getTemID(url);
                    console.log('resJson product', resJson, url);
                    Storage.load({
                        key: 'ProductHistory'
                    }).then(result => {
                        result.push(JSON.stringify(resJson));
                        Storage.save({
                            key: 'ProductHistory', // Note: Do not use underscore("_") in key!
                            data: result
                        });
                    }).catch(err => {
                        Storage.save({
                            key: 'ProductHistory', // Note: Do not use underscore("_") in key!
                            data: [JSON.stringify(resJson)]
                        });
                    });
                    setTimeout(() => {
                        console.log('vao day redset');
                        unmounted = false
                    }, 5000);
                    props.navigation.navigate('ProductDetail', { productInfo: resJson })
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
                if (BoxLoad)
                    BoxLoad.hideload();
            });
    }
    const onBarCodeRead = (scanResult) => {
        console.log('onBarCodeRead', scanResult);
        if (unmounted) return;
        if (
            (scanResult.type == "QR_CODE" || scanResult.type == "org.iso.QRCode")
            && scanResult.data != null
            && (
                scanResult.data.indexOf(BASE_URL) == 0 || scanResult.data.indexOf('http://113.160.154.188:1102') == 0
            )
        ) {
            if (!unmounted) {
                console.log('123123');
                unmounted = true;
                getdata(scanResult.data);
            }
            return;
        } else {
            console.log('vao day', showAlert)
            if (!showAlert) {
                showAlert = true;
                Alert.alert('Sản phẩm chưa đăng ký trên cổng',
                    '',
                    [
                        {
                            text: 'Ok',
                            onPress: () => showAlert = false,
                        }
                    ]);

            }
        }
    }
    const goback = () => {
        console.log('goback');
        props.navigation.goBack()
    }
    return (
        <RNCamera
            flashMode={isLight ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
            onCameraReady={handleCameraReady}
            style={StyleSheet.absoluteFillObject}
            onBarCodeRead={unmounted ? null : onBarCodeRead}
            captureAudio={false}
        >

            <View style={[StyleSheet.absoluteFill, {
                flexDirection: "column",
            }]}>
                <Load ref={ref => BoxLoad = ref} />
                <HeaderComp
                    goBack={goback}
                    centerComponent={{
                        text: 'Quét QRcode',
                        style: { color: 'white' }
                    }}
                />
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: 30,
                        paddingVertical: 50,
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <View
                        onLayout={(event) => {
                            setAreaLayout(event.nativeEvent.layout)
                        }}>
                        <ImageBackground
                            source={require("@assets/Images/Common/scan_bg.png")}
                            style={{
                                width: AREA_WIDTH, height: AREA_WIDTH,
                                alignSelf: "center",
                            }}
                        >
                        </ImageBackground>
                    </View>
                    <Text style={{ color: '#fff' }}>{"Kiểm tra thông tin sản phẩm"}</Text>
                </View>
            </View>
        </RNCamera>
    )
}
export default ScanScreen;