import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { deviceWidth, Themebackground, isAndroid } from '@assets/constants';
import Text from '@components/Text';
// import IconBackBlack from '@assets/images/ic_app/ic_back_black.svg';
// import IconGoHome from '@assets/images/ic_app/ic_goHome.svg';
// import IconBackWhite from '@assets/images/ic_app/ic_back_white.svg';
// import IconInfo from '@assets/images/ic_app/ic_info.svg';

const TitleScreen = props => {
    const { title, styleBackground, textStyle, backButton, showNotify, showAction, blackButton, actionStyle, buttonGoHome, sortData, infoJob } = props;
    return (
        <View style={[styles.bg_title, styles.style_shadow, typeof styleBackground != 'undefined' && styleBackground]} >
            {/* {typeof backButton != 'undefined' && backButton &&
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.button_back}
                    onPress={() => props.goBack()}
                >
                    {
                        typeof blackButton != 'undefined' && blackButton ?
                            <IconBackBlack width={15} height={15} />
                            :
                            <IconBackWhite />
                    }
                </TouchableOpacity>
            }

            {buttonGoHome &&
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.button_back}
                    onPress={() => props.goHome()}
                >
                    <IconGoHome />
                </TouchableOpacity>
            }

            <Text numberOfLines={1} style={[styles.text, typeof textStyle != 'undefined' && textStyle]}>{title}</Text>

            {typeof showAction != 'undefined' &&
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.button_back}
                    onPress={() => props.childrenAction()}
                    style={styles.actionSave}
                    disabled={showAction == 'Lưu '}
                >
                    <Text numberOfLines={1} style={[styles.text, typeof actionStyle != 'undefined' && actionStyle, showAction == 'Lưu ' ? { color: '#ccc' } : '']}>{showAction}</Text>
                </TouchableOpacity>
            }

            {sortData &&
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.actionSave}
                    onPress={() => sortData()}
                >
                    <IconInfo />
                </TouchableOpacity>
            }

            {infoJob &&
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.actionSave}
                    onPress={() => infoJob()}
                >
                    <Image source={require('@assets/images/ic_app/info.png')} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
                </TouchableOpacity>
            } */}
        </View>
    );
}
export default TitleScreen;

const styles = {
    bg_title: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 0,
        backgroundColor: Themebackground,
    },
    text: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '700'
    },
    button_back: {
        position: 'absolute',
        // top: 8,
        left: 15,
        width: 40,
        justifyContent: 'center',
        height: 45
    },
    button_delete: {
        position: 'absolute',
        bottom: 15,
        right: 15
    },
    icon_back: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    icon_delete: {
        width: 20,
        height: 24
    },
    button_notify: {
        position: 'absolute',
        top: 8,
        right: 15,
        width: 40,
        justifyContent: 'center',
        height: 45,
        alignItems: 'center'
    },
    icon_notify: {
        width: 26,
        height: 26,
        resizeMode: 'contain'
    },
    style_shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        // borderBottomWidth: 1, borderColor: '#ccc'
    },
    actionSave: {
        position: 'absolute',
        right: 15,
        justifyContent: 'center',
        height: 45
    }
}