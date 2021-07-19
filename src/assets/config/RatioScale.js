import { Dimensions, Platform, StatusBar, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');
import { isIphoneX } from "react-native-iphone-x-helper";

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 680;
/**
 * Resize cho cac màn hình iphone và ipad theo chiều ngang màn hình
 * @param {number} size kích thước chuẩn
 */
const scale = function (size, androidResize = false) {
    // if (Platform.OS === 'android' && !androidResize) {
    //     // console.log('.....................android scale');
    //     return size;
    // }
    // return Math.round(PixelRatio.roundToNearestPixel(width / guidelineBaseWidth * size));
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(width / guidelineBaseWidth * size));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size));
    }
}
/**
 * Resize cho các màn hình iphone và ipad theo chiều dọc màn hình
 * @param {number} size kích thước chuẩn
 */
const verticalScale = function (size, androidResize = false) {
    // if (Platform.OS === 'android' && !androidResize) {
    //     return size;
    // }
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(height / guidelineBaseHeight * size));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(size));
    }
}
const moderateScale = (size, factor = 0.5) => Math.round(PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor));

/**
 * tra ve font size cho cac man hinh
 * hàm này đảm bảo android fontSize không bị thay đôi
 * @param {number} android_font 
 * @param {number} delta gia tri cong them hay trừ đi với font gốc
 */
const fontSize = function (android_font, delta = 0) {
    // return Math.round(PixelRatio.roundToNearestPixel(android_font))
    // return RFValue(android_font)//width * 0.037 + delta;
    const scale = width / guidelineBaseWidth;
    const newSize = android_font //* scale
    if (Platform.OS === 'ios') {
        if(!Platform.isPad){
            return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
        }
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) + 3
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const deviceHeight = isIphoneX()
    ? height - 78 // iPhone X style SafeAreaView size in portrait
    : Platform.OS === "android"
        ? height - StatusBar.currentHeight
        : height;

const RFValue = function RFValue(fontSize) {
    // guideline height for standard 5" device screen
    const heightPercent = (fontSize * deviceHeight) / guidelineBaseHeight;
    return heightPercent;
}

export { scale, verticalScale, moderateScale, fontSize, RFValue };