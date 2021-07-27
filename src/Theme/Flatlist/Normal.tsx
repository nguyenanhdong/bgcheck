/** 
 * @author: Tytv1  
 * @Since 2019-10-17 15:59:49  
 * @Last Modified by: Tytv1
 * @Last Modified time: 2019-11-04 13:07:29
*/


import React, { MutableRefObject } from 'react'
import { View, FlatList, FlatListProps, RefreshControlProps, RefreshControl } from 'react-native'
import { EmptyList, EmptyListProps } from '../EmtpyList';
import {
    BarIndicator,
} from 'react-native-indicators';

export interface NormalFlashListProps<T> extends FlatListProps<T> {
    emptyViewProps: EmptyListProps
    refreshControlProps: RefreshControlProps
    loadmoring?: boolean
    innerRef?: MutableRefObject<FlatList<T>>
}

export class NormalFlashList<T> extends React.PureComponent<NormalFlashListProps<T>> {

    renderRefreshControl = () => {
        const { data, refreshControlProps } = this.props
        const refeshing = refreshControlProps.refreshing && data.length > 0
        return (
            <RefreshControl
                {...refreshControlProps}
                refreshing={refeshing}
            />
        )
    }

    renderEmptyList = () => {
        const { data, emptyViewProps, refreshControlProps } = this.props
        if (refreshControlProps.refreshing && data.length === 0) return <BarIndicator color="#f9a840" />
        return (
            <EmptyList
                {...emptyViewProps}
            />
        )
    }

    renderListFooter = () => {
        return (
            <View style={{ paddingVertical: 15, width: "100%", alignSelf: "center" }}>
                {this.props.loadmoring && <BarIndicator color="#f9a840" />}
                {this.props.ListFooterComponent}
            </View>
        )
    }

    render() {
        return (
            <FlatList<T>
                {...this.props}
                // ref={this.props.innerRef}
                refreshControl={this.renderRefreshControl()}
                ListEmptyComponent={this.renderEmptyList()}
                ListFooterComponent={this.renderListFooter()}
            />
        )
    }
}