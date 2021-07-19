import { ImagePicker, takeSnapshotAsync, checkIphoneX } from '../Core/Common/ExpoUtils';
import {
    Platform,
    Share,
    PermissionsAndroid,
    Dimensions,
    Linking,
    Alert,
    Image
} from 'react-native';
// import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import Config from '../Config/Config';
import Files from '../Components/Common/Files';
import ImageResizer from 'react-native-image-resizer';
import SendIntentAndroid from 'react-native-send-intent';
import Permissions, { PERMISSIONS, RESULTS } from 'react-native-permissions'
import RNFS from 'react-native-fs';
import CameraRoll from "@react-native-community/cameraroll";
import I18N from 'react-native-i18n';

// var RNFetchBlob;
// if (Platform.OS === 'android') {
// var RNFetchBlob = require('react-native-fetch-blob').RNFetchBlob
// if (!RNFetchBlob) {
//     RNFetchBlob = require('react-native-fetch-blob').default;
// }
import RNFetchBlob from 'rn-fetch-blob'
const { config, fs } = RNFetchBlob

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// import RNFetchBlob from 'react-native-fetch-blob';

// var RNFetchBlob  = require('react-native-fetch-blob').RNFetchBlob

const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i;

const TEE_COLOR = ['blue', 'red', 'gold', 'white', 'black'];

let upload_android = (url, data) => {
    return RNFetchBlob.fetch('POST', url,
        {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',// 'multipart/form-data',
        },
        data);
}

let upload_file = (url, data) => {
    return RNFetchBlob.fetch('POST', url,
        {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'application/octet-stream',
        },
        data);
}

const ICON_MANNER = {
    UP: Files.sprites.ic_ranking_up,
    DOWN: Files.sprites.ic_ranking_down,
    NORMAL: Files.sprites.ic_ranking_normal
}

const args = {
    number: Config.hotline, // String value with the number to call
    prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
}

module.exports.call_hotline = function (callbackError = null) {
    call(args).catch(console.error);
}

/**
 * Upload ảnh lên sever
 * @param {*} url link sever
 * @param {*} imagePath đường link của ảnh từ thư mục điện thoại
 */
