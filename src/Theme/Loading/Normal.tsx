import React from 'react'
import { ViewProps, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontSize } from '../../Utils';
import { actuatedNormalize } from '../../Utils/FontSize';

export interface NormalLoading extends ViewProps {
    isLoading: boolean,
    color?: string,
    mini?: boolean,
    borderRadius?: number
    text?: string
}

export const NormalLoading: React.FC<NormalLoading> = (props) => {
    let { isLoading, color, mini = false, borderRadius = 0, text } = props
    if (isLoading) {
        return (
            <View style={[styles.container, { borderRadius: borderRadius }]}>
                <View style={[styles.background, mini ? { backgroundColor: 'transparent' } : {}]}>
                    <View style={styles.indicatorStyle}>
                        <ActivityIndicator color={mini ? '#fff' : color} />
                    </View>
                    {text ? <Text style={styles.text}>{text}</Text> : <></>}
                </View>
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(51,51,51,0.3)",
        zIndex: 10,
    },
    indicatorStyle: {
        height: actuatedNormalize(60),
        width: actuatedNormalize(60),
        borderRadius: 3,
        justifyContent: "center",
        alignItems: 'center',
    },
    background: {
        backgroundColor: 'rgba(214, 214, 229, 0.87)',
        flexDirection: "row"
    },
    text: {
        textAlignVertical: "center",
        alignSelf: "center",
        paddingRight: 10,
        fontSize: FontSize.xMd15,
    }
})