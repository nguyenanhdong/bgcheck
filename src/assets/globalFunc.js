import { Alert } from "react-native";
// import I18n from '../i18n';

export function convert_time(sec_num) {
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var arrTime = [];
  if (hours > 0) {
    arrTime.push(hours + ' hrs');
  }
  if (minutes > 0) {
    arrTime.push(minutes + ' mins');
  }
  return arrTime.join(' and ');
}

export function numberWithCommas(x) {
  return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// export function CheckTokenDevice(callback = null, logout = null) {
//   Alert.alert(I18n.t('notify'), 'Phiên đăng nhập đã hết hạn !', [
//     {
//       text: 'OK', onPress: () => {
//         callback;
//         logout;
//       }
//     },
//   ])
// }

// export function timeConversion(millisec) {

//   var seconds = (millisec).toFixed(0);

//   var minutes = (millisec / 60).toFixed(0);

//   var hours = (millisec / (60*60) ).toFixed(0);

//   var days = (millisec / (60 * 60 * 24)).toFixed(0);

//   if (seconds < 60) {
//       return seconds + I18n.t('giay');
//   } else if (minutes < 60) {
//       return minutes + I18n.t('min');
//   } else if (hours < 24) {
//       return hours + I18n.t('hours');
//   } else {
//       return days + I18n.t('day')
//   }
// }
// export function CheckStatus (status ){
//   if (status == 0)
//     return I18n.t('upcoming');
//   if (status == 1)
//     return 'Live';
//   if (status == 2)
//     return I18n.t('full_time');
//   return I18n.t('matchdelete');
// }

export function formatMoney(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}