module.exports.upload_mutil = async function (url, arr_imagePath, callback = null, callbackError = null, progressCallback = null) {
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    // Upload the image using the fetch and FormData APIs
    let arrayImage = arr_imagePath.map((imagePath, index) => {
        console.log('............ update img : ', imagePath);
        return {
            name: 'image[]',
            filename: `filename${index}.png`,
            data: imagePath.data ? imagePath.data : RNFetchBlob.wrap(imagePath)
        };
    })
    upload_android(url, arrayImage)
        .uploadProgress({ interval: 250 }, (written, total) => {
            if (progressCallback) {
                progressCallback(written / total);
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (callback) {
                callback(responseJson);
            }
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
            if (callbackError) {
                callbackError(error)
            }
        });
}

/**
 * Upload ảnh lên sever
 * @param {*} url link sever
 * @param {*} imagePath đường link của ảnh từ thư mục điện thoại
 */
module.exports.upload = async function (url, imagePath, callback = null, callbackError = null, progressCallback = null) {
    console.log(url, imagePath);
    // if (Platform.OS === 'android' && imagePath.data) {
    try {
        upload_android(url, [{ name: 'image', filename: 'avatar.png', data: imagePath.data ? imagePath.data : RNFetchBlob.wrap(imagePath) }])
            .uploadProgress({ interval: 250 }, (written, total) => {
                if (progressCallback) {
                    progressCallback(written / total);
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (callback) {
                    callback(responseJson);
                }
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
                if (callbackError) {
                    callbackError(error)
                }
            });
    } catch (error) {
        console.log('error', error)
    }

}

/**
 * Upload file lên sever
 * @param {*} url link sever
 * @param {*} imagePath đường link của file từ thư mục điện thoại
 */
module.exports.uploadPdfFile = async function (url, filePath, callback = null, callbackError = null, progressCallback = null) {
    console.log('uploadPdfFile', url, filePath);
    try {
        upload_file(url, [{ name: 'tour_rule', filename: 'regulations.pdf', data: RNFetchBlob.wrap(filePath) }])
            .uploadProgress({ interval: 250 }, (written, total) => {
                if (progressCallback) {
                    progressCallback(written / total);
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if (callback) {
                    callback(responseJson);
                }
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
                if (callbackError) {
                    callbackError(error)
                }
            });
    } catch (error) {
        console.log('error', error)
    }

}

module.exports.uploadFlightImage = async function (url, imagePath, formData, callback = null, callbackError = null) {
    console.log(url, imagePath);
    upload_android(url, [
        {
            name: 'image',
            filename: 'avatar.png',
            data: imagePath.data ? imagePath.data : imagePath
        },
        {
            name: 'flight',
            data: JSON.stringify(formData)
        }
    ])
        .then((response) => response.json())
        .then((responseJson) => {
            if (callback) {
                callback(responseJson);
            }
            return responseJson;
        })
        .catch((error) => {
            console.log(error);
            if (callbackError) {
                callbackError(error)
            }
        });
}

/**
 * Chụp ảnh từ camera trả về uri của ảnh trên điện thoại
 */
module.exports.onTakePhotoClick = async function onTakePhotoClick(isCrop = false, isSquare = true, customOption=null) {

    let result = await ImagePicker.launchCameraAsync(isCrop, isSquare, customOption);
    //console.log("result ",JSON.stringify(result));

    if (!result.cancelled) {
        // this.setState({ image: result.uri });
        return result;
    }
    return '';
}

/**
 * Chup anh man hinh
 * @param {*} view View hien thi can chup lai: collapsable={false}
 */
module.exports.onSnapshotClick = async function onSnapshotClick(view) {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (!granted) {
            const response = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            console.log('onSnapshotClick.response', response);
            if (response === 'denied' || response === 'never_ask_again') {
                return;
            }
        }
    }
    let result = await takeSnapshotAsync(view, { format: 'jpeg', quality: 1, result: 'data-uri' });
    return result;
}

/**
 * Chup anh man hinh
 * @param {*} view View hien thi can chup lai: collapsable={false}
 */
module.exports.onSnapshotClickNews = async function onSnapshotClick(view) {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (!granted) {
            const response = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            );
            console.log('onSnapshotClick.response', response);
            if (response === 'denied' || response === 'never_ask_again') {
                return;
            }
        }
    }
    let result = await takeSnapshotAsync(view, { format: 'jpeg', quality: 1, result: 'tmpfile' });
    return result;
}

/**
 * Load ảnh từ thư viện trả về uri của anh trên điện thoại
 */
module.exports.onImportGalleryClick = async function onImportGalleryClick(isCrop = false, multiple = false, isSquare = true, customOption=null) {
    // if (Platform.OS === 'android') {
    //     isObj = true;
    // }
    let result = await ImagePicker.launchImageLibraryAsync(isCrop, multiple, isSquare, customOption);
    // console.log('.......... result : ',result);
    if (!result.cancelled) {
        // this.setState({ image: result.uri });
        return result;
    }
    return '';
}

module.exports.resizeImage = async function resizeImage(uri, width, height, size = 0, format = 'JPEG', quality = 80) {
    console.log('resizeImage.zzzzz', size, width, height, screenWidth, screenHeight, uri)
    // if (size > 300000) {
    let newWidth = width;
    let newHeight = height;
    if (size > 300000) {
        if (newWidth > newHeight && newHeight > 960) {
            let ratio = newWidth / newHeight;
            newHeight = 960;
            newWidth = ratio * newHeight;
        } else if (newWidth < newHeight && newWidth > 960) {
            let ratio = newHeight / newWidth;
            newWidth = 960;
            newHeight = ratio * newWidth;
        }
    }

    console.log('resizeImage', size, newWidth, newHeight);
    return new Promise((resolve, reject) => {
        ImageResizer.createResizedImage(uri, newWidth, newHeight, format, 100)
            .then(({ uri, path, size }) => {
                console.log('resizeImage.new', size)
                if (Platform.OS === 'ios' && uri.includes('file://')) {
                    uri = uri.replace('file://', '');
                }
                if (size > 300000) {
                    if (newWidth > newHeight && newHeight > 960) {
                        let ratio = newWidth / newHeight;
                        newHeight = 960;
                        newWidth = ratio * newHeight;
                    } else if (newWidth < newHeight && newWidth > 960) {
                        let ratio = newHeight / newWidth;
                        newWidth = 960;
                        newHeight = ratio * newWidth;
                    }
                    let q = getPercentDownSize(size);
                    console.log('resizeImage.new.continue', q)
                    ImageResizer.createResizedImage(uri, newWidth, newHeight, format, q)
                        .then(({ uri, path, size }) => {
                            console.log('resizeImage.new11111111111', size)
                            if (Platform.OS === 'ios' && uri.includes('file://')) {
                                uri = uri.replace('file://', '');
                            }
                            resolve({ uri });
                        })
                        .catch(err => {
                            console.log(err);
                            reject(err)
                        });
                } else {
                    resolve({ uri });
                }
            })
            .catch(err => {
                console.log(err);
                reject(err)
            });
    });
    // }
    // return { uri };
}

