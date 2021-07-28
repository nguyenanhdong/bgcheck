import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList, Vibration, Alert } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest, SwipeRow, BASE_URL,showTime } from '@assets/constants';
import { Container, Content, Button, ListItem } from 'native-base';
import HeaderComp from '@components/HeaderComp';
import { TouchableRipple } from 'react-native-paper';
import { fontSize, scale } from '@assets/config/RatioScale';
import { NormalText, NormalFlashList } from '../../Theme';
import { showMessage } from 'react-native-flash-message';
import moment from 'moment';

const App = (props) => {
    const onGoBack = () => {
        props.navigation.goBack()
    }
    const userInfo = useSelector(state => state.app.userInfo);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getdata();
        props.navigation.addListener('willFocus', () => {
            console.log('voa day')
            getdata();
        });
    }, []);
    const getdata = () => {
        // if (loading) return;
        console.log('get data');
        setLoading(true);
        axios.get(`${BASE_URL}API/GetListDotChamSoc?dep=${userInfo?.DepartmentId}&pageIndex=1&pageSize=40`, {}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-localization': 'vi'
            },
        })
            .then((response) => {
                console.log('response product', response);
                if (response.status == 200) {
                    setData(response.data)
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
    const _Draw = () => {
        console.log('_Draw', props.navigation)
        props.navigation.toggleDrawer()
    }
    const goDetail = (item) => {
        console.log('21123', item)
        props.navigation.navigate('DetailCare', { item})
    }
    const addCareSession = () => {
        console.log('123')
        props.navigation.navigate('AddCare')
    }
    const editItem = item => {
        props.navigation.navigate('AddCare', { item })
    }
    const actionDelete = item => {
        if(loading) return;
        setLoading(true);
        axios.post(`${BASE_URL}API/DeleteDotChamSoc`, {Id:item.Id}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-localization': 'vi'
            },
        })
            .then((response) => {
                console.log('response product', response);
                if (response.status == 200) {
                    showMessage({
                        message: 'Xoá nhật ký thành công',
                        duration: 3000,
                        type: "success",
                        icon: 'success'
                      });
                      getdata();
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
    const deleteItem = item => {
        Alert.alert(
            `Bạn có thật sự muốn xoá nhật ký : ${item.Ten}`,
            '',
            [
                {
                    text: 'Huỷ',
                    onPress: console.log('Huy'),
                    style:'cancel'
                },
                {
                    text: 'Đồng ý',
                    onPress: ()=>actionDelete(item),
                },
            ]
        )
    }
    const renderItem = ({ item }) => {
        return (
            <ListItem style={styles.listcontent} noIndent
                onPress={() => goDetail(item)}
            >
                <Text>Tên đợt: {item.Ten}</Text>
                <Text>Ngày tạo: {showTime(item.NgayTao)}</Text>
                <Text>Tên sp: {item.TenSanPham}</Text>
                <Text>Mã số hộ: {item.MaSoHoTrong}</Text>
                <Text>Mô tả: {item.MoTa}</Text>
                <View style={styles.boxAction}>
                    <TouchableRipple style={styles.touch}
                        onPress={() => deleteItem(item)}
                    >
                        <Image source={require('@assets/Images/Common/trash_black.png')} style={styles.iconAction} />

                    </TouchableRipple>
                    <TouchableRipple style={styles.touchEdit}
                        onPress={() => editItem(item)}
                    >
                        <Image source={require('@assets/Images/Common/edit.png')} style={styles.iconAction} />
                    </TouchableRipple>
                </View>
            </ListItem>
        )
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
                    text: 'Nhật ký',
                    style: {
                        color: 'white',
                    }
                }}
                showDraw={_Draw}
                rightComponent={<TouchableRipple
                    onPress={addCareSession}
                    style={{ paddingVertical: 10 }}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('@assets/Images/Common/add.png')} style={{ width: scale(15), height: scale(15), resizeMode: 'contain' }} />
                        <Text style={{ fontSize: fontSize(12), color: "#fff", fontWeight: "bold" }}>Thêm đợt</Text>
                    </View>

                </TouchableRipple>}
            />
            {/* <FlatList
            data = {data}
            renderItem = {renderItem}
            onRefresh = {getdata}
            refreshing = {true}
           /> */}
            <NormalFlashList
                refreshControlProps={{
                    refreshing: false,
                    onRefresh: getdata
                }}
                emptyViewProps={{
                    bigTitle: 'Nhật ký rỗng',
                    bigTitleStyle: {
                        color: 'black',
                        fontSize: 14
                    }
                }}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                // onEndReachedThreshold={0}
                // onEndReached={debounce(loadmore, 500)}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: 15 }}
            />
        </Container>
    )
}

export default App;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    touch: { width: 40, justifyContent: 'center', alignItems: 'center', height: 40 },
    touchEdit: { width: 40, justifyContent: 'center', alignItems: 'center', height: 40, marginTop: 20 },
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
    boxAction:{ position: 'absolute', right: 15, alignItems: 'center', justifyContent: 'center', top: 10 },
    iconAction:{ width: scale(20), height: scale(20), resizeMode: 'contain' },
    listcontent: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#fff',marginTop:1 },
}
