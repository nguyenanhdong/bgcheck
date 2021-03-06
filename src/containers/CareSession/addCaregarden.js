import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ActivityIndicator, Alert, Keyboard } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest, SwipeRow, BASE_URL } from '@assets/constants';
import { Container, Content, Button, ListItem, Form, Item, Input, Label, Textarea } from 'native-base';
import HeaderComp from '@components/HeaderComp';
import { TouchableRipple } from 'react-native-paper';
import { fontSize, scale } from '@assets/config/RatioScale';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from 'react-native-modalbox';
import DatePicker from 'react-native-date-picker'

const addCaregarden = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector(state => state.app.userInfo);
    const [showtime, Setshowtime] = useState(false);
    const [date, setDate] = useState(new Date());
    const [Nguoithuchien, setNguoithuchien] = useState('');
    const [khuvuc, setKhuvuc] = useState('');
    const [hoatdong, setHoatdong] = useState('');
    const [ghichu, setGhichu] = useState('');
    const DotChamSoc_Id = props.navigation?.state?.params?.DotChamSoc_Id || 0;

    const validate = () => {
        if (!Nguoithuchien) {
            Alert.alert('Bạn cần điền đẩy đủ thông tin các tường có dấu *');
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
                GhiChu: ghichu,
                NgayChamSoc: moment(date).format('DD/MM/YYYY'),
                HoatDong: hoatdong,
                KhuVucTacDong: khuvuc,
                NguoiThucHien: Nguoithuchien
            },
            token: userInfo.Token
        }
        console.log('dataInput', dataInput);
        axios.post(`${BASE_URL}API/CreateChamSocVuon`, dataInput, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log('response CreateChamSocVuon', response);
                if (response.status == 200 && response.data) {
                    // setData(response.data);
                    showMessage({
                        message: 'Thêm mới sổ theo dõi chăm sóc vườn thành công',
                        duration: 3000,
                        type: "success",
                        icon: 'success'
                    });
                    props.navigation.state.params.refreshTab(2);
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
                        <Label style={{fontWeight:'bold'}}>Ngày chăm sóc<Text style={{ color: 'red' }}>*</Text></Label>
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
                        <Label style={{fontWeight:'bold'}}>Người thực hiện<Text style={{ color: 'red' }}>*</Text></Label>
                        <Input style={styles.Input} onChangeText={setNguoithuchien} value={Nguoithuchien} />
                    </Item>

                    <Item stackedLabel>
                        <Label style={{fontWeight:'bold'}}>Khu vực tác động</Label>
                        <Input style={styles.Input} onChangeText={setKhuvuc} value={khuvuc} />
                    </Item>
                    <Item stackedLabel>
                        <Label style={{fontWeight:'bold'}}>Hoạt động</Label>
                        <Input style={styles.Input} onChangeText={setHoatdong} value={hoatdong} />
                        {/* <Textarea rowSpan={5} bordered placeholder="Textarea" /> */}
                    </Item>
                    <Item stackedLabel>
                        <Label style={{fontWeight:'bold'}}>Ghi chú</Label>
                        <Input style={styles.Input} onChangeText={setGhichu} value={ghichu} />
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
