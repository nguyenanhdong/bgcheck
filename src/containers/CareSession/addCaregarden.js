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
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const addCaregarden = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }

    const [showtime, Setshowtime] = useState(false);
    const [date, setDate] = useState(new Date());
    const SelectProduct = (index, value) => {
        setProduct(value);
    }
    const addCare = () => {
        showMessage({
            message: 'Thêm mới sổ theo dõi chăm sóc vườn thành công',
            duration: 3000,
            type: "success",
            icon: 'success'
        });
        props.navigation.goBack()
    }
    const handleConfirm = date => {
        setDate(date)
    }
    const dismiss = () => {
        Setshowtime(false)
    }
    return (
        <Container style={{ backgroundColor: '#fff' }}>
            <HeaderComp
                centerComponent={{
                    text: 'Thêm mới sổ theo dõi chăm sóc vườn',
                    style: {
                        color: 'white',
                    }
                }}
                goBack={onGoBack}
            />
            <Content>
                <Form >
                    <Item stackedLabel>
                        <Label>Ngày chăm sóc</Label>
                        <TouchableOpacity
                            onPress={() => Setshowtime(true)}
                            style={{flexDirection:'row',justifyContent:'space-between',width:deviceWidth - 15,paddingTop:15}}
                        >
                            <Text>{moment(date).format('DD-MM-YYYY')}</Text>
                            <Image
                                source={require('@assets/Images/Common/calendar.png')}
                                style={styles.icon_input}
                            />
                        </TouchableOpacity>
                    </Item>
                    <Item stackedLabel>
                        <Label>Người thực hiện</Label>
                        <Input style={styles.Input} />
                    </Item>

                    <Item stackedLabel>
                        <Label>Khu vực tác động</Label>
                        <Input style={styles.Input} />
                    </Item>
                    <Item stackedLabel>
                        <Label>Hoạt động</Label>
                        <Input style={styles.Input} />
                        {/* <Textarea rowSpan={5} bordered placeholder="Textarea" /> */}
                    </Item>
                    <Item stackedLabel>
                        <Label>Khối lượng</Label>
                        <Input style={styles.Input} />
                        {/* <Textarea rowSpan={5} bordered placeholder="Textarea" /> */}
                    </Item>
                    <Item stackedLabel>
                        <Label>Ghi chú</Label>
                        <Input style={styles.Input} />
                        {/* <Textarea rowSpan={5} bordered placeholder="Textarea" /> */}
                    </Item>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <TouchableRipple style={styles.view_phone}
                            onPress={addCare}
                        >
                            <Text style={styles.txt_login_phone}>Lưu </Text>
                        </TouchableRipple>
                    </View>

                </Form>
                <DateTimePickerModal
                    isVisible={showtime}
                    mode="date"
                    date={date}
                    onConfirm={handleConfirm}
                    onCancel={dismiss}
                    display={'spinner'}
                />
            </Content>

        </Container>
    )
}

export default addCaregarden;

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
    icon_input :{
        width:20,
        height:20,
        resizeMode:'contain'
    }
}
