import React from 'react';
import { Text, TextProps } from 'react-native';
import { FontSize } from '../../Utils';

export type NormalTextProps = TextProps & {
    text?: string;
    size?: number
    color?: string
    fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
}
export const NormalText: React.SFC<NormalTextProps> = props => {
    const { text, size, color, fontWeight, style, children, ...others } = props;
    const fontSize = !!size ? size : FontSize.md;
    return <Text {...others} style={[{
        color: !!color ? color : '#ffffff',
        fontSize: fontSize,
        fontWeight: !!fontWeight ? fontWeight : "400", 
        // fontFamily: "SourceSansPro-Light",
        textAlignVertical: "center"
    }, style]}>
        {!!text ? text : ""}{!!children ? children : ""}
    </Text>
}
