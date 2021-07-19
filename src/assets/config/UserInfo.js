import AppUtil from './AppUtil';

var id;
var userToken = '';
var userType = '';
var phoneNumber = '';
var latitude = 0;
var longitude = 0;
var userProfile;
var QAClient = '';//url Q&A Client
var lang = 'vn';

var fuid = '';
var wallet_coin = 0;

module.exports.setWalletCoin = function(coin){
    wallet_coin = coin;
}

module.exports.getWalletCoin = function(){
    return wallet_coin;
}

module.exports.getFuid = function () {
    return fuid;
}

module.exports.setFuid = function (_fuid) {
    fuid = _fuid;
}

module.exports.getQA = function () {
    return QAClient;
}

module.exports.setQA = function (_qa) {
    QAClient = _qa;
}

/**
 * clear du lieu local khi logout
 */
module.exports.clearProfile = function () {
    userProfile = {};
    id = "";
    userToken = "";
    userType = "";
    phoneNumber = "";
}

module.exports.getListPhone = function () {
    return userProfile.getListPhone();
}

module.exports.getCountryImage = function () {
    return userProfile.getCountryImage();// ? userProfile.country_image : '';
}

module.exports.getCountry = function () {
    return userProfile.getCountry();// ? userProfile.country : '';
}

module.exports.getCountryId = function () {
    return userProfile.getCountryId();// ? userProfile.country : '';
}

module.exports.setCountryId = function (_countryId) {
    userProfile.setCountryId(_countryId);
}

module.exports.getCountryName = function () {
    return userProfile.getCountryName();// ? userProfile.country : '';
}

module.exports.setCountryName = function (_countryName) {
    userProfile.setCountryName(_countryName);
}

module.exports.getState = function () {
    return userProfile.getState();
}

module.exports.setState = function (_state) {
    return userProfile.setState(_state);
}

module.exports.setCountry = function (_country) {
    userProfile.setCountry(_country);
}

module.exports.getLang = function () {
    return lang;
}

module.exports.setLang = function (_lang) {
    lang = _lang;
}

module.exports.getTeeDefault = function () {
    return userProfile.getDefaultTeeID();// ? userProfile.default_tee_id : 'Blue';
}

module.exports.setTeeDefault = function (_tee) {
    userProfile.setDefaultTeeID(_tee);
}

module.exports.getClubName = function () {
    return userProfile.getEhandicapClub();// ? userProfile.ehandicap_club : '';
}

module.exports.getDateCreate = function () {
    return userProfile.getCreateTimeDisplay();// ? userProfile.create_time_display : '';
}

module.exports.getBirthday = function () {
    return userProfile.getBirthday();// ? userProfile.birthday : '';
}

module.exports.getBirthdayDisplay = function () {
    return userProfile.getDisplayBirthday();// ? userProfile.birthday_display : '';
}

module.exports.setBirthdayDisplay = function (_display_birthday) {
    userProfile.setDisplayBirthday(_display_birthday);
}

module.exports.setBirthday = function (_birthday) {
    userProfile.setBirthday(_birthday);
}

module.exports.getCity = function () {
    return userProfile.getCity();// ? userProfile.city : '';
}

module.exports.setCity = function (_city) {
    userProfile.setCity(_city);
}

module.exports.getSex = function getSex() {
    return userProfile.getGender();// ? userProfile.gender : 0;
}

module.exports.setSex = function (_sex) {
    userProfile.setGender(_sex);
}

module.exports.setFullname = function setFullname(_fullname) {
    userProfile.setFullname(_fullname);
}

module.exports.getFullname = function () {
    return userProfile? userProfile.getFullName(): '';// ? userProfile.fullname : '';
}

module.exports.getUserToken = function getUserToken() {
    return userToken;
}

module.exports.setUserToken = function setUserToken(_token) {
    userToken = _token;
}

module.exports.getUserType = function getUserType() {
    return userType;
}

module.exports.setUserType = function setUserType(_userType) {
    userType = _userType;
}

module.exports.getPhoneNumber = function getPhoneNumber() {
    return phoneNumber;
}

module.exports.setPhoneNumber = function setPhoneNumber(_phoneNumber) {
    phoneNumber = _phoneNumber;
}
/////////////////////////////////////////////////////////////
module.exports.getUserId = function () {
    return userProfile ? userProfile.getUserId() : '';// ? userProfile.userId : '';
}

module.exports.setUserId = function (_userId) {
    userProfile.setUserId(_userId);
}
////////////////////////////////////////////////////////////
module.exports.getId = function getId() {
    return id;
}

module.exports.setId = function setId(_Id) {
    id = AppUtil.replaceUser(_Id);
}
////////////////////////////////////////////////////////////
module.exports.getUserName = function getUserName() {
    return userProfile.userName ? userProfile.userName : '';
}

module.exports.setUserName = function setUserName(_userName) {
    userProfile.userName = _userName;
}
///////////////////////////////////////////////////////////
module.exports.getUserHandicap = function () {
    return userProfile.getUsgaHcIndex();// ? userProfile.usga_hc_index : '';
}

module.exports.setUserHandicap = function (_userHandicap) {
    userProfile.setUsgaHcIndex(_userHandicap);
}
//////////////////////////////////////////////////////////
module.exports.getUserRanking = function () {
    return userProfile.getRanking();// ? userProfile.userRanking : '';
}

module.exports.setUserRanking = function setUserRanking(_ranking) {
    userProfile.setRanking(_ranking);
}
//////////////////////////////////////////////////////////
module.exports.getUserSystemRanking = function () {
    return userProfile.getSystem_ranking();// ? userProfile.userSystemRanking : '';
}

module.exports.setUserSystemRanking = function setUserSystemRanking(_systemRanking) {
    userProfile.setSystem_ranking(_systemRanking);
}
///////////////////////////////////////////////////////////
module.exports.getUserRankingManners = function () {
    return userProfile.getRanking_manners();// ? userProfile.userRankingManners : '';
}

module.exports.setUserRankingManners = function (_rankingManners) {
    userProfile.setRanking_manners(_rankingManners);
}
///////////////////////////////////////////////////////////
module.exports.getUserAvatar = function () {
    return userProfile ? userProfile.getAvatar() : null;// ? userProfile.avatar : '';
}

module.exports.setUserAvatar = function (_userAvatar) {
    userProfile.setAvatar(_userAvatar);
}

module.exports.getOriginAvatar = function () {
    return userProfile ? userProfile.getOriginAvatar() : null;// ? userProfile.avatar : '';
}

module.exports.setOriginAvatar = function (_userAvatar) {
    userProfile.setOriginAvatar(_userAvatar);
}

module.exports.getUserProfile = function getUserProfile() {
    return userProfile;
}

module.exports.setUserProfile = function setUserInfo(_userProfile) {
    userProfile = _userProfile;
    id = _userProfile.data ? _userProfile.data._id : _userProfile._id;
}

module.exports.setLatitude = function setLatitude(_latitude) {
    latitude = _latitude;
}

module.exports.getLatitude = function getLatitude() {
    return latitude;
}

module.exports.setLongitude = function setLongitude(_longitude) {
    longitude = _longitude;
}

module.exports.getLongitude = function getLongitude() {
    return longitude;
}