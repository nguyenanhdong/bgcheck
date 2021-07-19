import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from './slider.style';
import FastImage from 'react-native-fast-image'
import Arrow from '@assets/images/ic_app/arrow_right.svg';
import { colorDefault, deviceWidth, deviceHeight, isAndroid } from '@assets/constants';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {url,title,price},
      parallax,
      parallaxProps,
      even,
    } = this.props;
    return (
      <View style={{flexDirection:'row',borderWidth:1,borderColor:'#ccc',width:deviceWidth*80/100}}>
            <View >
                <Text>{title}</Text>
                <Text>{price}</Text>
                <View>
                    <Text>Đặt ngay</Text>
                      <Arrow/>
                </View>
               
            </View>
            <FastImage source={url} style={[styles.image,this.props.styleImage]} />
            {/* <FastImage source={{uri: url}} style={[styles.image,this.props.styleImage]} /> */}
      </View>
    
    );
    return parallax ? (
      <ParallaxImage
        source={{uri: url}}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <FastImage source={{uri: url}} style={styles.image} />
    );
  }

  render() {
    const {
      data: {title, subtitle},
      even,
      index,
    } = this.props;
    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.slideInnerContainer, even && {marginRight: 0}]}
        onPress={() => this.props.onPressImage(index)}>
        {this.props.description && <View style={styles.shadow} />}
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}>
          {this.image}
          {/* <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} /> */}
        </View>
        {this.props.description && (
          <View
            style={[
              styles.textContainer,
              even ? styles.textContainerEven : {},
            ]}>
            {uppercaseTitle}
            <Text
              style={[styles.subtitle, even ? styles.subtitleEven : {}]}
              numberOfLines={2}>
              {subtitle}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
