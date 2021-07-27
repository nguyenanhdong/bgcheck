import React, { Component, useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Image, ScrollView, Keyboard, Easing, Alert, TextInput, ImageBackground, ActivityIndicator, StyleSheet, PermissionsAndroid, Linking } from 'react-native';
import Text from '@components/Text';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, clientver, did, API_KEY_GOOGLE_MAP, BASE_URL } from '@assets/constants';
import Storage from '@src/Storage';
import { NavigationActions, StackActions } from 'react-navigation';
import { Container, Content } from "native-base";
import { loginSuccess } from '@containers/Home/actions';
import { TouchableRipple } from 'react-native-paper';
import { showMessage } from 'react-native-flash-message';

const resetAction = StackActions.reset({
    index: 0,
    // actions: [NavigationActions.navigate({ routeName: 'Home' })],
    actions: [NavigationActions.navigate({ routeName: 'Draw' })],
});
const Login = props => {
    const userInfo = useSelector(state => state.app.userInfo);
    const dispatch = useDispatch();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const goback = ()=>{
        props.navigation.goBack()
    }
    const login = () => {
        Keyboard.dismiss();
        if (!username || !password) {
            Alert.alert('Vui lòng nhập tài khoản và mật khẩu')
            return false;
        }
        if (loading) return;
        setLoading(true);
        let dataInput = {
            userName: username,
            passWord: password
        }
        console.log('dataInput', dataInput)
        axios.post(`${BASE_URL}API/Login`, dataInput, {
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
                    if (resJson.error_code == 0) {
                        props.navigation.dispatch(resetAction);
                        let data = resJson.data;
                        dispatch(loginSuccess(data))
                    } else {
                        showMessage({
                            message: resJson?.error_msg || 'Có lỗi xảy ra. Vui lòng thử lại sau ít phút',
                            duration: 3000,
                            type: "danger",
                            icon: 'danger'
                        });
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
                setLoading(false);
            });

    }
    let secondTextInput = null;
    const onSubmitEditing = () => {
        if (secondTextInput)
            secondTextInput.focus();
    }
    return (
        <Container>
            {loading &&
                        <View style={styles.css_loading}>
                            <ActivityIndicator animating size="large" color={'#fff'} />
                        </View>
             }
            <ImageBackground style={{ width: deviceWidth, height: '100%' }} source={require('@assets/Images/Common/Start_BG.png')} resizeMode='cover'>
                <Content>
                    
                    {/* <View style={styles.safearea_content}> */}
                    <View style={styles.logo}>
                        <Image source={require('@assets/Images/Common/home_logo.png')} style={styles.img_logo} />
                    </View>
                    <View style={styles.content}>
                        <Text style={styles.txt_title}>Đăng nhập</Text>
                        <View style={[styles.row, styles.row_input]}>
                            <Image
                                source={require('@assets/Images/Common/IconBooks-56.png')}
                                style={styles.icon_input}
                            />
                            <TextInput
                                underlineColorAndroid="transparent"
                                onSubmitEditing={onSubmitEditing}
                                style={styles.input}
                                onChangeText={username => setUserName(username)}
                                value={username}
                                placeholder={'Nhập tài khoản'}
                                returnKeyType={'next'}
                                returnKeyLabel={'next'}
                                placeholderTextColor="#333"
                                selectionColor="rgba(0,0,0,.5)"
                            />

                        </View>
                        {/* <Text style={{ color: 'red', marginBottom: 10 }}>{this.state.errorRequest?.username}</Text> */}
                        <View style={[styles.row, styles.row_input]}>
                            <Image
                                source={require('@assets/Images/Common/IconBooks-57.png')}
                                style={styles.icon_input}
                            />
                            <TextInput
                                underlineColorAndroid="transparent"
                                ref={input => {
                                    secondTextInput = input;
                                }}
                                onSubmit={Keyboard.dismiss}
                                style={styles.input}
                                onChangeText={password => setPassword(password)}
                                value={password}
                                secureTextEntry={true}
                                placeholder={'Password'}
                                returnKeyType={'done'}
                                returnKeyLabel={'done'}
                                placeholderTextColor="#333"
                                selectionColor="rgba(0,0,0,.5)"
                            />

                        </View>
                        <TouchableRipple style={styles.view_phone}
                            onPress={() => login()}
                        >
                            <Text style={styles.txt_login_phone}>Đăng nhập </Text>
                        </TouchableRipple>
                        <TouchableRipple
                            onPress={goback}
                            style={{marginTop:20}}
                        >
                            <Text style={[styles.txt_login_phone,{textDecorationLine:'underline'}]}>Quay lại </Text>
                        </TouchableRipple>
                    </View>
                    {/* </View> */}
                </Content>
            </ImageBackground>

        </Container>
    )
}

export default Login;

const styles = StyleSheet.create({
    safearea_content: {
        backgroundColor: '#fff',
        flex: 1,
    },
    logo: { flex: 2, alignItems: 'center', justifyContent: 'center' },
    content: { flex: 3, padding: 30, alignItems: 'center' },
    txt_title: { color: '#fff', fontSize: 25, fontWeight: 'bold', marginBottom: 40 },
    view_phone: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f15a29', borderRadius: 5, justifyContent: 'center', height: 50, width: '100%', marginTop: 20 },
    txt_login_phone: { color: '#fff', fontWeight: '700' },
    view_or: { borderBottomWidth: 1, width: deviceWidth - 40, alignItems: 'center', position: 'relative', marginBottom: 30 },
    content_or: { position: 'absolute', top: -9, backgroundColor: '#fff', paddingHorizontal: 10 },
    txt_or: { color: '#000' },
    view_apple: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#000', paddingVertical: 10, paddingHorizontal: 20, width: deviceWidth - 40, borderRadius: 5, marginBottom: 20 },
    view_facebook: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#4E6297', paddingVertical: 10, paddingHorizontal: 20, width: deviceWidth - 40, borderRadius: 5 },
    img_logo: { width: deviceWidth / 3, height: deviceWidth / 3 + 40, resizeMode: 'contain' },
    css_loading: {
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    row: {
        width: '100%',
        marginBottom: 10,
    },
    row_input: {
        borderWidth: 1,
        // borderColor: 'rgba(128,127,130,1)',
        borderRadius: 6,
        backgroundColor: '#fff'
    },
    input: {
        padding: 0,
        height: 43,
        lineHeight: 20,
        fontSize: 14,
        width: '100%',
        paddingLeft: 40,
        color: '#333'
    },
    icon_input: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        position: 'absolute',
        top: 10,
        left: 10,
    },
});
