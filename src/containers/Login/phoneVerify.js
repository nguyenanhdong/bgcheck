import React, { Component, useEffect, useState, useCallback } from "react";
import {
    StyleSheet,
    SafeAreaView,
    Alert,
    View,
    Image,
    ScrollView,
    FlatList,
    ActivityIndicator,
    TextInput,
    Linking
} from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import { deviceWidth, deviceHeight, isAndroid, colorDefault, headersRequest, urlAPI, clientver, did } from '@assets/constants';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modalbox';
import TitleScreen from '@components/TitleScreen';
import { Container, Header, Content, Tab, Tabs, Switch, Right, Fab } from 'native-base';
import { verticalScale, scale, fontSize } from '@assets/config/RatioScale';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { loginWithFB, loginWithPhone, logOut, login, register } from '../Account/actions';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

const PhoneVerify = props => {

    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [checkMor3, setMor3] = useState(false);
    const [checkValueDate, setValueDate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [waitingCode, setWaitingCode] = useState(false);
    const [count, setCount] = useState(0);
    const phoneNumber = props.navigation.state.params.phone;
    // let checkloading = true

    const { dataFirebase } = useSelector(state => ({
        dataFirebase: state.account.dataFirebase,
    }), shallowEqual);

    const checkLoginPhone = useCallback((token) => {
        let dataUser = {};
        dataUser.phone = phoneNumber;
        dataUser.token = token;
        dataUser.did = did;//Mã device 
        dataUser.clientver = clientver; //Version app
        console.log('dataUser', dataUser);
        dispatch(loginWithPhone(dataUser));
    });

    
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            console.log('fireBaseListener', user);
            if (user) {
                user.getIdToken().then(res => {
                    console.log('getIdToken', res);
                    if (res) {
                        console.log('messaging', res)
                        checkLoginPhone(res);
                    }
                    else {
                        Alert.alert('Có lỗi xảy ra', 'Lỗi kết nối !', [
                            { text: 'OK' },
                        ]);
                    }
                })
            }

            //   store.dispatch({ type: 'confirmation_success', data: user });
        })
        return unsubscribe;
    }, []);

    const goBack = () => {
        console.log('goback');
        props.navigation.goBack()
    }

    const Callswitchboard = () => {
        let phoneNumber = isAndroid ? `tel:${'0363411612'}` : `telprompt:${'0363411612'}`
        Linking.openURL(phoneNumber);
    }

    const goToScreen = (screen, data) => {
        props.navigation.navigate(screen, data);
    }

    const getTokenFirebase = async (code) => {
        console.log('getTokenFirebase', code);
        try {
            const { confirmation } = props.navigation.state.params;
            console.log('confirmation', confirmation);
            const result = await confirmation.confirm(code);
            console.log('result confirmation', result);

            if (!isAndroid)
                result.user.getIdToken().then(res => {
                    console.log('getIdToken', res);
                    user.getIdToken().then(res => {
                        console.log('getIdToken', res);
                        if (res) {
                            console.log('messaging', res)
                            checkLoginPhone(res);
                        }
                        else {
                            Alert.alert('Có lỗi xảy ra', 'Lỗi kết nối !', [
                                { text: 'OK' },
                            ]);
                        }
                    })
                })
        }
        catch (e) {
            console.log('eeee', e);
            // if (this.state.count >= 2) {
            //     setMor3(true);
            //     setValueDate(false);
            //     setLoading(false);
            //     setCode('');
            //     return false;
            // }

            setValueDate(true);
            setLoading(false);
            setCode('');
            setCount(count + 1);
        }
    }

    const onPressSubmit = async (code) => {
        if (loading)
            return false;
        console.log('onPressSubmit', code);
        setLoading(true);
        try {
            if (isAndroid) {
                console.log('onPressSubmit isAndroid', code);
                getTokenFirebase(code);
            } else {
                messaging().requestPermission()
                    .then((results) => {
                        console.log('results', results)
                        // User has authorised  
                        getTokenFirebase(code);
                    })
                    .catch(error => {
                        // User has rejected permissions
                        console.log('User has rejected permissions');
                    });
            }
        } catch (error) {
            console.log('vao day', error);
            setCount(count + 1);
            if (count >= 2) {
                setValueDate(true);
                setLoading(false);
                setCode('');
            } else {
                setMor3(true);
                setValueDate(false);
                setLoading(false);
                setCode('')
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            {console.log('count', count)}
            <TitleScreen
                title={'Xác thực SĐT'}
                goBack={() => goBack()}
                backButton={true}
            />

            <View style={styles.content}>
                {count < 3 &&
                    <Text style={{ textAlign: 'center', lineHeight: 22 }}>
                        <Text>{'Mã xác thực đã được gửi tới số điện thoại '}</Text>
                        <Text style={styles.text_phone}>
                            {' '}{phoneNumber}
                        </Text>
                        <Text>{', nhập mã xác thực vào ô dưới đây : '}</Text>
                    </Text>
                }

                <View>
                    {count < 3 && <OTPInputView
                        style={styles.otp_input}
                        code={code}
                        pinCount={6}
                        onCodeFilled={(code => {
                            !checkMor3 ? onPressSubmit(code) : console.log('checkMor3', checkMor3)
                        })}
                        onCodeChanged={(code) => setCode(code)}
                        autoFocusOnLoad={true}
                        editable={true}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />}
                </View>

                {checkValueDate && count < 3 && <Text style={styles.txt_validate}>{'Mã OTP không đúng hoặc hết hạn !'}</Text>}

                {count >= 3 &&
                    <View style={{ width: deviceWidth }}>
                        <Text style={[styles.txt_validate, { opacity: 0.7 }]}>{'Nhập sai quá 3 lần, vui lòng liên hệ tổng đài'}</Text>
                        <TouchableOpacity onPress={() => Callswitchboard()}><Text style={styles.css_tongdai}>{'0363411612'}</Text></TouchableOpacity>
                    </View>
                }

                <TouchableOpacity
                    onPress={() => onPressSubmit(code)}
                    style={[
                        styles.touchable_start,
                        { opacity: (code == '' || checkMor3 || loading) ? 0.5 : 1 },
                    ]}
                    disabled={code == '' || checkMor3 || loading}>
                    {waitingCode && (
                        <ActivityIndicator size="small" color="#fff" />
                    )}
                    <Text style={styles.txt_start}> {'Tiếp tục'}</Text>
                </TouchableOpacity>
            </View>
            {loading &&
                <View style={styles.css_loading}>
                    <ActivityIndicator animating size="large" color={colorDefault} />
                </View>
            }
        </View>

    );
}

export default PhoneVerify;

const styles = StyleSheet.create({
    modalInfo: { width: '95%', borderRadius: 10, height: verticalScale(130) },
    content: {
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    text_phone: {
        fontWeight: 'bold',
        color: '#000',
    },
    underlineStyleBase: {
        width: 30,
        height: 55,
        borderWidth: 0,
        borderBottomWidth: 2,
        fontSize: fontSize(25),
        color: '#1E6ECD',
    },

    underlineStyleHighLighted: {
        borderColor: '#1E6ECD',
        fontSize: fontSize(30),
    },
    select_language: {
        fontSize: fontSize(15, scale(1)),
        flex: 1,
        color: 'black',
        padding: 0,
    },
    touchable_start: {
        backgroundColor: colorDefault,
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 1.5,
        borderRadius: scale(20),
        marginTop: scale(30),
        marginBottom: scale(50),
    },
    txt_start: {
        fontSize: fontSize(17, scale(4)),
        color: '#fff',
        padding: 10,
    },
    txt_validate: {
        marginTop: 12,
        color: '#FF0000',
        textAlign: 'center',
    },
    css_tongdai: {
        marginTop: 5,
        color: '#FF0000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    img_global: {
        height: scale(25),
        width: scale(25),
        resizeMode: 'cover',
        borderRadius: 25 / 2,
    },
    txt_triangle: {
        color: '#7E7E7E',
        fontSize: 13,
        marginHorizontal: scale(5),
    },
    txt_code: {
        color: '#7E7E7E',
        fontSize: 13,
        marginLeft: 0,
        marginRight: 5,
    },
    view_input_language: {
        width: deviceWidth - scale(80),
        height: scale(45),
        marginTop: scale(20),
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderColor: '#C2C2C2',
        borderRadius: scale(20),
        borderWidth: 1,
        alignItems: 'center',
        padding: 10,
    },
    otp_input: { width: '80%', height: 100, paddingLeft: 15, },
    css_loading: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight,
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellView: {
        paddingVertical: 11,
        width: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1.5,
    },
    cellText: {
        textAlign: 'center',
        fontSize: 16,
    },
    modalInfo: { width: '95%', borderRadius: 10, height: verticalScale(170) },
});
