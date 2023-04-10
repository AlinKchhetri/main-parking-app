import { StyleSheet, SafeAreaView, StatusBar, Text, View, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, images, FONTS, SIZES, icons } from '../../constants';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useDispatch } from 'react-redux';
import { changeRole, loadUser } from '../../redux/action';

const ChangeRole = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const [role, setRole] = useState('user');

    const handleChangeRole = () => {
        dispatch(changeRole(role));
        dispatch(loadUser());
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <StatusBar barStyle={'dark-content'} />
            <Text style={{
                ...FONTS.h4,
                marginTop: 20,
                marginHorizontal: SIZES.padding2
            }}>How do you plan to use ParkPin?</Text>
            <Text style={{ ...FONTS.body4, marginHorizontal: SIZES.padding2, marginTop: 10, color: COLORS.grey }}>We'll use this to provide user or owner interface.</Text>

            <View style={{
                marginTop: 10
            }}>

                <Pressable
                    onPress={() => {
                        setRole('user');
                    }}
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        backgroundColor: '#f6f6f6',
                        marginHorizontal: 15,
                        marginVertical: 5,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderColor: role == 'user' ? '#0054fdff' : '#f2f2f2ff',
                        borderWidth: 2,
                        borderRadius: 15,
                        height: 80
                    }}>
                    <Text style={{ ...FONTS.h4 }}>User</Text>
                    <Text style={{ ...FONTS.body4 }}>I want to search & book parking spaces.</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        setRole('owner');
                    }}
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        backgroundColor: '#f6f6f6',
                        marginHorizontal: 15,
                        marginVertical: 5,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderColor: role == 'owner' ? '#0054fdff' : '#f2f2f2ff',
                        borderWidth: 2,
                        borderRadius: 15,
                        height: 80
                    }}>
                    <Text style={{ ...FONTS.h4 }}>Owner</Text>
                    <Text style={{ ...FONTS.body4 }}>I want to publish my parking spaces for others.</Text>
                </Pressable>
                <TouchableOpacity
                    onPress={handleChangeRole}
                    style={{
                        backgroundColor: COLORS.green,
                        margin: SIZES.padding2,
                        padding: SIZES.padding2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: SIZES.padding2
                    }}>
                    <Text style={{
                        ...FONTS.h5,
                        color: 'white',
                    }}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default ChangeRole

const styles = StyleSheet.create({})