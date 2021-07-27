import React from 'react';
import {
    View, ScrollView
} from 'react-native';
import { NormalText ,NormalFlashList} from '../../../Theme';

import StarRating from 'react-native-star-rating';
import { FontSize } from '../../../Utils';
import UserAvatar from 'react-native-user-avatar';
import moment from "moment";

const TotalRateItem = ({
    color, text, textColor, rate
}) => {
    return <View style={{
        flexDirection: "column",
        alignItems: "center"
    }}>
        <NormalText
            text={`${rate || 0}/5`}
            color={color}
            style={{
                marginBottom: 5
            }}
        />
        <StarRating
            disabled={true}
            emptyStar={'star-border'}
            fullStar={'star'}
            halfStar={'star-half'}
            iconSet={'MaterialIcons'}
            maxStars={5}
            rating={rate ||0}
            fullStarColor={color}
            starSize={20}
        />
        <View style={{
            paddingVertical: 4, paddingHorizontal: 8,
            backgroundColor: color,
            marginTop: 8,
            borderRadius: 10,
        }}>
            <NormalText
                text={text}
                color={textColor}
                style={{
                    fontSize: FontSize.md17
                }}
            />
        </View>
    </View>
}

const TotalRate = ({ diem }) => {
    return <View style={{
        flexDirection: "row",
        justifyContent: "space-evenly"
    }}>
        <TotalRateItem
            rate={diem.ChatLuong}
            color="#FFCC00"
            text={"C/L sản phẩm"}
            textColor="#101010"
        />
        <TotalRateItem
            color="#E90F0F"
            text={"N/C thị trường"}
            textColor="#FEFEFE"
            rate={diem.NhuCau}
        />
    </View>
}

const HistoryRate = ({ nhanxet }) => {

    const renderItem = ({ item }) => {
        const DateStr = item.NgayTao.split("(")[1].split(")")[0];
        return <View
            style={{
                flexDirection: "row",
                borderBottomWidth: 0.5, borderBottomColor: "gray",
                paddingVertical: 5,
                justifyContent: "space-between",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1
                }}
            >
                <UserAvatar size={40} name={item.TenKhachHang} src={item.Avatar} />
                <View style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    paddingLeft: 10,
                    flex: 1
                }}>
                    <NormalText
                        text={item.TenKhachHang}
                        color={"#0B61D2"}
                        style={{
                            fontSize: FontSize.xMd15,
                            marginBottom: 5,
                        }}
                    />
                    <NormalText
                        text={moment(Number(DateStr)).format('DD/MM/YYYY')}
                        color="#515C6F"
                        style={{
                            fontSize: FontSize.sm13,
                            marginBottom: 5,
                        }}
                    />
                    <NormalText
                        text={item.NoiDung}
                        color="#515C6F"
                        style={{
                            fontSize: FontSize.sm13,
                            marginBottom: 5,
                        }}
                    />
                </View>
            </View>
            <View
                style={{
                    flexDirection: "column",
                    alignItems: "flex-end"
                }}
            >
                <StarRating
                    disabled={true}
                    emptyStar={'star-border'}
                    fullStar={'star'}
                    halfStar={'star-half'}
                    iconSet={'MaterialIcons'}
                    maxStars={5}
                    rating={item.Diem}
                    fullStarColor={"#E90F0F"}
                    starSize={20}
                />
                <View style={{
                    paddingVertical: 4, paddingHorizontal: 8,
                    backgroundColor: item.Loai == 1 ? "#FFCC00" : "#E90F0F",
                    marginTop: 8,
                    borderRadius: 10,
                }}>
                    <NormalText
                        text={item.Loai == 1 ? "C/L sản phẩm" : "N/C thị trường"}
                        color={item.Loai == 1 ? "#101010" : "#FEFEFE"}
                        style={{
                            fontSize: FontSize.sm13
                        }}
                    />
                </View>
            </View>
        </View>
    }
    {/* <TotalRateItem
            rate={diem.ChatLuong}
            color="#FFCC00"
            text={"C/L sản phẩm"}
            textColor="#101010"
        />
        <TotalRateItem
            color="#E90F0F"
            text={"N/C thị trường"}
            textColor="#FEFEFE"
            rate={diem.NhuCau}
        /> */}
    return <NormalFlashList
        refreshControlProps={{
            refreshing: false,
            // onRefresh: handlerRefresh
        }}
        emptyViewProps={{
            bigTitle: 'Lịch sử đánh giá rỗng',
            bigTitleStyle: {
                color: '#aaa'
            }
        }}
        data={nhanxet}
        keyExtractor={(item) => item.Id.toString()}
        // onEndReachedThreshold={0}
        // onEndReached={debounce(loadmore, 500)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 15 }}
    />
}

const DanhGia = ({ productInfo }) => {
    return <ScrollView
        style={{
            flex: 1,
            flexDirection: "column",
            paddingHorizontal: 8,
            paddingVertical: 10
        }}>
        <TotalRate
            diem={productInfo.Diem}
        />
        <HistoryRate
            nhanxet={productInfo.NhanXet}
        />
    </ScrollView>
}
export default DanhGia