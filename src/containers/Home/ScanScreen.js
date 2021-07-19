import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import SubmitCodeText from './SubmitCodeText'
import { ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';
import HeaderComp from '@components/HeaderComp';
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest } from '@assets/constants';
import Text from '@components/Text';

const AREA_WIDTH = deviceWidth / 3 * 2;
const ScanScreen = (props) => {
    let unmounted = false;

    // let helpViewRef: HelpView;

    const [question, setQuestion] = React.useState(false)
    const onShowQuestion = () => {
        setQuestion(true)
        // helpViewRef && helpViewRef.show(() => setQuestion(false))
    }

    const [isCameraReady, setCameraReady] = React.useState(false)
    const [isLight, setLight] = React.useState(false)

    const [inputLayout, setInputLayout] = React.useState(null)
    const [areaLayout, setAreaLayout] = React.useState(null)
    const [lightLayout, setLightLayout] = React.useState(null)

    const handleCameraReady = () => {
        setCameraReady(true)
    }

    const setlayoutInput = (layout) => {
        console.log("input layout ", layout)
        setInputLayout(layout)
    }

    const onBarCodeRead = (scanResult) => {
        console.log('onBarCodeRead',scanResult);
        // if (
        //     (scanResult.type == "QR_CODE" || scanResult.type == "org.iso.QRCode")
        //     && scanResult.data != null
        //     && (
        //         scanResult.data.indexOf("http://truyxuatnguongoc.bacninh.gov.vn") == 0
        //     )
        // ) {
        //     if (!unmounted) {
        //         console.log('123123')
        //     }
        //     unmounted = true;

        // }
        if (
            (scanResult.type == "QR_CODE" || scanResult.type == "org.iso.QRCode")
            && scanResult.data != null
        ) {
            if (!unmounted) {
                Alert.alert(scanResult.data);
                props.navigation.navigate('ProductDetail')
            }
            unmounted = true;

        }
        return;
    }

    return <RNCamera
        flashMode={isLight ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        onCameraReady={handleCameraReady}
        style={StyleSheet.absoluteFillObject}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}
    >
        <View style={[StyleSheet.absoluteFill, {
            flexDirection: "column",
        }]}>
            <HeaderComp
                goBack={() => props.navigation.goBack()}
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
                {/* <SubmitCodeText
                    width={AREA_WIDTH}
                    setlayout={setlayoutInput}
                /> */}
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
                <Text style={{color:'#fff'}}>{"Kiểm tra thông tin sản phẩm"}</Text>
            </View>
        </View>
    </RNCamera>
}
export default ScanScreen;