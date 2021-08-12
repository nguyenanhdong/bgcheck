import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList, Vibration, Keyboard, Alert } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest, SwipeRow, BASE_URL } from '@assets/constants';
import { Container, Content, Button, ListItem, Form, Item, Input, Label, Textarea } from 'native-base';
import HeaderComp from '@components/HeaderComp';
import { TouchableRipple } from 'react-native-paper';
import { fontSize, scale } from '@assets/config/RatioScale';
import ModalDropdown from '@components/ModalDropDown';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import Modal from 'react-native-modalbox';

const addHarvest = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const userInfo = useSelector(state => state.app.userInfo);
    const [showtime, Setshowtime] = useState(false);
    const [date, setDate] = useState(new Date());
    const [MaTruyXuat, setMaTruyXuat] = useState('');
    const [vatchua, setVatchua] = useState('');
    const [khoiluong, setKhoiluong] = useState('');
    const [Note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const DotChamSoc_Id = props.navigation?.state?.params?.DotChamSoc_Id || 0;
    const validate = () => {
        if (!MaTruyXuat || !khoiluong) {
            Alert.alert('Bạn cần điền đẩy đủ thông tin các trường có dấu *');
            return false
        }
        return true
    }
    const addCare = () => {
        if (!validate()) return
        Keyboard.dismiss();
        if (loading) return;

        setLoading(true);
        let dataInput = {
            model: {
                CompanyId: userInfo?.DepartmentId,
                NguoiTao: userInfo.Id,
                Id: 0,
                DotChamSoc_Id: DotChamSoc_Id,
                MaTruyXuat: MaTruyXuat,
                VatChuaSo: vatchua,
                KhoiLuong: khoiluong,
                GhiChu: Note,
                NgayThuHoach: moment(date).format('DD/MM/YYYY')
            },
            token:userInfo.Token
        }
        console.log('dataInput CreateThuHoach',dataInput)
        axios.post(`${BASE_URL}API/CreateThuHoach`, dataInput, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log('response CreateThuHoach', response);
                if (response.status == 200 && response.data) {
                    // setData(response.data);
                    showMessage({
                        message: 'Thêm đợt thu hoạch thành công',
                        duration: 3000,
                        type: "success",
                        icon: 'success'
                    });
                    props.navigation.state.params.refreshTab(1);
                    props.navigation.goBack()
                } else
                    showMessage({
                        message: 'Có lỗi xảy ra. Vui lòng thử lại sau ít phút!',
                        duration: 3000,
                        type: "danger",
                        icon: 'danger'
                    });
            })
            .catch(function (error) {
                console.log('error', error)
                showMessage({
                    message: 'Có lỗi xảy ra. Vui lòng tắt thoát app và thử lại !',
                    duration: 3000,
                    type: "danger",
                    icon: 'danger'
                });
            })
            .finally(function () {
                setLoading(false);
            });
    }
    const handleConfirm = date => {
        setDate(date);
        console.log('handleConfirm')
    }
    const dismiss = () => {
        Setshowtime(false)
    }
    const showModalTime = () => {
        console.log('showTime');
        Setshowtime(true);
    }
    return (
        <Container style={{ backgroundColor: '#fff' }}>
            {loading &&
                <View style={styles.css_loading}>
                    <ActivityIndicator animating size="large" color={'#fff'} />
                </View>
            }
            <HeaderComp
                centerComponent={{
                    text: 'Thêm mới sổ theo dõi thu hoạch',
                    style: {
                        color: 'white',
                    }
                }}
                goBack={onGoBack}
            />
            <Content>
                <Form >
                    <Item stackedLabel>
                        <Label style={{fontWeight:'bold'}}>Ngày thu hoạch<Text style={{ color: 'red' }}>*</Text></Label>
                        <TouchableOpacity
                            onPress={showModalTime}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', width: deviceWidth - 25, paddingTop: 15 }}
                        >
                            <Text style={styles.Input}>{moment(date).format('DD-MM-YYYY')}</Text>
                            <Image
                                source={require('@assets/Images/Common/calendar.png')}
                                style={styles.icon_input}
                            />
                        </TouchableOpacity>
                    </Item>
                    <Item stackedLabel>
                        <Label style={{fontWeight:'bold'}}>Mã truy xuất<Text style={{ color: 'red' }}>*</Text></Label>
                        <Input style={styles.Input} onChangeText={setMaTruyXuat} value={MaTruyXuat} />
                    </Item>

                    <Item stackedLabel>
                        <Label style={{fontWeight:'bold'}}>Vật chứa số</Label>
                        <Input style={styles.Input} onChangeText={setVatchua} value={vatchua} />
                    </Item>
                    <Item stackedLabel>
                        <Label style={{fontWeight:'bold'}}>Khối lượng<Text style={{ color: 'red' }}>*</Text></Label>
                        <Input style={styles.Input} onChangeText={setKhoiluong} value={khoiluong} />
                        {/* <Textarea rowSpan={5} bordered placeholder="Textarea" /> */}
                    </Item>
                    <Item stackedLabel>
                        <Label style={{fontWeight:'bold'}}>Ghi chú</Label>
                        <Input style={styles.Input} onChangeText={setNote} value={Note} />
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
                {/* <DateTimePickerModal
                    isVisible={showtime}
                    mode="date"
                    date={date}
                    onConfirm={handleConfirm}
                    onCancel={dismiss}
                    display={'spinner'}
                /> */}


            </Content>
            <Modal
                style={{ width: '90%', height: 320, borderRadius: 10, paddingVertical: 20, justifyContent: 'center', alignItems: 'center' }}
                swipeToClose={false}
                onClosed={dismiss}
                backdropPressToClose={false}
                // onOpened={this.onOpen}
                backButtonClose={false}
                position={"center"}
                isOpen={showtime}
            >
                {/* <Text style={[styles.text, { fontSize: 20 }]}>{this.state.type == 'start' ? 'Ngày cấp thẻ cư trú' : 'Ngày hết hạn thẻ cư trú'}</Text> */}
                <DatePicker
                    locale={'vi'}
                    date={date}
                    mode={'date'}
                    onDateChange={handleConfirm}
                />
                <TouchableOpacity style={{ width: 100, height: 40, borderRadius: 10, backgroundColor: colorDefault, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                    onPress={dismiss}
                >
                    <Text style={{ color: '#fff' }}>Xong</Text>
                </TouchableOpacity>
            </Modal>
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
export default addHarvest;

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
        fontSize: 15, color: '#515C6F'
    },
    view_phone: { flexDirection: 'row', alignItems: 'center', backgroundColor: colorDefault, borderRadius: 5, justifyContent: 'center', height: 50, width: 200, marginTop: 20 },
    txt_login_phone: { color: '#fff', fontWeight: '700' },
    icon_input: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    css_loading: {
        position: 'absolute',
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },

}
