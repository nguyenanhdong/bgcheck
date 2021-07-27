import React, { Component} from "react";
import { View, ActivityIndicator } from 'react-native';
import { colorDefault} from '@assets/constants';


class Load extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            load:false
        }
      }
    showload = ()=>{
        this.setState({load:true})
    }
     hideload = ()=>{
        this.setState({load:false})
    }
    render(){
    if(this.state.load)
        return (
            <View style={styles.css_loading}>
                        <ActivityIndicator animating size="large" color={'#fff'} />
                    </View>
        )
    return null;
    }
}

export default Load;

const styles = {
    css_loading: {
        position: 'absolute',
        zIndex: 2,
        // backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        // opacity: 0.3,
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)'
    }
   
}