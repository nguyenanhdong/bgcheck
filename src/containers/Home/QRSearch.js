import React from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import Text from '@components/Text';
import TitleScreen from '@components/TitleScreen';
import { RNCamera } from 'react-native-camera';
import { deviceWidth, deviceHeight,Url } from '@assets/constants';
import Orientation from 'react-native-orientation';
import axios from 'axios';
import {connect} from 'react-redux';
import { pushItem } from '@containers/App/actions';


const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      isShowTakePhoto: false,
      uriImage:'',
      isLoading:false
    }
  }
  
  
  componentDidMount (){
    this.props.navigation.addListener('willFocus', route => {
      // Orientation.lockToLandscape();
      this.setState({isLoading:false})
    });
  }
  _goDetail = code =>{
    let type = this.props.navigation.state.params.tab;
    // console.log('code',code,type);

    if(type == 1)
      this.SearchTransactionList(code);
    else if(type == 3)
      this.SearchTransactionListNoImage(code);
  }
  SearchTransactionList = value =>{
    this.setState({isLoading:true});
    let self  = this;
    let UserName = this.props.userInfo.UserName;
    let Option = '1';
    let Content = value;
    axios.get(Url+`/api/SearchTransactionList?UserName=${UserName}&Option=${Option}&Content=${Content}`)
    .then(function (response) {
      console.log('SearchTransactionList',response);
      if((response.status == 200 || response.status) && response.data.length > 0){
        self.props.pushItem(response.data[0]);
        self.props.navigation.navigate('Detail',{item:response.data[0]});
      }else
        Alert.alert(
          'Không tìm thấy hồ sơ',
          `Không tìm thấy hồ sơ nào có mã số ${value}`,
          [
              {
                text:'OK',
                onPress : ()=>console.log('lỗi')
              }
          ]
        );
    })
    .catch(function (error) {
      console.log('error',error);
      Alert.alert(
        'Lỗi',
        'Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút',
        [
            {
              text:'OK',
              onPress : ()=>console.log('lỗi')
            }
        ]
      );
    })
    .finally(function () {
      self.setState({isLoading:false});
    });  
  } 
  SearchTransactionListNoImage = value =>{
    this.setState({isLoading:true});
    let self  = this;
    let UserName = this.props.userInfo.UserName;
    let Option = '1';
    let Content = value;
    axios.get(Url+`/api/SearchTransactionListNoImage?UserName=${UserName}&Option=${Option}&Content=${Content}`)
    .then(function (response) {
      // console.log('SearchTransactionListNoImage',response);
      if((response.status == 200 || response.status) && response.data.length > 0){
        self.props.pushItem(response.data[0]);
        self.props.navigation.navigate('NotImage',{item:response.data[0]});
      }else
      Alert.alert(
          'Không tìm thấy hồ sơ',
          `Không tìm thấy hồ sơ nào có mã số ${value}`,
          [
              {
                text:'OK',
                onPress : ()=>console.log('lỗi')
              }
          ]
        );
    })
    .catch(function (error) {
      console.log(error);
      Alert.alert(
        'Lỗi',
        'Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút',
        [
            {
              text:'OK',
              onPress : ()=>console.log('lỗi')
            }
        ]
      );
    })
    .finally(function () {
      // self.setState({isLoading:false});
    });  
  } 
  _barcode = (data) => {
    // console.log('_barcode', data);
    
    if(this.state.code == ''){
      this.setState({ code: data.data });
      Alert.alert(
        'Đến trang chi tiết hồ sơ',
        `Hồ sơ ${data.data}`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => this._goDetail(data.data)
          }
        ]
      )
    }
  }
  _Back = () => {
    this.props.navigation.goBack();
  }
  render() {
    return (
      <View style={styles.container}>
        <TitleScreen
          backButton={true}
          title={'Quét mã QR'}
          eventBack={this._Back}
        />
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          androidCameraPermissionOptions={{
            title: 'Cho phép sử dụng camara',
            message: 'Cho phép sử dụng camara của bạn',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onBarCodeRead={(data) => this._barcode(data)}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        >
          {({ camera, status, recordAudioPermissionStatus }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <View style={{ width: 150, height: 150, borderColor: 'red', borderWidth: 3 }}>

                </View>
                <Text style={{color:'#fff',marginTop:10,fontWeight:'600'}}>Di chuyển camera đến vùng chứa mã QR để quét</Text>
                {!this.state.isShowTakePhoto && <View style={{ flexDirection: 'row', justifyContent: 'flex-start', height: 50,marginTop:30 }}>
                  <View style={{ backgroundColor: '#fff', width: '60%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 15 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.state.code}</Text>
                  </View>
                </View>}
               
              </View>
            );
          }}
        </RNCamera>
        {this.state.isLoading && <View style={styles.loading}>
          <ActivityIndicator size="large" color="#315f93" />
        </View>}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userInfo:state.app.userInfo
  };
}

const mapDispatchToProps = {
  pushItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    width:'100%',
    flex:1
  },
  capture: {
    backgroundColor: '#315f93',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    backgroundColor: '#fff',
    // opacity: 0.4
  }
}
