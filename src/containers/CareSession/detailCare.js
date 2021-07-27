import React, { Component, useEffect, useState, useCallback,useRef } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList, Vibration } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest, SwipeRow } from '@assets/constants';
import { Container, Content, Button, ListItem, ScrollableTab, Tab, Tabs } from 'native-base';
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
  const addRow = (screen, data = null) => {
    props.navigation.navigate(screen, data)
  }
  
  let tab1 = useRef(null);
  let tab2 = useRef(null);
  let tab3 = useRef(null);
  let tab4 = useRef(null);
  const refreshTab = (tab)=>{
    switch(tab){
      case 1:
        tab1.current.getdata();
        return;
      case 2:
        tab2.current.getdata();
        return;
      case 3:
        tab3.current.getdata();
        return;
      case 4:
        tab4.current.getdata();
        return;
      default:
        return;
    }
}
  const { id } = props.navigation.state.params;
  return (
    <Container style={{ backgroundColor: '#fff' }}>
      <HeaderComp
        centerComponent={{
          text: 'Đợt chăm sóc cuối năm',
          style: {color: 'white'}
        }}
        goBack={onGoBack}
      />
      <Tabs renderTabBar={() => <ScrollableTab
        style={{ backgroundColor: '#CBCBCB' }}
      />}
        tabBarPosition='bottom'
      >
        <Tab heading="Thu hoạch"
          tabStyle={{ backgroundColor: colorDefault }}
          activeTabStyle={{ backgroundColor: colorDefault }}
         
        >
          <Harvest addRow={addRow} id={id} refreshTab={refreshTab}   ref = {tab1}/>
        </Tab>
        <Tab heading="Chăm sóc vườn"
          tabStyle={{ backgroundColor: colorDefault }}
          activeTabStyle={{ backgroundColor: colorDefault }}
        >
          <Caregarden addRow={addRow} id={id} refreshTab={refreshTab}  ref = {tab2}/>
        </Tab>
        <Tab heading="Thuốc BVTV"
          tabStyle={{ backgroundColor: colorDefault }}
          activeTabStyle={{ backgroundColor: colorDefault }}
        >
          <ProtectProduct addRow={addRow} id={id} refreshTab={refreshTab}  ref = {tab3}/>
        </Tab>
        <Tab heading="Phân bón"
          tabStyle={{ backgroundColor: colorDefault }}
          activeTabStyle={{ backgroundColor: colorDefault }}
        >
          <Fertilizer addRow={addRow} id={id} refreshTab={refreshTab} ref = {tab4}/>
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
