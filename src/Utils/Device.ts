import { Dimensions, Platform } from "react-native";
declare module 'react-native-status-bar-height' {
    export function getStatusBarHeight(skipAndroid?: boolean): number;
    export function isIPhoneX(): boolean
    export function isIPhoneXMax(): boolean
    export function isIPhoneWithMonobrow(): boolean
    export function isExpo(): boolean;
}

const _isAndroid = Platform.OS == "android";
const _version = Platform.Version;
const { width, height } = Dimensions.get("window");

function isAndroid(): boolean {
    return _isAndroid;
}

function version(): string | number {
    return _version;
}

function getScreenSize(): { width: number; height: number } {
    return { width, height };
}

function getStatusBarHeight() {
    return getStatusBarHeight()
};


function isIPhoneX() {
    return isIPhoneX()
};

function getHeaderHeight() {
    const headerHeight = Platform.OS == "android" ? 56 : 44;
    return headerHeight;
}

const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};

function getTabBarHeight() {
    const majorVersion = parseInt(Platform.Version.toString(), 10);
    const isIos = Platform.OS === 'ios';
    const isIOS11 = majorVersion >= 11 && isIos;
    // if (Platform.isPad) return 49;
    if (isIOS11 && !isLandscape()) return 49;
    return 29;
}

export default {
    getScreenSize,
    isAndroid,
    version,
    getStatusBarHeight,
    getHeaderHeight,
    width,
    height,
    getTabBarHeight,
    isIPhoneX
};
