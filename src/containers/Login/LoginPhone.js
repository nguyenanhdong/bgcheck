import React, { Component, useEffect, useState, useCallback } from "react";
import {
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Animated,
    Easing,
    Alert,
    ImageBackground,
    ActivityIndicator,
    StyleSheet,
    TextInput,
    Linking
} from 'react-native';
import Text from '@components/Text';
import SafeAreaView from '@components/SafeAreaView';
import TitleScreen from '@components/TitleScreen';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, listDauSo, deviceWidth, deviceHeight, isAndroid } from '@assets/constants';
import { showMessage } from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';
const LoginPhone = props => {
    const [numberPhone, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [checkValueDate, setValueDate] = useState(false);
    const [checkMor3, setMor3] = useState(false);

    const goBack = useCallback(() => {
        props.navigation.goBack();
    })

    const onChangePhone = useCallback(
        (value) => {
            setPhoneNumber(value);
        }, [numberPhone]
    );

    // const onChangePhone = (value) => {
    //     let phone = value;
    //     if(phone.slice(1, 0) == 0){
    //         phone = value.split('0',2);
    //     }
    //     setPhoneNumber(phone);
    // }

    // checkPhoneNumber = () => {
    //     let isPhone = false
    //     listDauSo.map(item => {
    //         if (item === numberPhone.substr(0, 3)) {
    //             isPhone = true;
    //         }
    //     })
    //     return isPhone;
    // }

    // validateFied = () => {
    //     let isPhone = checkPhoneNumber();
    //     if (numberPhone == "" || !isPhone || numberPhone.length < 9 || numberPhone.length >= 11) {
    //         showMessage({
    //             message: "Số điện thoại không đúng định dạng !",
    //             duration: 4000,
    //             type: "danger",
    //             icon: 'danger'
    //         });
    //     } else
    //         return true
    // };

    const goToScreen = (screen, data) => {
        props.navigation.navigate(screen, data)
    }

    const sendPhone = async (numPhone) => {
        setLoading(true);
        let phone = numPhone;
        if (numPhone.charAt(0) == 0) {
            let dataPhone = numPhone.split('0', 2);
            phone = dataPhone[1];
        }

        try {
            let request_phone = '+84' + phone;
            const confirmation = await auth().signInWithPhoneNumber(request_phone);
            console.log('signInWithPhoneNumber', confirmation);
            let data = {};
            data.confirmation = confirmation;
            data.phone = request_phone;
            console.log('data signInWithPhoneNumber', data);
            setLoading(false);
            goToScreen('PhoneVerify', data);
        }
        catch (error) {
            console.log('error', error);
            setLoading(false);
            Alert.alert('Định dạng số điện thoại không đúng !');
        }
    }


    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            {loading &&
                <View style={styles.css_loading}>
                    <ActivityIndicator animating size="large" color={colorDefault} />
                </View>
            }
            <TitleScreen
                backButton={true}
                title={'Nhập số điện thoại'}
                goBack={() => goBack()}
            />
            <View style={styles.safearea_content}>
                <Text style={{ fontSize: 24, color: '#000', marginBottom: 10 }}>Xin mời nhập số điện thoại của bạn</Text>
                <Text style={{ lineHeight: 22 }}>Số của bạn sẽ chỉ được sử dụng trong những trường hợp khẩn cấp và sẽ không được chuyển tiếp cho bên thứ ba.</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 50, alignItems: 'flex-end', marginTop: 10, }}>
                    <View style={{ width: '20%', borderBottomWidth: 1, borderColor: '#ddd', alignItems: 'center', paddingBottom: 5 }}>
                        <Text style={{ fontSize: 20 }}>+84</Text>
                    </View>
                    <TextInput
                        style={{ width: '75%', borderBottomWidth: 1, borderRadius: 5, borderColor: '#ddd', paddingBottom: 5, fontSize: 20 }}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#bbb"
                        onChangeText={(contactChange) => onChangePhone(contactChange)}
                        value={numberPhone}
                        maxLength={15}
                        keyboardType={'numeric'}
                    />
                </View>
                <TouchableOpacity style={ styles.view_phone } onPress={() => sendPhone(numberPhone)}
                    disabled = {numberPhone != '' ? false : true}
                >
                    <Text style={styles.txt_login_phone}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginPhone;

const styles = StyleSheet.create({
    safearea_content: { backgroundColor: '#fff', flex: 1, padding: 30 },
    view_phone: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colorDefault, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5, marginVertical: 30 },
    txt_login_phone: { color: '#fff', fontWeight: '700' },
    css_loading: {
        position: 'absolute',
        zIndex: 2,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight,
        borderWidth: 1,
        paddingTop: 150,
        opacity: 0.3
    },
});
