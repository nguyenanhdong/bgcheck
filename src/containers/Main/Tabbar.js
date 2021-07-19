import React, { Component, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';

const TabBar = props => {

    const offset = new Animated.Value(0);

    useEffect(() => {
        const oldState = props.navigation.state;
        const oldRoute = oldState.routes[oldState.index];
        const oldParams = oldRoute.params;
        const wasVisible = !oldParams || oldParams.visible;

        const newState = props.navigation.state;
        const newRoute = newState.routes[newState.index];
        const newParams = newRoute.params;
        const isVisible = !newParams || newParams.visible;

        if (wasVisible && !isVisible) {
            Animated.timing(offset, { toValue: 1, duration: 300, easing: Easing.linear(), useNativeDriver: true }).start();
        } else if (isVisible && !wasVisible) {
            Animated.timing(offset, { toValue: 0, duration: 300, easing: Easing.linear(), useNativeDriver: true }).start();
        }
    });


    const bottom = offset.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 60]
    });

    return (
        <Animated.View style={[styles.container, { translateY: bottom }]} >
            <BottomTabBar {...props} />
        </Animated.View>
    );
}

export default TabBar;

const styles = {
    container: {
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        elevation: 8,
        zIndex: 1000000,
    },
};