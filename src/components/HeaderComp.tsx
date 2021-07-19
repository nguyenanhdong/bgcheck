import React from 'react';
import {
    Image, Platform,
    TouchableOpacity
} from 'react-native';
import { CommonImage } from "../assets";
import { Header, HeaderProps } from "react-native-elements";
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { TouchableRipple } from 'react-native-paper';

const HEADER_HEIGHT = Platform.select({
    android: 56,
    default: 44,
}) + getStatusBarHeight() + 20
const HeaderComp = (props) => {
    return <Header
        containerStyle={{
            backgroundColor: null,
            height: HEADER_HEIGHT,
            borderBottomColor: null, 
            borderBottomWidth: 0,
        }}
        backgroundImageStyle={{
            resizeMode: "stretch",
        }}
        backgroundImage={CommonImage.SCAN_HEADER_BG}
        centerComponent={<Image
            style={{ height: "50%", resizeMode: "contain" }}
            source={CommonImage.HEADER_LOGO}
        />}
        leftComponent={
            <TouchableRipple
                onPress={() => props.goBack ? props.goBack():  props.showDraw()}
                hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                style={{padding:10}}
            >
                <Image source={props.goBack ? CommonImage.HEADER_BACK : CommonImage.Draw} />
            </TouchableRipple>
            }
            
        {...props}
    />
}
export default HeaderComp;
