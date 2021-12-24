import React, { Component, useEffect, useState, useCallback } from "react";
import { View, Image, ScrollView, ActivityIndicator, FlatList, Vibration } from 'react-native';
import Text from '@components/Text';
import TouchableOpacity from '@components/TouchableOpacity';
import SafeAreaView from '@components/SafeAreaView';
import axios from 'axios';
import FastImage from 'react-native-fast-image';
import { useSelector, useDispatch } from "react-redux";
import { colorDefault, deviceWidth, deviceHeight, isAndroid, urlAPI, headersRequest, showTime } from '@assets/constants';
import { Container, Content, ListItem } from 'native-base';
import { RadioButton } from 'react-native-paper';
import { TouchableRipple } from 'react-native-paper';

const App = (props) => {
    const { productInfo } = props;
    const [checked, setChecked] = React.useState('thuhoach');
    const [data, setData] = React.useState(productInfo?.SoTheoDoiThuHoach || []);
    const ItemThuhoach = ({ item }) => {
        return (
            <ListItem style={styles.listcontent} noIndent>
                <Text>Ngày thu hoạch: {showTime(item.NgayTao)}</Text>
                <Text>Khối lượng: {item.KhoiLuong} kg</Text>
                <Text>Người thu hoạch: {item.TenNguoiTao}</Text>
                <Text>Vật chứa số: {item.VatChuaSo}</Text>
                <Text>Ghi chú: {item.GhiChu}</Text>
            </ListItem>
        )
    }
    const ItemVuon = ({ item }) => {
        return (
            <ListItem style={styles.listcontent} noIndent>
                <Text>Ngày chăm sóc: {showTime(item.NgayChamSoc)}</Text>
                <Text>Người thực hiện: {item.NguoiThucHien}</Text>
                <Text>Hoạt động: {item.HoatDong}</Text>
                <Text>Ghi chú: {item.GhiChu}</Text>
                <Text>Khu vực tác động: {item.KhuVucTacDong}</Text>
            </ListItem>
        )
    }
    const ItemThuocBVTV = ({ item }) => {
        return (
            <ListItem style={styles.listcontent} noIndent>
                <Text>Ngày dùng: {showTime(item.NgayDung)}</Text>
                <Text>Người dùng: {item.NguoiDung}</Text>
                <Text>Mục đích: {item.MucDich}</Text>
                <Text>Phương thức: {item.PhuongThuc}</Text>
                <Text>Tên thương phẩm và hoạt chất chính: {item.ThuongPhamHoatChat}</Text>
                <Text>Lượng thuốc sử dụng: {item.LuongThuocSuDung}</Text>
                <Text>Bình phun/ Máy phun: {item.BinhPhunMayPhun == 1 ? 'Bình phun' : 'Máy phun'}</Text>
                <Text>Chu kỳ: {item.ChuKy}</Text>
            </ListItem>
        )
    }
    const ItemPhanBon = ({ item }) => {
        return (
            <ListItem style={styles.listcontent} noIndent>
                <Text>Ngày bón: {showTime(item.NgayBon)}</Text>
                <Text>Người bón: {item.NguoiBon}</Text>
                <Text>Phương thức bón: {item.PhuongThucBon}</Text>
                <Text>Tên thương phẩm: {item.ThuongPhamPhanBon}</Text>
                <Text>Lượng phân sử dụng: {item.LuongPhanSuDung}</Text>
            </ListItem>
        )
    }

    const ItemQuyTrinh = ({ item }) => {
        return (
            <ListItem style={styles.listcontent} noIndent>
                <Text>Ngày: {showTime(item.Ngay)}</Text>
                <Text>Nội dung: {item.NoiDung}</Text>
            </ListItem>
        )
    }

    const Item = ({ item }) => {
        switch (checked) {
            case 'thuhoach':
                return <ItemThuhoach item={item} />;
            case 'vuon':
                return <ItemVuon item={item} />;
            case 'thuocBVTV':
                return <ItemThuocBVTV item={item} />;
            case 'phanbon':
                return <ItemPhanBon item={item} />;
            case 'quytrinh':
                return <ItemQuyTrinh item={item} />;
            default:
                return null;
        }
    }
    const Select = value => {
        setChecked(value);
        switch (value) {
            case 'thuhoach':
                setData(productInfo.SoTheoDoiThuHoach)
                return;
            case 'vuon':
                setData(productInfo.NhatKyChamSocVuon)
                return;
            case 'thuocBVTV':
                setData(productInfo.SoTheoDoiBVTV)
                return;
            case 'phanbon':
                setData(productInfo.SoTheoDoiPhanBon)
                return;
            case 'quytrinh':
                setData(productInfo.QuyTrinh)
                return;
            default:
                return [];
        }
    }
    return (
        <Content>
            <View style={{
                flexDirection: "column",
                alignItems: "center"
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    {tab.map((item, index) => {
                        return (
                            <TouchableRipple
                                onPress={() => Select(item.value)}
                                style={{ marginRight: 10, marginTop: 10 }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <RadioButton
                                        value="first"
                                        status={checked === item.value ? 'checked' : 'unchecked'}
                                        onPress={() => Select(item.value)}
                                        color={colorDefault}
                                    />
                                    <Text>{item.label}</Text>
                                </View>

                            </TouchableRipple>
                        )
                    })}
                </View>

            </View>
            {data.map(item => {
                return <Item item={item} />
            })}
            {data.length == 0 && <Text style={{ textAlign: 'center', marginTop: 40 }}>Danh sách trống</Text>}
        </Content>
    )
}

export default App;
const tab = [
    {
        value: 'thuhoach',
        label: 'Thu hoạch'
    },
    {
        value: 'vuon',
        label: 'Chăm sóc vườn'
    },
    {
        value: 'thuocBVTV',
        label: 'Thuốc BVTV'
    },
    {
        value: 'phanbon',
        label: 'Phân bón'
    },
    {
        value: 'quytrinh',
        label: 'Quy trình'
    },
]
const styles = {
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    listcontent: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#fff', marginTop: 1 },

}