module.exports.resizeScoreImage = async function (uri, width, height, size = 0, format = 'JPEG', quality = 80) {
    console.log('resizeImage', size, width, height, screenWidth, screenHeight, uri)
    if (size > 150000) {
        let newWidth = width;
        let newHeight = height;
        if (newWidth > newHeight && newWidth > 960) {
            let ratio = newHeight / newWidth;
            newWidth = 960;
            newHeight = ratio * newWidth;
        } else if (newWidth < newHeight && newHeight > 960) {
            let ratio = newWidth / newHeight;
            newHeight = 960;
            newWidth = ratio * newHeight;
        }
        let q = 80; //size > 2097152 ? (1048576 / size) * 100 : 70;//2097152
        // let q = (1048576 / size) * 100;
        if (size > 10000000) {
            q = 50;
        } else if (size > 5000000) {
            q = 60;
        } else if (size > 3000000) {
            q = 70;
        }
        console.log('resizeImage', q, size, newWidth, newHeight);
        return new Promise((resolve, reject) => {
            ImageResizer.createResizedImage(uri, newWidth, newHeight, format, q)
                .then(({ uri, path, size }) => {
                    console.log('resizeImage.new', size)
                    if (Platform.OS === 'ios' && uri.includes('file://')) {
                        uri = uri.replace('file://', '');
                    }
                    resolve({ uri });
                })
                .catch(err => {
                    console.log(err);
                    reject(err)
                });
        });
    }
    return { uri };
}

let getPercentDownSize = (size) => {
    if (size < 500000) {
        return 95;
    } else if (size < 1000000) {
        return 90;
    } else if (size < 2000000) {
        return 80;
    } else if (size < 3000000) {
        return 70;
    } else if (size < 5000000) {
        return 60;
    } else {
        return 50
    }
}

// module.exports.onImportFile = async function onImportFile() {
//     return new Promise(resolve => {
//         DocumentPicker.show({
//             filetype: [DocumentPickerUtil.pdf(), DocumentPickerUtil.plainText()],
//         }, (error, res) => {
//             // Android
//             resolve(res);
//         });
//     });
// }

module.exports.formatMoney = function (amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
        return amount;
    }
}

module.exports.isIphoneX = function isIphoneX() {
    return checkIphoneX();
}

module.exports.getColorTee = function (tee_id) {
    if (tee_id) {
        return tee_id;
    }
    return 'blue';
}

