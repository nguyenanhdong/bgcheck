import React, { Component, useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Image, ScrollView, Keyboard, Easing, Alert, TextInput, ImageBackground, ActivityIndicator, StyleSheet, PermissionsAndroid, Linking } from 'react-native';
import Text from '@components/Text';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, clientver, did, API_KEY_GOOGLE_MAP } from '@assets/constants';
import Storage from '@src/Storage';
import { NavigationActions, StackActions } from 'react-navigation';
import { Container, Content } from "native-base";
import { loginSuccess } from '@containers/Home/actions';
import { TouchableRipple } from 'react-native-paper';

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
    
    const login = () => {
        props.navigation.dispatch(resetAction);
        let data = {};
        dispatch(loginSuccess(data))
    }
    let secondTextInput = null;
    const onSubmitEditing = () => {
        if (secondTextInput)
            secondTextInput.focus();
    }
    return (
        <Container>
            
        <ImageBackground style={{ width: deviceWidth, height: '100%' }} source={require('@assets/Images/Common/Start_BG.png')} resizeMode='cover'>
            <Content>
            {/* {loading &&
                <View style={styles.css_loading}>
                    <ActivityIndicator animating size="large" color={colorDefault} />
                </View>
            } */}
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
                        placeholder={'Nhập email hoặc số điện thoại'}
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
    view_phone: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f15a29', borderRadius: 5,justifyContent:'center',height:50,width:'100%',marginTop:20 },
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
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        height: deviceHeight,
        borderWidth: 1,
        paddingTop: 200,
        opacity: 0.3
    },
    row: {
        width: '100%',
        marginBottom: 10,
    },
    row_input: {
        borderWidth: 1,
        // borderColor: 'rgba(128,127,130,1)',
        borderRadius: 6,
        backgroundColor:'#fff'
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
