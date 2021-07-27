import React, { Component } from 'react';

export type IconTypeVT = "Ionicons" | "Entypo" | "EvilIcons" | "FontAwesome" | "MaterialCommunityIcons" | "MaterialIcons" | "Octicons" | "SimpleLineIcons" | "Zocial" | "Feather" | "Foundation" | "AntDesign";

type VectorIconProps = {
    iconType: IconTypeVT
    iconName: string;
    iconSize: number;
    iconColor: string;
    iconPosition?: "left" | "right" | null;
}

//importing icons
import I from 'react-native-vector-icons/Ionicons';
import En from 'react-native-vector-icons/Entypo';
import Ev from 'react-native-vector-icons/EvilIcons';
import F from 'react-native-vector-icons/FontAwesome';
import Mc from 'react-native-vector-icons/MaterialCommunityIcons';
import M from 'react-native-vector-icons/MaterialIcons';
import S from 'react-native-vector-icons/SimpleLineIcons';
import Z from 'react-native-vector-icons/Zocial';
import O from 'react-native-vector-icons/Octicons';
import Fe from 'react-native-vector-icons/Feather';
import Fa from 'react-native-vector-icons/Foundation';
import Ant from 'react-native-vector-icons/AntDesign';

/*
    //USAGE
    <TakeerIcon
        iconType= "" //Ionicons,Entypo, EvilIcons, FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons, SimpleLineIcons, Zocial, null
        iconName="" // icon name according to iconType or pass null to hide
        iconSize=""
        iconColor=""
        iconPosition="" //left, right, null
    />
*/
export const RNVertorIcon: React.FC<VectorIconProps> = (props) => {

    const iconName = () => {
        return props.iconName;
    }

    const iconSize = () => {
        return props.iconSize;
    }

    const iconColor = () => {
        return props.iconColor;
    }

    const renderIcon = () => {
        if (props.iconType == "Ionicons"
            || props.iconType == "Entypo"
            || props.iconType == "EvilIcons"
            || props.iconType == "FontAwesome"
            || props.iconType == "MaterialCommunityIcons"
            || props.iconType == "MaterialIcons"
            || props.iconType == "Octicons"
            || props.iconType == "SimpleLineIcons"
            || props.iconType == "Feather"
            || props.iconType == "Foundation"
            || props.iconType == "Zocial"
            || props.iconType == "AntDesign"
        ) {
            if (props.iconType == "AntDesign") {
                return (
                    <Ant name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
            if (props.iconType == "Ionicons") {
                return (
                    <I name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
            if (props.iconType == "Octicons") {
                return (
                    <O name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
            if (props.iconType == "EvilIcons") {
                return (
                    <Ev name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
            if (props.iconType == "Entypo") {
                return (
                    <En name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
            if (props.iconType == "FontAwesome") {
                return (
                    <F name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
            if (props.iconType == "MaterialCommunityIcons") {
                return (
                    <Mc name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
            if (props.iconType == "MaterialIcons") {
                return (
                    <M name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
            if (props.iconType == "SimpleLineIcons") {
                return (
                    <S name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }

            if (props.iconType == "Feather") {
                return (
                    <Fe name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
            if (props.iconType == "Foundation") {
                return (
                    <Fa name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }

            if (props.iconType == "Zocial") {
                return (
                    <Z name={iconName()} size={iconSize()} color={iconColor()} />
                )
            }
        }
        return (
            <I name={iconName()} size={iconSize()} color={iconColor()} />
        )
    }

    return (
        renderIcon()
    );
}
