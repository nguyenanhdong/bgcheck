import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList, Vibration } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest, SwipeRow } from '@assets/constants';
import { Container, Content, Button, ListItem, Form, Item, Input, Label, Textarea } from 'native-base';
import HeaderComp from '@components/HeaderComp';
import { TouchableRipple } from 'react-native-paper';
import { fontSize, scale } from '@assets/config/RatioScale';
import ModalDropdown from '@components/ModalDropDown';
import { showMessage } from 'react-native-flash-message';

const App = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const [nameCare, setNameCare] = useState('');
    const [idCare, setIdCare] = useState('');
    const [des, setDes] = useState('');
    const [product, setProduct] = useState('Chọn sản phẩm');
    const SelectProduct = (index, value) => {
        setProduct(value);
    }
    const addCare = ()=>{
        showMessage({
            message: 'Thêm đợt chăm sóc thành công',
            duration: 3000,
            type: "success",
            icon: 'success'
          });
        props.navigation.goBack()
    }
    return (
        <Container style={{ backgroundColor: '#fff' }}>
            <HeaderComp
                centerComponent={{
                    text: 'Thêm đợt chăm sóc',
                    style: {
                        color: 'white',
                    }
                }}
                goBack={onGoBack}
            />
            <Content>
                <Form >
                    <Item stackedLabel>
                        <Label>Tên đợt chăm sóc</Label>
                        <Input style={styles.Input} />
                    </Item>
                    <Item stackedLabel bordered >
                        {/* <Label stackedLabel style={styles.textlabel}>Giới tính</Label> */}
                        <Label stackedLabel>Sản phẩm</Label>
                        <ModalDropdown
                            options={arrProduct}
                            dropdownStyle={styles.dropdown}
                            dropdownTextStyle={{ fontSize: fontSize(15), color: '#515C6F', paddingLeft: 15 }}
                            dropdownTextHighlightStyle={{ color: colorDefault }}
                            onSelect={(index, value) => SelectProduct(index, value)}
                            renderSeparator={() => <View />}
                        >
                            <View style={styles.box_select}>
                                <Text style={[styles.text_selected]}>{product}</Text>
                                <Image
                                    source={require('@assets/Images/Common/icon-arrow-select.png')}
                                    style={{ width: 15, height: 15, marginLeft: 3, resizeMode: 'contain' }}
                                    resizeMode={'contain'}
                                />
                            </View>
                        </ModalDropdown>
                        {/* <Text style={{ color: 'red' }}>{this.state.errorRequest?.gender}</Text> */}
                    </Item>
                    <Item stackedLabel>
                        <Label>Mã số hộ trồng</Label>
                        <Input style={styles.Input} />
                    </Item>
                    <Item stackedLabel>
                        <Label>Mô tả</Label>
                        <Input style={styles.Input} />
                        {/* <Textarea rowSpan={5} bordered placeholder="Textarea" /> */}
                    </Item>
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:20}}>
                    <TouchableRipple style={styles.view_phone}
                        onPress={addCare}
                    >
                        <Text style={styles.txt_login_phone}>Lưu </Text>
                    </TouchableRipple>
                    </View>
                   
                </Form>

            </Content>

        </Container>
    )
}

const arrProduct = [
    'Bưởi da xanh',
    'Thanh long miền nam',
    'Bưởi diễn',
    'Súp lơ',
    'Cà chua bi',
    'VÀI LỤC NGẠN',
]
export default App;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    dropdown: {
        width: deviceWidth, height: 160, overflow: 'hidden', borderBottomLeftRadius: 5, borderBottomRightRadius: 5,
        marginTop: isAndroid ? -25 : 0
    },
    text_selected: {
        // color: '#6a6a6d',
        // fontSize:15
    },
    box_select: {
        // borderBottomWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 7,
        paddingHorizontal: 10,
        height: 40,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        width: deviceWidth,

        // backgroundColor: "#F0F2F8"
    },
    row: {
        width: '100%',
        marginBottom: 10,
    },
    Input: {
        fontSize: fontSize(15), color: '#515C6F'
    },
    view_phone: { flexDirection: 'row', alignItems: 'center', backgroundColor: colorDefault, borderRadius: 5, justifyContent: 'center', height: 50, width: 200, marginTop: 20 },
    txt_login_phone: { color: '#fff', fontWeight: '700' },

}
