import React from 'react';
import {TouchableOpacity} from 'react-native';

export default class TouchableOpacitys extends React.Component{
    render(){
        return (<TouchableOpacity activeOpacity = {this.props.activeOpacity?this.props.activeOpacity:0.9 }{...this.props} >{this.props.children}</TouchableOpacity>)
    }
}