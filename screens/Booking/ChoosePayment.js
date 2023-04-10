import { StyleSheet, SafeAreaView, StatusBar, Text, View, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, images, FONTS, SIZES, icons } from '../../constants';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const ChoosePayment = ({ navigation, route }) => {
    const [selectedPayment, setselectedPayment] = useState('card');

    const { fee } = route.params.details;

    const proceedPayment = () => {
        if (selectedPayment === 'card' && fee < 100) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Your total booking fee should be at least Rs. 100 for payment with Card',
                autoClose: 2000,
            });
            return;
        }
        navigation.navigate('HomeStack',
            { screen: 'payment', params: { details: route.params.details, paymentMethod: selectedPayment, paymentMode: true } },
        )
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <StatusBar barStyle={'dark-content'} />
            <Text style={{
                ...FONTS.h5,
                marginTop: 20,
                marginHorizontal: SIZES.padding
            }}>Choose Payment Method</Text>
            <View style={{
                marginTop: 10
            }}>

                <Pressable
                    onPress={() => {
                        setselectedPayment('card');
                    }}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f6f6f6',
                        marginHorizontal: 15,
                        marginVertical: 5,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderColor: selectedPayment == 'card' ? '#0054fdff' : '#f2f2f2ff',
                        borderWidth: 2,
                        borderRadius: 15,
                        height: 80
                    }}>
                    <Image
                        source={icons.visa}
                        style={{
                            width: 100,
                            height: 40
                        }}
                    />
                    <Text style={{ ...FONTS.h5 }}>Card</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        setselectedPayment('khalti');
                    }}
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: '#f6f6f6',
                        marginHorizontal: 15,
                        marginVertical: 5,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        borderRadius: 15,
                        borderColor: selectedPayment == 'khalti' ? '#0054fdff' : '#f2f2f2ff',
                        borderWidth: 2,
                        height: 80
                    }}>
                    <Image
                        source={icons.khalti}
                        // resizeMethod='scale'
                        style={{
                            width: 100,
                            height: 40
                        }}
                    />
                    <Text style={{ ...FONTS.h5 }}>Khalti</Text>
                </Pressable>
                <TouchableOpacity
                    onPress={proceedPayment}
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

export default ChoosePayment

const styles = StyleSheet.create({})