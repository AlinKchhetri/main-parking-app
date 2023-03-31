import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { COLORS, SIZES, lightFONTS, darkFONTS, icons, images } from '../../constants'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import UserList from '../../components/UserList';
import UserDemography from '../../components/UserDemography';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Colors } from 'react-native-ui-lib';
import { deleteUser, getAllUser } from '../../redux/action';

const AdminUsers = () => {

    const dispatch = useDispatch();

    const { userDetails } = useSelector(state => state.parking);

    const renderRightActions = (item) => {
        return (
            <TouchableOpacity
                onPress={async () => {
                    dispatch(deleteUser(item?._id));
                    dispatch(getAllUser());
                }}
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.red,
                    width: 100,
                    borderRadius: 10,
                    marginVertical: 5
                }}>
                <Icon
                    name='delete'
                    size={25}
                    color='white'
                />
                <Text style={{
                    ...lightFONTS.body3,
                    color: 'white'
                }}>
                    Delete
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={{
            flex: 1,
            margin: 10
        }}>
            <Text style={{ ...lightFONTS.h3, margin: 15, marginTop: 30 }}>Users</Text>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 50
                }}
                contentInset={{ bottom: 50 }}
            >
                <UserDemography />
                {
                    userDetails?.userDetails?.map((item) => {
                        return (
                            <Swipeable key={item._id} renderRightActions={() => renderRightActions(item)}>
                                <UserList item={item} />
                            </Swipeable>
                        )
                    }
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdminUsers

const styles = StyleSheet.create({

})