function remove(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax = arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

module.exports.remove = remove;
/**
 * Xoa doi tuong clone cua 1 doi tuong bat ky trong mang
 * @param {*} array 
 * @param {*} obj 
 */
module.exports.removeObjectUser = function removeObj(array, obj) {
    let i = 0; length = array.length;
    for (; i < length; i++) {
        let item = array[i];
        //console.log("item ",item);
        //console.log("obj ",obj);
        if (item.userId.indexOf(obj.userId) >= 0) {
            return remove(array, item);
        }
    }
    return array;
}

module.exports.formatAvatar = function formatAvata(avatar) {
    return avatar.replace('NULL', '').replace('Null', '').replace('null', '');
}

module.exports.randomInt = function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

/**
 * them gia tri item vao vi tri index cua mang arr
 * @param {*} arr mảng muốn thêm giá trị
 * @param {*} index vi trí cần chèn
 * @param {*} item giá trị cần thêm vào mảng
 */
module.exports.addItemToList = function add(arr, index, item) {
    return arr.splice(index, 0, item);
}

module.exports.showUserId = function showUserId(uid, eHandicap_member_id) {
    return (eHandicap_member_id && eHandicap_member_id.length) ? uid + '-' + eHandicap_member_id : uid;
}

module.exports.convertOverToGross = function convertOverToGross(score, par) {
    if (score === 'Par') {
        return parseInt(par);
    } else if (score === 'Bogey') {
        return parseInt(par) + 1;
    } else {
        return parseInt(par) + parseInt(score);
    }
}

module.exports.convertGrossToOVer = function convertGrossToOVer(score, par) {
    if (score === par) {
        return 0;
    } else if (score > par) {
        return `+${(score - par)}`;
    } else {
        return score - par;
    }
}

module.exports.getSourceRankingManner = function getSourceRankingManner(manner) {
    if (manner === 1) {
        return ICON_MANNER.UP;
    } else if (manner === 2) {
        return ICON_MANNER.NORMAL
    } else {
        return ICON_MANNER.DOWN;
    }
}

module.exports.replaceUser = function (user_id) {
    if (user_id) {
        if (user_id.toString().toLowerCase().indexOf('vga') >= 0) {
            return parseInt(user_id.toLowerCase().replace('vga', ''));
        } else {
            return parseInt(user_id);
        }
    } else {
        return '';
    }

}

module.exports.ShareUrl = function (urlPath) {
    Share.share({
        ...Platform.select({
            ios: {
                url: urlPath,
            },
            android: {
                message: urlPath
            }
        }),
    }, {
        ...Platform.select({
            // ios: {
            //     // iOS only:
            //     excludedActivityTypes: [
            //         'com.apple.UIKit.activity.PostToTwitter'
            //     ]
            // },
            android: {
                // Android only:
                dialogTitle: 'Share: '
            }
        })
    });
}

module.exports.handicap_display = function (handicap) {
    if (handicap < 0) {
        return '+' + Math.abs(handicap);
    } else {
        return (handicap !== undefined) ? handicap : 'N/A';
    }
}

module.exports.checkColorValid = function (str) {
    return true;//HEX_COLOR_REGEX.test(str) || TEE_COLOR.includes(str);
}

module.exports.format_time_comment_send = function (time) {
    if (!time) return '';
    let date = new Date();
    let date_date = date.getDate();
    let time_date = time.getDate();

    if (date_date === time_date) {
        return `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
    } else {
        return `${time.getHours()}:${time.getMinutes()}, ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    }
}

module.exports.format_time_chat_Send = function (time) {
    if (!time) return null;
    // let date = new Date();
    // let date_date = date.getDate();
    // let time_date = time.getDate();

    // if (date_date === time_date) {
    //     return `${time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`;
    // } else {
    //     return `${time.getHours()}:${time.getMinutes()}, ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    // }
    let hours = time.getHours();
    let minute = time.getMinutes();
    hours = hours >= 10 ? hours : '0' + hours;
    minute = minute >= 10 ? minute : '0' + minute;
    return `${hours}:${minute}`;
}

module.exports.format_time_chat = function (time) {
    if (!time) return '';
    let date = new Date();
    let date_year = date.getFullYear();
    let date_month = date.getMonth();
    let date_date = date.getDate();

    let time_year = time.getFullYear();
    let time_month = time.getMonth();
    let time_date = time.getDate();

    // return `${time_date}/${time_month+1}/${time_year}`;
    let hours = time.getHours();
    let minute = time.getMinutes();
    hours = hours >= 10 ? hours : '0' + hours;
    minute = minute >= 10 ? minute : '0' + minute;

    if (date_year === time_year) {
        if (date_month === time_month) {
            if (date_date === time_date) {
                return `${hours}:${minute}`;
            } else {
                return `${time.getDate()}/${time.getMonth() + 1}`;
            }
        } else {
            return `${time.getDate()}/${time.getMonth() + 1}`;
        }
    } else {
        return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    }
}

module.exports.guidGenerator = function () {
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

module.exports.getMaxReducer = (flightId, flight) => Math.max(flightId, flight.id);

module.exports.getMinReducer = (flightId, flight) => Math.min(flightId, flight.id);

module.exports.getMaxRoundReducer = (flightId, round) => Math.max(flightId, round.Flight.id);

module.exports.getMinRoundReducer = (flightId, round) => {
    if (round.Flight.id != 0) {
        return Math.min(flightId, round.Flight.id)
    }
    return flightId;
};

var getDaysInMonth = function (month, year) {
    // Here January is 1 based
    //Day 0 is the last day in the previous month
    return new Date(year, month, 0).getDate();
    // Here January is 0 based
    // return new Date(year, month+1, 0).getDate();
};

module.exports.getDaysInThisMonth = function () {
    let date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return getDaysInMonth(month, year);
}

module.exports.getMaxNewsReducer = (newsId, news) => Math.max(newsId, news.id);

module.exports.getMaxNotificationReducer = (notificationId, notification) => Math.max(notificationId, notification.id);

module.exports.getMinNotificationReducer = (notificationId, notification) => Math.min(notificationId, notification.id);

module.exports.getFormattedTime = function (totalSeconds) {
    let seconds = parseInt(totalSeconds % 60, 10);
    let minutes = parseInt(totalSeconds / 60, 10) % 60;
    let hours = parseInt(totalSeconds / 3600, 10);

    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    hours = hours === '00' ? '' : hours + ':';

    return hours + minutes + ':' + seconds;
}

module.exports.formatTimeCall = function (time_call) {
    time_call = Math.round(time_call / 1000);
    let seconds = parseInt(time_call % 60, 10);
    let minutes = parseInt(time_call / 60, 10) % 60;
    let hours = parseInt(time_call / 3600, 10);

    if (hours) {
        seconds = seconds < 10 ? `0${seconds} ${I18N.t('second')}` : `${seconds} ${I18N.t('second')}`;
        minutes = minutes > 10 ? `${minutes} ${I18N.t('minutes')}` : (minutes === 0 ? '' : `${minutes} ${I18N.t('minutes')}`);
        // hours = hours < 10 ? '0' + hours : hours;

        hours = hours === '0' ? '' : `${hours} ${I18N.t('hour')}`;
        return `${hours} ${minutes} ${seconds}`;
    } else if (minutes) {
        seconds = seconds < 10 ? `${seconds} ${I18N.t('second')}` : `${seconds} ${I18N.t('second')}`;
        minutes = minutes > 10 ? `${minutes} ${I18N.t('minutes')}` : (minutes === 0 ? '' : `${minutes} ${I18N.t('minutes')}`);
        return `${minutes} ${seconds}`;
    } else if (seconds) {
        seconds = seconds < 10 ? `${seconds} ${I18N.t('second')}` : `${seconds} ${I18N.t('second')}`;
        return `${seconds}`;
    } else {
        return '';
    }
}

/**
 * Viết hoa chữ cái đầu của chuỗi
 * @param {string} string
 */
module.exports.toUpperCaseFirst = function jsUcfirst(string) {
    if (!string || !string.length || typeof string !== 'string') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.downloadFile = function (url, onSuccess, onError, onProgress) {
    console.log('downloadFile', url)
    if (Platform.OS === 'android') {
        Permissions.check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((response) => {
            console.log('Permissions.check', response)
            if (response != RESULTS.GRANTED) {
                Permissions.request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, { type: 'always' }).then(response => {
                    console.log('Permissions.request', response)
                    if (response === 'authorized') {
                        implementDownload(url, onSuccess, onError);
                    } else {

                    }
                })
            } else {
                implementDownload(url, onSuccess, onError);
            }
        })
    } else {
        // CameraRoll.saveToCameraRoll(url)
        // .then(()=>{
        //     console.log('saveToCameraRoll.success')
        //     // if (onSuccess) {
        //     //     onSuccess('ios');
        //     // }
        // }).catch((error)=>{
        //     console.log('saveToCameraRoll', error)
        //     // if (onError) {
        //     //     onError('ios');
        //     // }
        // })

        // RNFetchBlob.config({
        //     IOSBackgroundTask: true, // required for both upload
        //     IOSDownloadTask: true, // Use instead of IOSDownloadTask if uploading
        //     path: this.isAndroid ? tmpPath : dest,
        //     fileCache: true
        //   })
        //     .fetch('GET', url, {
        //       Range: this.isAndroid ? `bytes=${stat.size}-` : ''
        //     })
        //     .progress((receivedStr, totalStr) => {
        //       // Do any things

        //     })
        //     this.downtask.catch(async err => {
        //       // Check error
        //     })






        var date = new Date();
        var ext = extension(url);
        if (ext && ext.length > 0) {
            ext = "." + ext[0];
        } else {
            let splitPath = url.split('.');
            if (splitPath.length > 0) {
                ext = '.' + splitPath[splitPath.length - 1];
            } else {
                ext = '.jpg';
            }
        }

        if (ext.indexOf('.bin') >= 0) {
            ext = '.jpg';
        }
        let desPath = `${RNFS.DocumentDirectoryPath}/vhandicap_${date.getTime()}${ext}`;
        console.log('DocumentDirectoryPath', desPath)

        RNFS.downloadFile({
            fromUrl: url,
            toFile: desPath,
            background: true,
            discretionary: true,
            progress: (({ jobId, contentLength, bytesWritten }) => {
                let percent = bytesWritten / contentLength;
                // console.log('DocumentDirectoryPath.progress', bytesWritten, contentLength, percent);
                if (onProgress) {
                    onProgress(percent);
                }
            })
        }).promise.then((r) => {
            console.log('DocumentDirectoryPath.onSuccess', r)
            // CameraRoll.saveToCameraRoll(desPath)
            //     .then(() => {
            //         console.log('saveToCameraRoll.success')
            //         // if (onSuccess) {
            //         //     onSuccess('ios');
            //         // }
            //     }).catch((error) => {
            //         console.log('saveToCameraRoll', error)
            //         // if (onError) {
            //         //     onError('ios');
            //         // }
            //     })
            var promise = CameraRoll.saveToCameraRoll(desPath);
            promise.then(function (result) {
                console.log('save succeeded ' + result);
            }).catch(function (error) {
                console.log('save failed ' + error);
            });
            if (onSuccess) {
                onSuccess();
            }
        });
    }
}

module.exports.downloadFileFromInternet = function (url, onSuccess, onError, onProgress,grant_callback = null) {
    console.log('downloadFile', url)
    if (Platform.OS === 'android') {
        Permissions.check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((response) => {
            console.log('Permissions.check', response)
            if (response != RESULTS.GRANTED) {
                Permissions.request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, { type: 'always' }).then(response => {
                    console.log('Permissions.request', response)
                    if (response === 'authorized' || response === 'granted') {
                        implementDownloadFile(url, onSuccess, onError, onProgress);
                    } else {

                    }
                    // if(grant_callback){
                    //     grant_callback();
                    // }
                })
            } else {
                implementDownloadFile(url, onSuccess, onError, onProgress);
            }
        })
    } else {

        var date = new Date();
        var ext = extension(url);
        if (ext && ext.length > 0) {
            ext = "." + ext[0];
        } else {
            let splitPath = url.split('.');
            if (splitPath.length > 0) {
                ext = '.' + splitPath[splitPath.length - 1];
            } else {
                ext = '.jpg';
            }
        }
        if (ext.indexOf('.bin') >= 0) {
            ext = '.jpg';
        }
        let desPath = `${RNFS.DocumentDirectoryPath}/vhandicap_${date.getTime()}${ext}`;
        console.log('DocumentDirectoryPath', desPath)

        RNFS.downloadFile({
            fromUrl: url,
            toFile: desPath,
            background: true,
            discretionary: true,
            progress: (({ jobId, contentLength, bytesWritten }) => {
                let percent = bytesWritten / contentLength;
                // console.log('DocumentDirectoryPath.progress', bytesWritten, contentLength, percent);
                if (onProgress) {
                    onProgress(percent);
                }
            })
        }).promise.then((r) => {
            console.log('DocumentDirectoryPath.onSuccess', r)
            var promise = CameraRoll.saveToCameraRoll(desPath);
            promise.then(function (result) {
                console.log('save succeeded ' + result);
            }).catch(function (error) {
                console.log('save failed ' + error);
            });
            if (onSuccess) {
                onSuccess(desPath);
            }
        });
    }
}

let implementDownloadFile = (url, onSuccess, onError, onProgress = null) => {
    var date = new Date();
    var ext = extension(url);
    if (ext && ext.length > 0) {
        ext = "." + ext[0];
    } else {
        let splitPath = url.split('.');
        if (splitPath.length > 0) {
            ext = '.' + splitPath[splitPath.length - 1];
        } else {
            ext = '.jpg';
        }
    }
    console.log('implementDownload.ext', ext)
    if (ext.indexOf('.bin') >= 0) {
        ext = '.jpg';
    }

    // let PictureDir = fs.dirs.PictureDir;
    let PictureDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
    let options = {
        path: PictureDir + "/vhandicap_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        // fileCache: false
        fileCache: true,
        // addAndroidDownloads: {
        //     useDownloadManager: true,
        //     notification: true,
        //     path: PictureDir + "/vhandicap_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        //     description: 'Picture',
        // }
    }
    config(options)
        .fetch('GET', url)
        .progress({ interval: 250 }, (received, total) => {
            // console.log(received, total);
            let percent = received / total;
            // console.log('DocumentDirectoryPath.progress', received, total, percent);
            if (onProgress) {
                onProgress(percent);
            }
        })
        // .progress({ interval: 250 },(received,total)=>{
        //     console.log('progress',received/total);

        // })
        .then((res) => {
            console.log('download.path', res.path())
            // if (Platform.OS === 'ios') {
            //     RNFetchBlob.ios.openDocument(res.path());
            // } else {
            //     RNFetchBlob.android.actionViewIntent(res.path(), "image/jpeg");
            // }
            if (onSuccess) {
                onSuccess(res.path());
            }
        }).catch((error) => {
            console.log('implementDownload', error)
            if (onError) {
                onError('android');
            }
        });
}

let implementDownload = (url, onSuccess, onError) => {
    var date = new Date();
    var ext = extension(url);
    if (ext && ext.length > 0) {
        ext = "." + ext[0];
    } else {
        let splitPath = url.split('.');
        if (splitPath.length > 0) {
            ext = '.' + splitPath[splitPath.length - 1];
        } else {
            ext = '.jpg';
        }
    }
    console.log('implementDownload.ext', ext)
    if (ext.indexOf('.bin') >= 0) {
        ext = '.jpg';
    }

    // let PictureDir = fs.dirs.PictureDir;
    let PictureDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.PictureDir;
    let options = {
        // path: DocumentDir + "/file_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        // fileCache: false
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: PictureDir + "/vhandicap_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
            description: 'Picture'
        }
    }
    config(options)
        .fetch('GET', url)
        .progress({ count: 1 }, (received, total) => {
            console.log(received, total)
        })
        // .progress({ interval: 250 },(received,total)=>{
        //     console.log('progress',received/total);

        // })
        .then((res) => {
            console.log('download.path', res.path())
            // if (Platform.OS === 'ios') {
            //     RNFetchBlob.ios.openDocument(res.path());
            // } else {
            //     RNFetchBlob.android.actionViewIntent(res.path(), "image/jpeg");
            // }
            if (onSuccess) {
                onSuccess(res.path());
            }
        }).catch((error) => {
            console.log('implementDownload', error)
            if (onError) {
                onError('android');
            }
        });
}

