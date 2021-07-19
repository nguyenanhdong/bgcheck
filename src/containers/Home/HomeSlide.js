import React from 'react';
import Slideshow from '@components/Slideshow';

const dataSource = [
    {
        title: 'Chính xác',
        caption: 'Hệ thống được xây dựng bởi cntt Bắc Giang',
        url: 'http://testcrm.minland.com.vn/bncheck_slide1.jpg'
    },
    {
        title: 'Xuất xứ, Vận chuyển',
        caption: 'Kiểm tra Xuất xứ sản phẩm, quá trình vận chuyển',
        url: 'http://testcrm.minland.com.vn/bncheck_slide2.jpg'
    },
    {
        title: 'Tin cậy',
        caption: 'Hệ thống được xây dựng bởi cntt Bắc Giang',
        url: 'http://testcrm.minland.com.vn/bncheck_slide3.png'
    }
]
export default class SlideshowTest extends React.Component {
    constructor(props) {
      super(props);
   
      this.state = {
        position: 1,
        interval: null,
        dataSource: [
          {
            title: 'Title 1',
            caption: 'Caption 1',
            url: 'http://placeimg.com/640/480/any',
          }, {
            title: 'Title 2',
            caption: 'Caption 2',
            url: 'http://placeimg.com/640/480/any',
          }, {
            title: 'Title 3',
            caption: 'Caption 3',
            url: 'http://placeimg.com/640/480/any',
          },
        ],
      };
      this.interval = null;
    }
   
    componentWillMount() {
        // this.interval =  setInterval(() => {
        //   this.setState({
        //     position: this.state.position === dataSource.length ? 0 : this.state.position + 1
        //   });
        // }, 2000)
    }
   
    componentWillUnmount() {
      clearInterval(this.interval);
    }
   
    render() {
      console.log('render')
      return (
      <Slideshow 
          dataSource={dataSource}
          position={this.state.position}
          onPositionChanged={position => this.setState({ position })} />
      );
    }
  }
