import React from 'react';
import {SafeAreaView,View,Platform, StatusBar} from 'react-native';
import TitleScreen from '@components/TitleScreen';

export default class SafeAreaViewTemplate extends React.Component{
    
    render(){
        let showTitle = typeof this.props.title != 'undefined' ? true : false;
        let style = typeof this.props.styleStatusBar != 'undefined' ? this.props.styleStatusBar : {}
        return(
            <View style={styles.container}>
                <SafeAreaView style={[styles.safearea_bg,style]} />
                <SafeAreaView style={styles.safearea_content}>
                {showTitle && <TitleScreen
                    title={this.props.title}
                    backButton={this.props.backButton}
                    goBack={this.props.goBack}
                    {...this.props}
                />}
                {this.props.children}
                </SafeAreaView>
            </View>
        )
    }
}
const styles = {
    container: {
        flex:1,
        // backgroundColor:'rgb(247,247,247)'
    },
    safearea_bg:{
        // borderBottomWidth: 1,
        borderColor: '#fff',
        // flex: 0, 
        // backgroundColor: 'transparent',
        // backgroundColor: 'transparent',
        backgroundColor: '#fff',
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        // paddingTop: Platform.OS === "android" ? 25 : 0,
        height:Platform.OS === "android" ? StatusBar.currentHeight : 25
    },
    safearea_content:{
        flex: 1, 
        backgroundColor: '#F2F2F2'
    }
}