let extension = (filename) => {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
}

module.exports.callPhoneDial = function (hotline) {
    if (Platform.OS === 'android') {
        SendIntentAndroid.sendPhoneDial(`${hotline}`);
    } else {
        // call(args).catch(console.error);
        const url = `tel:${hotline}`;
        let self = this;
        Linking.canOpenURL(url).then(canopen => {
            if (canopen) {
                Linking.openURL(url).catch((err) => Promise.reject(err))
            } else {
                Alert.alert(
                    self.t('thong_bao'),
                    'Sim is not installed',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: true }
                )
            }
        });
    }
}

module.exports.sendEmail = function (emailTo) {
    let url = `mailto:${emailTo}`;

    let self = this;
    Linking.canOpenURL(url).then(canopen => {
        if (canopen) {
            Linking.openURL(url).catch((err) => Promise.reject(err))
        } else {
            // Alert.alert(
            //     self.t('thong_bao'),
            //     'Sim is not installed',
            //     [
            //         { text: 'OK', onPress: () => console.log('OK Pressed') },
            //     ],
            //     { cancelable: true }
            // )
        }
    });
}

// startLocation and endLocation are objects with latitude and longitude
//decimals (default 2) is number of decimals in the output
//return is distance in meter. 
exports.getDistanceLocation = function (startLocation, endLocation, decimals) {
    decimals = decimals || 2;
    var earthRadius = 6371; // km

    let lat1 = parseFloat(startLocation.latitude);
    let lat2 = parseFloat(endLocation.latitude);
    let lon1 = parseFloat(startLocation.longitude);
    let lon2 = parseFloat(endLocation.longitude);


    // var radlat1 = Math.PI * lat1 / 180
    // var radlat2 = Math.PI * lat2 / 180
    // var radlon1 = Math.PI * lon1 / 180
    // var radlon2 = Math.PI * lon2 / 180
    // var theta = lon1 - lon2;
    // var radtheta = Math.PI * theta / 180
    // var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    // dist = Math.acos(dist)
    // dist = dist * 180 / Math.PI
    // dist = dist * 60 * 1.1515
    // console.log('getDistanceLocation', dist, dist * 160.9344)
    // return Math.round(dist * 160.9344);
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1000; // Distance in km
    return Math.round(d);
};

