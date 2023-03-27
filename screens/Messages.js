import { StyleSheet, SafeAreaView, ScrollView, RefreshControl, Text, View } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { Drawer } from 'react-native-ui-lib';
import RequestCard from '../components/RequestCard';
import { useDispatch, useSelector } from 'react-redux';
import { getMyBookingRequests } from '../redux/action';

const Messages = () => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const { bookingDetails } = useSelector(state => state.booking);
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getMyBookingRequests(user._id))
    }, []);

    const recentMessages = [...bookingDetails?.bookingDetails].sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // setTimeout(() => {
        dispatch(getMyBookingRequests(user._id));
        setRefreshing(false);
        // }, 400);
    }, []);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {
                    recentMessages?.map((item, index) => <RequestCard key={item._id} item={item} />)
                }
            </ScrollView>
        </SafeAreaView >
    )
}

export default Messages;

const styles = StyleSheet.create({})