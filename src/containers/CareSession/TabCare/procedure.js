import React, { Component, useEffect, useState, useCallback ,useImperativeHandle,forwardRef} from "react";
import { View, Image, ScrollView, ActivityIndicator,Alert } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest,SwipeRow,BASE_URL,showTime } from '@assets/constants';
import { Container, Content,Button,ListItem } from 'native-base';
import HeaderComp from '@components/HeaderComp';
import { TouchableRipple } from 'react-native-paper';
import { fontSize, scale } from '@assets/config/RatioScale';
import { NormalText ,NormalFlashList} from '../../../Theme';
import { showMessage } from 'react-native-flash-message'
const App = forwardRef((props,ref) => {
    const userInfo = useSelector(state => state.app.userInfo);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getdata();
        // props.navigation.addListener('willFocus', () => {
        //     getdata();
        // });
    }, []);
    useImperativeHandle(
        ref,
        () => ({
            getdata
        }),
    )
    const getdata = ()=>{
        if(loading) return;
        setLoading(true);
        console.log('url', `${BASE_URL}API/GetQuyTrinhById?id=${props.id}&dep=${userInfo?.DepartmentId}`);
        axios.get(`${BASE_URL}API/GetQuyTrinhById?id=${props.id}&dep=${userInfo?.DepartmentId}`, {}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-localization': 'vi'
            },
        })
            .then((response) => {
                console.log('response GetPhanBonById', response, `${BASE_URL}API/GetQuyTrinhById?id=${props.id}&dep=${userInfo?.DepartmentId}`);
                if (response.status == 200) {
                    setData(response.data)
                } else
                    showMessage({
                        message: 'C?? l???i x???y ra. Vui l??ng th??? l???i sau ??t ph??t!',
                        duration: 3000,
                        type: "danger",
                        icon: 'danger'
                    });
            })
            .catch(function (error) {
                console.log('error', error)
                showMessage({
                    message: 'C?? l???i x???y ra. Vui l??ng t???t tho??t app v?? th??? l???i !',
                    duration: 3000,
                    type: "danger",
                    icon: 'danger'
                });
            })
            .finally(function () {
                setLoading(false);
            });
    }
    const goDetail = ()=>{
        console.log('1231')
    }
    const addRow = () => {
        props.addRow('AddProcedure',{DotChamSoc_Id:props.id,refreshTab:props.refreshTab});
    }

    const actionDelete = item => {
        if(loading) return;
        setLoading(true);
        axios.post(`${BASE_URL}API/DeleteQuyTrinh`, {Id:item.Id}, {
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
                        message: 'Xo?? quy tr??nh th??nh c??ng',
                        duration: 3000,
                        type: "success",
                        icon: 'success'
                      });
                      getdata();
                } else
                    showMessage({
                        message: 'C?? l???i x???y ra. Vui l??ng th??? l???i sau ??t ph??t!',
                        duration: 3000,
                        type: "danger",
                        icon: 'danger'
                    });
            })
            .catch(function (error) {
                console.log('error', error)
                showMessage({
                    message: 'C?? l???i x???y ra. Vui l??ng t???t tho??t app v?? th??? l???i !',
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
            `B???n c?? th???t s??? mu???n xo?? ?????t ph??n b??n n??y`,
            '',
            [
                {
                    text: 'Hu???',
                    onPress: console.log('Huy'),
                    style:'cancel'
                },
                {
                    text: '?????ng ??',
                    onPress: ()=>actionDelete(item),
                },
            ]
        )
    }
    const renderItem = ({item}) =>{
        return(
            <ListItem style={styles.listcontent} noIndent
            onPress = {goDetail}
            >
                <Text>Ng??y: {showTime(item.Ngay)}</Text>
                <Text>N???i dung: {item.NoiDung}</Text>
                <View style={styles.boxAction}>
                    <TouchableRipple style={styles.touch}
                        onPress={() => deleteItem(item)}
                    >
                        <Image source={require('@assets/Images/Common/trash_black.png')} style={styles.iconAction} />

                    </TouchableRipple>
                    {/* <TouchableRipple style={styles.touchEdit}
                        onPress={() => editItem(item)}
                    >
                        <Image source={require('@assets/Images/Common/edit.png')} style={styles.iconAction} />
                    </TouchableRipple> */}
                </View>
            </ListItem>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            {loading &&
                <View style={styles.css_loading}>
                    <ActivityIndicator animating size="large" color={'#fff'} />
                </View>
            }
            <NormalFlashList
                refreshControlProps={{
                    refreshing: false,
                    onRefresh: getdata
                }}
                emptyViewProps={{
                    bigTitle: 'Danh s??ch quy tr??nh r???ng',
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
            <Button
                style={styles.touchAdd}
                onPress={addRow}
            >
                <Image source={require('@assets/Images/Common/add.png')} style={styles.IconAdd} />
            </Button>
        </View>
    )
})

export default App;

const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    touchAdd: { position: 'absolute', bottom: 50, width: 60, height: 60, backgroundColor: colorDefault, right: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 30 },
    IconAdd: { width: scale(25), height: scale(25), resizeMode: 'contain' },
    touch: { width: 30, justifyContent: 'center', alignItems: 'center', height: 30 },
    touchEdit: { width: 30, justifyContent: 'center', alignItems: 'center', height: 30, marginTop: 10 },
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
