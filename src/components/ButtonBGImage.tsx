import React from "react";
import { StyleSheet, Image, TouchableOpacity, View, ImageStyle, StyleProp, ViewStyle, TextStyle } from "react-native";
import { NormalText } from "../Theme";

type Props = {
    backgroundImage: any,
    bgImageStyle?: ImageStyle,

    style?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    text?: string;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean
    onPress: () => void
};
type State = {};

class ButtonBGImage extends React.Component<Props, State> {
    render() {
        const {
            bgImageStyle,
            backgroundImage,
            style,
            buttonStyle,
            contentStyle,
            text,
            textStyle,
            children,
            disabled,
            onPress
        } = this.props;

        return (
            <TouchableOpacity
                disabled={disabled}
                onPress={() => onPress()}
                style={style}
            >
                <View
                    style={[styles.button, buttonStyle]}
                >
                    <Image
                        source={backgroundImage}
                        style={[{
                            flex: 1,
                            resizeMode: 'stretch',
                            width: "100%"
                        }, StyleSheet.absoluteFill, bgImageStyle]}
                    />
                    <View style={contentStyle}>
                        {text && <NormalText text={text} style={textStyle} />}
                        {children}
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
    }
});
export default ButtonBGImage;
