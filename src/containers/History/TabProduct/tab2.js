import React from 'react';
import {
    View, ImageBackground, ScrollView
} from 'react-native';
import FontSize, { actuatedNormalize } from '../../../Utils/FontSize';
import { NormalText } from '../../../Theme';
const DayLyNCCItem = ({ item, index }) => {

    const [layout, setLayout] = React.useState({})
    // console.log("layout", layout)
    return <View
        onLayout={(event) => {
            setLayout(event.nativeEvent.layout)
        }}
        style={{
            marginVertical: 5,
            flexDirection: "row",
            backgroundColor: "#ffffff",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 9,
            },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 18,
            borderTopLeftRadius: 15, borderBottomLeftRadius: 15,
        }}
    >
        <ImageBackground
            source={require("@assets/Images/Common/stt_bg.png")}
            style={{
                width: actuatedNormalize(30),
                height: layout.height,
                alignItems: "center",
                alignContent: "center", justifyContent: "center"
            }}
        >
            <NormalText
                text={index.toString()}
                color="white"
                style={{
                    fontSize: FontSize.lg21,
                }}
            />
            
        </ImageBackground>
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                paddingVertical: 5,
                paddingLeft: 10,
                justifyContent: "space-between",
            }}
        >
            <NormalText
                text={item.Ten}
                color="#222455"
                style={{
                    fontSize: FontSize.md17,
                    marginBottom: 5,
                }}
            />
            <View
                style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    paddingLeft: 10,
                    marginBottom: 5,
                }}
            >
                <NormalText
                    text={`Đ/C: ${item.DiaChi}`}
                    color="#4E4E4E"
                    style={{
                        fontSize: FontSize.xMd15,
                        marginRight: 12,
                    }}
                />
                <NormalText
                    text={`ĐT: : ${item.Phone}`}
                    color="#4E4E4E"
                    style={{
                        fontSize: FontSize.xMd15,
                        marginRight: 12,
                    }}
                />
                <NormalText
                    text={`Email: ${item.Email}`}
                    color="#4E4E4E"
                    style={{
                        fontSize: FontSize.xMd15,
                        marginRight: 12,
                    }}
                />
            </View>

            <NormalText
                text={item.TenLoaiNhaCC}
                color="#222455"
                style={{
                    fontSize: FontSize.xMd15,
                    marginRight: 12,
                    marginBottom: 5,
                }}
            />
            <NormalText
                text={`Nội dung: ${item.NoiDung}`}
                color="#222455"
                style={{
                    fontSize: FontSize.xMd15,
                    marginRight: 12,
                }}
            />
        </View>
    </View>
}
const DaiLyNCC = ( props ) => {

    return <ScrollView
        style={{
            flex: 1,
            paddingHorizontal: 8,
            paddingVertical: 10,
        }}>
        <View
            style={{
                flexDirection: "column",
                paddingHorizontal: 8,
                paddingVertical: 10
            }}
        >
            {
                props.items.map((item, index) => {
                    return <DayLyNCCItem
                        key={index.toString()}
                        item={item}
                        index={index + 1}
                    />
                })
            }
        </View>
    </ScrollView>
}
export default DaiLyNCC