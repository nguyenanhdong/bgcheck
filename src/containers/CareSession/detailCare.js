import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList,Vibration } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest,SwipeRow } from '@assets/constants';
import { Container, Content,Button,ListItem,ScrollableTab ,Tab,Tabs} from 'native-base';
import HeaderComp from '@components/HeaderComp';
import { TouchableRipple } from 'react-native-paper';
import { fontSize, scale } from '@assets/config/RatioScale';
import Harvest from './TabCare/harvest';
import Caregarden from './TabCare/caregarden';
import ProtectProduct from './TabCare/protectProduct';
import Fertilizer from './TabCare/fertilizer';

const DetailCare = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const _Draw = () => {
        console.log('_Draw',props.navigation)
        props.navigation.toggleDrawer()
      }
    const addRow = (screen)=>{
      console.log('screen',screen)
      props.navigation.navigate(screen)
    }

    return (
        <Container style={{backgroundColor:'#fff'}}>
            <HeaderComp
                centerComponent={{
                    text: 'Đợt chăm sóc cuối năm',
                    style: {
                        color: 'white',
                    }
                }}
                goBack={onGoBack}
                // rightComponent={<TouchableRipple
                //     onPress={addCareSession}
                //    style={{padding:10}}
                // >
                //     <View  style={{ justifyContent: 'center', alignItems: 'center' }}>
                //         <Image source={require('@assets/Images/Common/add.png')} style={{ width: scale(15), height: scale(15), resizeMode: 'contain' }} />
                //         <Text style={{ fontSize: fontSize(12), color: "#fff", fontWeight: "bold"}}>Thêm đợt</Text>
                //         </View>

                // </TouchableRipple>}
            />
            <Tabs renderTabBar={()=> <ScrollableTab 
               style={{ backgroundColor: '#CBCBCB' }}
            />}
              tabBarPosition = 'bottom'
            >
          <Tab heading="Thu hoạch"
            tabStyle={{ backgroundColor: colorDefault }}
            activeTabStyle={{ backgroundColor: colorDefault }}
          >
            <Harvest addRow = {addRow}/>
          </Tab>
          <Tab heading="Chăm sóc vườn"
          tabStyle={{ backgroundColor: colorDefault }}
          activeTabStyle={{ backgroundColor: colorDefault }}
          >
            <Caregarden addRow = {addRow}/>
          </Tab>
          <Tab heading="Thuốc BVTV"
          tabStyle={{ backgroundColor: colorDefault }}
          activeTabStyle={{ backgroundColor: colorDefault }}
          >
            <ProtectProduct addRow = {addRow}/>
          </Tab>
          <Tab heading="Phân bón"
            tabStyle={{ backgroundColor: colorDefault }}
            activeTabStyle={{ backgroundColor: colorDefault }}
          >
            <Fertilizer addRow = {addRow}/>
          </Tab>
          
        </Tabs>
               
        </Container>
    )
}

export default DetailCare;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
   
}
