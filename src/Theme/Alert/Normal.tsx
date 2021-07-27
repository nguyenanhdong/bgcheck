import React from 'react'
import { View, Modal, Keyboard, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native'

import { NormalButton } from '../Buttons';
import { CommonImage } from '../../assets/Images';
import { NormalText } from '../Text';
import { FontSize, Device } from '../../Utils';
import { actuatedNormalize } from '../../Utils/FontSize';

export interface NormalAlertProps {
    visible: boolean,
    onRequestClose?: () => void,
    title?: string,
    content?: string,
    image?: any,
    onConfirmPress: () => void
    onCancelPress?: () => void,
    confirm?: string,
}

export const NormalAlert: React.FC<NormalAlertProps> = (props) => {
    const closePopup = () => {
        props.onRequestClose && props.onRequestClose()
    }
    return (
        <Modal
            visible={props.visible}
            onRequestClose={props.onRequestClose}
            animationType="fade"
            transparent
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    !!props.onRequestClose && props.onRequestClose()
                }}
            >
                <View style={styles.container}>
                    <StatusBar backgroundColor="rgba(0,0,0,0.7)" barStyle="light-content" />

                    <View style={{ position: 'relative', padding: 13 }}>
                        <View style={styles.closeContainer}>
                            <TouchableOpacity onPress={closePopup}>
                                <Image style={styles.image} source={CommonImage.CloseIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.boxContainer}>
                            <Image source={props.image || CommonImage.AlertIcon} resizeMethod='scale' resizeMode='contain' style={{ width: actuatedNormalize(100), height: actuatedNormalize(135) }} />
                            <NormalText style={styles.title}>{props.title || "Thông Báo"}</NormalText>
                            <NormalText style={{ color: 'black', textAlign: 'center', width: '90%' }}>{props.content}</NormalText>
                            <View style={styles.buttonBox}>
                                <NormalButton
                                    title={props.confirm || "Tôi đồng ý"}
                                    onPress={props.onConfirmPress}
                                    style={styles.buttonSelect}
                                />
                            </View>
                            {props.onCancelPress && <View style={styles.buttonBox}>
                                <TouchableOpacity style={[styles.buttonSelect, { marginBottom: 0 }]} onPress={props.onCancelPress}>
                                    <NormalText style={{ textAlign: 'center' }} text="Hủy" />
                                </TouchableOpacity>
                            </View>}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgba(51,51,51,0.2)',
        // height: "100%",
        paddingLeft: "10%",
        paddingRight: "10%",
        // position: 'relative',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    content: {
        width: '100%',
    },
    title: {
        color: 'black',
        fontSize: FontSize.lg,
        marginBottom: 4,
    },
    image: { width: actuatedNormalize(35), height: actuatedNormalize(35) },
    boxContainer: {
        width: Device.width * 9 / 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { height: 0, width: 0 },
        zIndex: 10,
        maxHeight: Device.height * 2 / 3

    },
    closeContainer: {
        position: 'absolute',
        zIndex: 11,
        right: 0,
        elevation: 5
    },
    buttonSelect: {
        height: actuatedNormalize(50),
        marginVertical: 10
    },
    buttonBox: {
        width: '80%'
    },
})