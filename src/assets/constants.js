import { Dimensions, NativeModules, Platform } from 'react-native';
import moment from 'moment';


export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;

export const VersionIos = '1.1'; //version update tiếp theo
export const VersionAndroid = '1.0'; //version update tiếp theo
export const clientver = Platform.OS === 'ios' ? ('VersionIOS_' + VersionIos) : ('VersionAndroid_' + VersionAndroid);

export const Themebackground = '#5A47AB';
export const width_90_percent = (deviceWidth / 100) * 90;
export const provider = 'FastJob';
export const minWidthDevice = (deviceWidth <= 320) ? true : false;
// export const BASE_URL = "http://113.160.154.188:1102/Api";
export const BASE_URL = "http://truyxuatbg.com/";
export const isAndroid = Platform.OS === 'ios' ? false : true;
export const headersRequest = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};
const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');
const X_WIDTH = 375;
const X_HEIGHT = 812;

// export const colorDefault = '#0347c0';
export const colorDefault = '#4b9cc5';
export const backgroundDefault = 'rgba(196, 196, 196, 0.2)';

// const { PlatformConstants = {} } = NativeModules;
// const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

export const isIPhoneX = (() => {
  return (
    !isAndroid &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
      (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
  );
})();


export const numberWithCommas = (x, char) => {
  return x && x.toString().replace('.00', '').replace(/\B(?=(\d{3})+(?!\d))/g, char);
}
export const getHeaderHeight = ()=> {
  const headerHeight = Platform.OS == "android" ? 56 : 44;
  return headerHeight;
}
export const listDauSo = [
  "086", "096", "097", "098", "032", "033", "034", "035", "036", "037", "038", "039",
  "090", "093", "089", "070", "079", "077", "076", "078",
  "091", "094", "083", "084", "085", "081", "082", "088",
  "092", "056", "058", "099", "059"
];
export const weekdays = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7',];
export const monthNamesShort = ['Th1.', 'Th2.', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'];
export const weekdaysShort = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
export function showTime(x){
   let time = x.replace('/Date(','').replace(')/','');
   return moment(parseInt(time)).format('DD/MM/YYYY')
}