let deg2rad = (deg) => {
    return deg * (Math.PI / 180)
}

exports.convertMetToYard = function (meter) {
    return Math.round(meter * 1.0936133);
};

exports.validateEmail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    return re.test(String(email).toLowerCase());
};

exports.formatStt = function (stt) {
    switch (stt) {
        case 1:
            return '1st'
        case 2:
            return '2nd'
        case 3:
            return '3rd'

        default:
            return `${stt}th`;
    }
};

exports.convertBase64 = function (file) {
    return new Promise((resolve, reject) => {
        RNFetchBlob.fs.readFile(file, 'base64')
            .then((data) => {
                // handle the data ..
                var base64Data = 'data:image/png;base64,' + data;
                // console.log('.......base64Data : ',base64Data);
                // return base64Data;
                resolve(base64Data);
            }).catch((error) => {
                console.log('zzzzzzzzzzzzzzz', error)
                reject(error);
            });
    });
}

exports.convertFile = async function (uriPhoto) {

    return new Promise((resolve, reject) => {
        Permissions.check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((response) => {
            console.log('Permissions.check', response)
            if (response != RESULTS.GRANTED) {
                Permissions.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, { type: 'always' }).then(response => {
                    console.log('Permissions.request', response)
                    if (response === 'authorized') {
                        implementConvert(uriPhoto, resolve, reject)
                    } else {
                        reject();
                    }
                })
            } else {
                implementConvert(uriPhoto, resolve, reject)
            }
        })


    })

}

