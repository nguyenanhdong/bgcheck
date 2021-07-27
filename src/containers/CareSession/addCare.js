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

const App = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const [nameCare, setNameCare] = useState('');
    const [idCare, setIdCare] = useState('');
    const [des, setDes] = useState('');
    const [productText, setProduct] = useState('Chọn sản phẩm');

    const userInfo = useSelector(state => state.app.userInfo);
    const [data, setData] = useState([]);
    const [dataDisplay, setDataDislay] = useState([]);
    const [loading, setLoading] = useState(false);
    const [product, setProductSelect] = useState(null);
    const SelectProduct = (index, value) => {
        setProductSelect(data[index])
        setProduct(value);
    }
    const item = props.navigation?.state?.params?.item || null;
    useEffect(() => {
        getdata();
        if (item) {
            setNameCare(item.TenSanPham);
            setIdCare(item.MaSoHoTrong);
            setDes(item.MoTa)
            setProduct(item.TenSanPham);
        }
    }, []);
    const getdata = () => {
        if (loading) return;
        setLoading(true);
        axios.get(`${BASE_URL}API/GetlistProducts?companyId=${userInfo?.DepartmentId}`, {}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-localization': 'vi'
            },
        })
            .then((response) => {
                console.log('response GetPhanBonById', response);
                if (response.status == 200) {
                    setData(response.data);
                    let display = response.data.map(item => {
                        return item.Ten;
                    });
                    console.log('display', display)
                    setDataDislay(display);
                    if (item) {
                        let _product = null;
                        response.data.map(product => {
                            if (product.Id == item.SanPhamId)
                                _product = product;
                        });
                        console.log('_product', _product)
                        setProductSelect(_product)
                    }
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
    const validate = () => {
        console.log('validate', product, nameCare, idCare, des)
        if (!nameCare || !idCare || !des || !product) {
            Alert.alert('Bạn cần điền đẩy đủ thông tin các tường');
            return false
        }
        return true
    }
    const editCare = (dataInput)=>{
        console.log('dataInput dataInput',dataInput);
        axios.post(`${BASE_URL}Api/UpdateDotChamSoc`, dataInput, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-localization': 'vi'
            },
        })
            .then((response) => {
                console.log('response CreateDotChamSoc', response);
                if (response.status == 200 && response.data) {
                    // setData(response.data);
                    showMessage({
                        message: 'Chỉnh sửa đợt chăm sóc thành công',
                        duration: 3000,
                        type: "success",
                        icon: 'success'
                      });
                    // props.navigation.goBack()
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
    const addCare = () => {
        
        if (!validate()) return
        Keyboard.dismiss();
        if (loading) return;
        
        setLoading(true);
        let dataInput = {
            CompanyId: userInfo?.DepartmentId,
            Ten: nameCare,
            MaSoHoTrong: idCare,
            SanPhamId: product.Id,
            MoTa: des,
            NguoiTao: userInfo.Id,
            Id: item?.Id || 0
        }
        if(item){
            editCare(dataInput);
            return;
        }
        console.log('dataInput', dataInput);
        console.log('url',`${BASE_URL}API/Createdotchamsoc`);
        axios.post(`${BASE_URL}API/Createdotchamsoc`, dataInput, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log('response CreateDotChamSoc', response);
                if (response.status == 200 && response.data) {
                    // setData(response.data);
                    showMessage({
                        message: 'Thêm đợt chăm sóc thành công',
                        duration: 3000,
                        type: "success",
                        icon: 'success'
                      });
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
    return (
        <Container style={{ backgroundColor: '#fff' }}>
            {loading &&
                <View style={styles.css_loading}>
                    <ActivityIndicator animating size="large" color={'#fff'} />
                </View>
            }
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
                        <Input style={styles.Input} onChangeText={setNameCare} value={nameCare} />
                    </Item>
                    <Item stackedLabel bordered >
                        {/* <Label stackedLabel style={styles.textlabel}>Giới tính</Label> */}
                        <Label stackedLabel>Sản phẩm</Label>
                        <ModalDropdown
                            options={dataDisplay}
                            dropdownStyle={styles.dropdown}
                            dropdownTextStyle={{ fontSize: 15, color: '#515C6F', paddingLeft: 15 }}
                            dropdownTextHighlightStyle={{ color: colorDefault }}
                            onSelect={(index, value) => SelectProduct(index, value)}
                            renderSeparator={() => <View />}
                        >
                            <View style={styles.box_select}>
                                <Text style={[styles.text_selected]}>{productText}</Text>
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
                        <Input style={styles.Input} onChangeText={setIdCare} value={idCare} />
                    </Item>
                    <Item stackedLabel>
                        <Label>Mô tả</Label>
                        <Input style={styles.Input} onChangeText={setDes} value={des} />
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

            </Content>

        </Container>
    )
}

export default App;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    dropdown: {
        width: deviceWidth, height: 260, overflow: 'hidden', borderBottomLeftRadius: 5, borderBottomRightRadius: 5,
        marginTop: isAndroid ? -25 : 0
    },
    text_selected: {
        // color: '#6a6a6d',
        fontSize: 15
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
        paddingRight:15

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
