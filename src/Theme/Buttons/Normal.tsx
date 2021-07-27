import React from 'react'

import { Button, ButtonProps } from 'react-native-elements';
// import LinearGradient from 'react-native-linear-gradient';
import { StyleProp, ViewStyle, Platform, TouchableOpacity } from 'react-native';
import { FontSize } from '../../Utils';
import { actuatedNormalize } from '../../Utils/FontSize';

export interface NormalButtonProps extends ButtonProps {
    backgroundType?: "LINEAR" | "WHITE"
}

export const NormalButton: React.FC<NormalButtonProps> = (props) => {
    const DefaultHeight: number = actuatedNormalize(55)
    const { backgroundType = "LINEAR", disabled } = props
    const colors = (backgroundType === "LINEAR" && !disabled) ? ['#fcd850', '#f9a840'] : ["#FFFFFF", "#FFFFFF"]
    const shadowStyle: ViewStyle = {
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    }
    const containerStyle: StyleProp<ViewStyle> = Platform.OS === 'ios' ? [
        shadowStyle,
        props.containerStyle
    ] : props.containerStyle

    const buttonStyle: StyleProp<ViewStyle> = [
        {
            height: DefaultHeight,
            borderRadius: DefaultHeight / 2
        },
        props.buttonStyle
    ]
    if (Platform.OS === "android") { buttonStyle.push(shadowStyle) }

    return <Button
        {...props}
        // ViewComponent={LinearGradient}
        TouchableComponent={TouchableOpacity}
        containerStyle={containerStyle}
        buttonStyle={buttonStyle}
        titleProps={{
            allowFontScaling: false
        }}
        titleStyle={[{ color: "#111111", fontSize: FontSize.lg, fontWeight: "600" }, props.titleStyle]}
        // linearGradientProps={{
        //     colors,
        //     start: { x: 0, y: 0.5 },
        //     end: { x: 1, y: 0.5 },
        // }}
    />

}