let implementConvert = (uriPhoto, resolve, reject) => {
    if (Platform.OS === 'ios') {
        if (uriPhoto.startsWith('ph://')) {
            imagePATH = uriPhoto.substring(5, 41);
            let photoPATH = `assets-library://asset/asset.JPG?id=${imagePATH}&ext=JPG`;

            const dest = `${RNFS.TemporaryDirectoryPath}${Math.random().toString(36).substring(7)}.jpg`;

            RNFS.copyAssetsFileIOS(photoPATH, dest, 960, 960, 1.0, 1.0, 'contain')
                .then(data => {
                    RNFetchBlob.fs.stat(data)
                        .then((stats) => {
                            Image.getSize(photoPATH, (width, height) => {
                                stats.width = width;
                                stats.height = height;
                                resolve(stats);
                            }, () => {
                                resolve(stats);
                            });

                            //     stats = {
                            //         // file name
                            //         filename : 'foo.png',
                            //         // folder of the file or the folder itself
                            //         path : '/path/to/the/file/without/file/name/',
                            //         // size, in bytes
                            //         size : 4901,
                            //         // `file` or `directory`
                            //         type : 'file',
                            //         // last modified timestamp
                            //         lastModified : 141323298
                            //    }
                        })
                        .catch((err) => { reject(err) })

                });
        } else {
            RNFetchBlob.fs.stat(uriPhoto)
                .then((stats) => {
                    Image.getSize(uriPhoto, (width, height) => {
                        stats.width = width;
                        stats.height = height;
                        resolve(stats);
                    }, () => {
                        resolve(stats);
                    });
                })
                .catch((err) => { reject(err) })
        }
    } else if (Platform.OS === 'android') {
        RNFetchBlob.fs.stat(uriPhoto)
            .then((stats) => {
                Image.getSize(uriPhoto, (width, height) => {
                    stats.width = width;
                    stats.height = height;
                    resolve(stats);
                }, (err) => {
                    resolve(stats);
                });
            })
            .catch((err) => { reject(err) })
    }
}

exports.checkSpecialCharacter = function (text) {
    let format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(text);
};