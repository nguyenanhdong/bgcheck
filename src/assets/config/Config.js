
import DataManager from '../Core/Manager/DataManager';
let url = 'https://api-dev.vietfootballnetwork.com/api/v1/';

module.exports.getBaseUrl = function getBaseUrl(){
    return url;
};

let userAgent = '';

module.exports.genURL = function genURL(...args) {
    if(!args.length){
        return url;
    }
    let _url = url + `${args[0]}?`;
    let i = 1;
    let length = args.length;
    for(;i<length;i++){
        let param = args[i];
        console.log("param : ",param);
        _url = _url +`%s=${param}&`;
    }
    return _url.slice(0,_url.length-1);
}

module.exports.email = '';//'feedback@golfvn.com';
module.exports.hotline = '';//'089 9955599';
module.exports.version = 10;
module.exports.facebook_forum = '';//'https://www.facebook.com/golfervncom';
module.exports.youtube_forum = '';//'https://www.youtube.com/channel/UCR6U1Cl0mP1js4PROvrt0Cw/videos';
module.exports.website = '';//'https://vhandicap.com';
module.exports.ott = [];
module.exports.ads_contact = '';
module.exports.sale_contact = '+84933338283';

module.exports.setUserAgent = function(_agent){
    console.log("set useragent : "._agent);
    userAgent = _agent;
}
module.exports.getUserAgent = function(){
    return userAgent;
}
module.exports.setBaseUrl = function(urlBase = ''){
    
}

var settingSound = true;
module.exports.settingSound = function(_isSetting){
    settingSound = _isSetting;
    DataManager.saveSettingSoundApp(settingSound.toString());
}

module.exports.getSound = function(){
    return settingSound;
}

