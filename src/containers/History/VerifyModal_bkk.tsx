import React from 'react';
import { Input } from "react-native-elements"
import { View, StyleSheet, TouchableOpacity, Modal } from "react-native"
import { Device } from '../../Utils';
import { RNVertorIcon, NormalText } from '../../Theme';
import FontSize, { actuatedNormalize } from '../../Utils/FontSize';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { GlobalUIManager } from '../../GlobalUI';
import { QRCodeService } from '../../Services';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    temId: number
}
export class VerifyModal extends React.Component<Props, {
    visible: boolean, temText: string
}>{

    constructor(props: Props) {
        super(props)
        this.state = {
            visible: false,
            temText: ""
        }
    }
    show = () => {
        this.setState({
            visible: true
        })
    }
    hideModalSerial = () => {
        this.setState({
            visible: false
        })
    }
    setChangeTextTem = (temText: string) => {
        this.setState({
            temText: temText
        })
    }

    onVerify = (temCode: string) => {
        this.hideModalSerial();
        GlobalUIManager.view.showLoading("Đang kiểm tra ... ")
        QRCodeService.verify(this.props.temId, temCode)
            .then(verifyRes => {
                console.log("verifyRes", verifyRes);
                GlobalUIManager.view.hideLoading(
                    () => {
                        if (verifyRes == 0) {
                            GlobalUIManager.view.showAlert({
                                title: "Lỗi",
                                content: "Tem bạn nhập không tồn tại, vui lòng kiểm tra lại!"
                            })
                        } else if (verifyRes == 1) {
                            GlobalUIManager.view.showAlert({
                                title: "Tem hợp lệ!",
                                content: "Xác thực thành công!"
                            })
                        } else if (verifyRes == 2) {
                            GlobalUIManager.view.showAlert({
                                title: "Tem đã sử dụng!",
                                content: "Tem của bạn đã từng được kiểm tra trước đây, kiểm tra lại!"
                            })
                        }
                    }
                )
            })
            .catch(() => {
                GlobalUIManager.view.hideLoading(
                    () => GlobalUIManager.view.showAlert({
                        title: "Lỗi",
                        content: "Có lỗi xảy ra, thử lại!"
                    })
                )
            })
    }

    render() {
        const { visible, temText } = this.state;
        return <Modal
            visible={visible}
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Input
                        placeholder={"Nhập mã Tem ... "}
                        onChangeText={this.setChangeTextTem}
                        value={temText}
                        numberOfLines={2}
                        rightIcon={<TouchableOpacity
                            hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
                            disabled={temText.length == 0}
                            onPress={() => this.onVerify(temText)}
                        >
                            <LinearGradient
                                colors={
                                    temText.length == 0
                                        ? ['#d9d9d9', '#999797', '#696969']
                                        : ['#54beff', '#2da4ed', '#0997ed']
                                }
                                style={{
                                    flexDirection: "row",
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 8
                                }}>
                                <RNVertorIcon
                                    iconType={"MaterialIcons"}
                                    iconName={"center-focus-strong"}
                                    iconColor={"#fff"}
                                    iconSize={actuatedNormalize(25)}
                                />
                                <NormalText
                                    style={{
                                        fontSize: FontSize.xMd15,
                                        color: "#fff",
                                        fontWeight: "bold",
                                        marginLeft: 5
                                    }}
                                    text={"Check"}
                                />
                            </LinearGradient>
                        </TouchableOpacity>}
                        clearButtonMode={"always"}
                    />
                </View>
            </View>
            <TouchableOpacity
                onPress={this.hideModalSerial}
                style={{
                    position: "absolute",
                    top: Device.getHeaderHeight() + 20,
                    right: 30
                }}
            >
                <AntDesign
                    name={"closecircle"}
                    size={30}
                    color='#fe5e54'
                />
            </TouchableOpacity>
        </Modal>
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: 'rgba(52, 52, 52, 0.4)'
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})