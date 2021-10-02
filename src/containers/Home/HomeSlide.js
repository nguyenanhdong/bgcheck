import React from 'react';
import Slideshow from '@components/Slideshow';
import { BASE_URL, colorDefault ,deviceHeight,deviceWidth} from '@assets/constants';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator,View,FlatList,TouchableOpacity,Platform } from 'react-native';
import FastImage from 'react-native-fast-image'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export default class SlideshowTest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 1,
      interval: null,
      load: false,
      indexSlide: 0,
      dataSource: [
        // {
        //   title: 'Title 1',
        //   caption: 'Caption 1',
        //   url: 'http://placeimg.com/640/480/any',
        // }, {
        //   title: 'Title 2',
        //   caption: 'Caption 2',
        //   url: 'http://placeimg.com/640/480/any',
        // }, {
        //   title: 'Title 3',
        //   caption: 'Caption 3',
        //   url: 'http://placeimg.com/640/480/any',
        // },
      ],
    };
    this.interval = null;
  }

  componentDidMount() {
    // this.interval =  setInterval(() => {
    //   this.setState({
    //     position: this.state.position === dataSource.length ? 0 : this.state.position + 1
    //   });
    // }, 2000)
    this.getData();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  getData = () => {
    let self = this;
    self.setState({ load: true })

    axios.get(`${BASE_URL}api/GetlistBanner`)
      .then((response) => {
        console.log('response GetlistBanner', response);
        if (response.status == 200) {
          let dataSource = [], resJson = response.data;
          resJson.map(item => {
            dataSource.push({ url: item.Anh })
          })
          self.setState({ dataSource })
        }
      })
      .catch(function (error) {
        console.log('error', error)
        showMessage({
          message: 'Có lỗi xảy ra. Vui lòng tắt thoát app và thử lại !',
          duration: 3000,
          type: "danger",
          icon: 'danger'
        });
      })
      .finally(function () {
        self.setState({ load: false })
      });
  }
  renderSlideBanner = (item,index) => {
    return(
      <View
        activeOpacity={0.7}
        style={{width:deviceWidth}}
        key={`swiper_${index}`}
        >
        {/* <Image
          source={{uri: item.image}}
          style={styles.img_slide}
          resizeMethod="resize"
        /> */}
          <FastImage
          style={styles.img_slide}
          source={{
            uri: item.url
        }}
        // resizeMethod="resize"
        resizeMode="contain"
          />
      </View>
    )
  }
  onScrollEnd = (e) => {
    let contentOffset = e.nativeEvent.contentOffset;
    let viewSize = e.nativeEvent.layoutMeasurement;

    // Divide the horizontal offset by the width of the view to see which page is visible
    let pageNum = Math.round(contentOffset.x / viewSize.width);
    this.setState({indexSlide:pageNum});
  }
  render() {
    console.log('render');
    let { dataSource, position, load,indexSlide } = this.state;
    if (load)
      return (
        <View style={styles.css_loading}>
          <ActivityIndicator animating size="large" color={'#fff'} />
        </View>
      )

    return (
      <View style={styles.box_slide}>
                <FlatList
                  horizontal
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  legacyImplementation={false}
                  data={dataSource}
                  renderItem={({item,index}) => this.renderSlideBanner(item,index)}
                  keyExtractor={(item,index) => index.toString()}
                  style={{width: '100%'}}
                  onMomentumScrollEnd={this.onScrollEnd}
              />
              {dataSource.length > 1 && <View style={styles.pageSlide}>
                  {dataSource.map((item,index)=>(
                    <View key={`slide_${index}`} style={[styles.doted,indexSlide == index && styles.doted_active, index == (dataSource.length - 1) && {marginRight:0} ]} >
                    </View>
                  ))}
              </View>}
            </View>
      // <Slideshow
      //   dataSource={dataSource}
      //   position={position}
      //   onPositionChanged={position => this.setState({ position })} 
      //   height = {deviceHeight}
      //   />
    );
  }
}
const HEADER_HEIGHT = Platform.select({
  android: 56,
  default: 44,
}) + getStatusBarHeight() + 20
const styles = {
  css_loading: {
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderWidth: 1,
    backgroundColor:'rgba(0,0,0,0.5)'
},
box_slide: {
  marginTop: 15,
  borderRadius: 6,
  paddingBottom: 10,
  // overflow: 'hidden',
  width:'100%',
},
pageSlide:{
  flexDirection:'row',
  justifyContent:'center',
  position:'relative',
  top:17
},
doted_active:{
  backgroundColor:'#f15a29'
},
doted:{
  width:10,
  height:10,
  borderRadius:5,
  marginRight:8,
  backgroundColor:'gray'
},
swiper: {
  height: 200,
},
img_slide: {
  width: '100%',
  height: deviceHeight - 60 - HEADER_HEIGHT - 40,
  // resizeMode: 'stretch',
},
}
