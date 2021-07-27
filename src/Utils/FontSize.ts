import { Dimensions, Platform, PixelRatio } from 'react-native';

let {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

if(SCREEN_WIDTH>SCREEN_HEIGHT){
  let h = SCREEN_HEIGHT;
  SCREEN_HEIGHT = SCREEN_WIDTH;
  SCREEN_WIDTH = h;
}

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 414;

export function actuatedNormalize(size: number) {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

export default {
    //fontsize 26-27
    xxLarge: actuatedNormalize(27),
    //fontsize 24-25
    xLarge: actuatedNormalize(26),
    //fontsize 20-21
    lg: actuatedNormalize(21),
    //fontsize 18-19
    md075: actuatedNormalize(19),
    //fontsize 16-17
    md: actuatedNormalize(17),
    //fontsize 14-15
    xMd: actuatedNormalize(15),
    //fontsize 12-13
    sm: actuatedNormalize(13),
    //fontsize 10-11.75
    xSm: actuatedNormalize(11.75),
    //fontsize 8-9
    tiny: actuatedNormalize(9),
    //fontsize 26-27
    xxLarge27: actuatedNormalize(27),
    //fontsize 24-25
    xLarge26: actuatedNormalize(26),
    //fontsize 20-21
    lg21: actuatedNormalize(21),
    //fontsize 18-19
    md07519: actuatedNormalize(19),
    //fontsize 16-17
    md17: actuatedNormalize(17),
    //fontsize 14-15
    xMd15: actuatedNormalize(15),
    //fontsize 12-13
    sm13: actuatedNormalize(13),
    //fontsize 10-11.75
    xSm1175: actuatedNormalize(11.75),
    //fontsize 8-9
    tiny9: actuatedNormalize(9),
}