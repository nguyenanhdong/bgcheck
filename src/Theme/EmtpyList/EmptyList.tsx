import React from 'react'
import { ImageProps } from 'react-native-elements';
import { View, StyleProp, ViewStyle, TextStyle, ImageStyle, Image } from 'react-native';
import { NormalText } from '../Text';
import { CommonImage } from '@assets/Images';
import { FontSize } from '../../Utils';
import { actuatedNormalize } from '../../Utils/FontSize';

export interface EmptyListProps {
    image?: ImageProps,
    bigTitle?: string,
    smallTitle?: string,
    containerStyle?: StyleProp<ViewStyle>,
    smallTitleStyle?: StyleProp<TextStyle>,
    bigTitleStyle?: StyleProp<TextStyle>,
    imageStyle?: StyleProp<ImageStyle>,
}

export const EmptyList: React.FC<EmptyListProps> = (props) => {
    const { image = CommonImage.EmptyIcon, bigTitle, smallTitle, containerStyle = {}, smallTitleStyle = {}, bigTitleStyle = {}, imageStyle = {} } = props
    return (
        <View style={[{
            alignItems: 'center',
            justifyContent: 'center',
        }, containerStyle]}>
            <Image
                style={[{ height: actuatedNormalize(200), width: actuatedNormalize(200), marginVertical: 20 }, imageStyle]}
                resizeMode='contain'
                resizeMethod='scale'
                source={image}
            />
            {bigTitle && <NormalText
                // numberOfLines={2}
                style={[{ fontSize: FontSize.lg, width: '80%', textAlign: 'center', marginVertical: 10 }, bigTitleStyle]}
                text={bigTitle}
            />}
            {smallTitle && <NormalText
                // numberOfLines={2}
                style={[{ fontSize: FontSize.xMd, width: '80%', textAlign: 'center' }, smallTitleStyle]}
                text={smallTitle}
            />}
        </View>
    )


}