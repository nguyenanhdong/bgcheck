import React from 'react';
import { Text } from 'react-native';
import { verticalScale, scale, fontSize } from '@assets/config/RatioScale';
export default class Texts extends React.Component {
        render() {
                const { style, numberOfLines } = this.props;
                return (<Text numberOfLines={numberOfLines}  {...this.props} style={[{ fontSize: fontSize(15), color: '#515C6F' }, style]}>{this.props.children}</Text>)
        }
}