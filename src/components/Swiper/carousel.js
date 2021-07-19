import React from 'react';
import _ from 'lodash';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import SliderEntry from '@components/Swiper/slider';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;
class CarouselTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      slider1ActiveSlide: 1,
    };
    this._renderItemWithParallax = this._renderItemWithParallax.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({data: _.cloneDeep(nextProps.data)});
    }
  }
  onPressImage = index => {
    if (typeof this.props.onPress !== 'undefined') {
      this.props.onPress(index);
    }
  };
  _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        index={index}
        even={(index + 1) % 2 === 0}
        parallax={false}
        parallaxProps={parallaxProps}
        description={false}
        styleImage={typeof this.props.styleImage !== 'undefined' ? this.props.styleImage : {}}
        onPressImage={index => this.onPressImage(index)}
      />
    );
  }
  render() {
    const {slider1ActiveSlide, data} = this.state;
    return (
      <View
        style={[
          styles.exampleContainerLight,
          typeof this.props.style !== 'undefined' && this.props.style,
        ]}>
        <Carousel
          ref={c => (this._slider1Ref = c)}
          data={data}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={typeof this.props.itemWidth !== 'undefined' ? this.props.itemWidth : 130}
          hasParallaxImages={true}
          firstItem={slider1ActiveSlide}
          inactiveSlideScale={typeof this.props.itemScale !== 'undefined' ? this.props.itemScale : 0.9}
          inactiveSlideOpacity={0.4}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={false}
          loopClonesPerSide={2}
          autoplay={false}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => {
            this.setState({slider1ActiveSlide: index});
            this.props.actionScroll(index);
          }}
        />
        {this.props.pagination && (
          <Pagination
            dotsLength={data.length}
            activeDotIndex={slider1ActiveSlide}
            containerStyle={styles.paginationContainer}
            dotColor={'#1D2C4C'}
            dotStyle={styles.paginationDot}
            inactiveDotColor={'#1D2C4C'}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
          />
        )}
      </View>
    );
  }
}

const colors = {
  black: '#1D2C4C',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  scrollview: {
    flex: 1,
  },
  exampleContainer: {
    paddingVertical: 15,
  },
  exampleContainerDark: {
    backgroundColor: colors.black,
  },
  exampleContainerLight: {
    backgroundColor: 'white',
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleDark: {
    color: colors.black,
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  slider: {
    marginTop: 5,
    overflow: 'visible', // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 0, // for custom animation
  },
  paginationContainer: {
    paddingVertical: 2,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});

export default CarouselTemplate;
