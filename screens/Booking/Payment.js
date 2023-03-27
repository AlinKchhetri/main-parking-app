import { StyleSheet, SafeAreaView, Text, View, Platform, TouchableOpacity, Alert, StatusBar } from 'react-native'
import React from 'react'
import { COLORS, images, lightFONTS, SIZES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { bookParking } from '../../redux/action';
import axios from 'axios';
import { useStripe } from '@stripe/stripe-react-native';
import KhaltiPayment from './KhaltiPayment';
import WebView from 'react-native-webview';
import moment from 'moment';
import * as Notifications from 'expo-notifications';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { KhatiSdk } from 'rn-all-nepal-payment';
import { useState } from 'react';

const serverUrl = "https://parkpin-server.onrender.com/api/v1";

const Payment = ({ navigation, route }) => {

    const {
        userId,
        ownerId,
        parkingId,
        parkingAddress,
        startTime,
        endTime,
        vehicleType,
        rate,
        fee
    } = route.params.details;

    const paymentMethod = route.params.paymentMethod;
    console.log("🚀 ~ file: Payment.js:33 ~ Payment ~ paymentMethod:", paymentMethod)

    const [isVisible, setIsVisible] = useState(false);

    const dispatch = useDispatch();

    const { paymentIntent } = useSelector(state => state.booking);

    const { initPaymentSheet, presentPaymentSheet } = useStripe();


    const onPayment = async () => {
        if (paymentMethod === 'khalti') {
            setIsVisible(true);
            return;
        }
        const amount = fee * 100;
        const { data } = await axios.post(
            `${serverUrl}/payment`,
            { amount },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        if (data.error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Something went wrong. Please try again',
                autoClose: 2000,
            });
            return;
        }

        const initResponse = await initPaymentSheet({
            merchantDisplayName: 'ParkPin',
            paymentIntentClientSecret: data.paymentIntent,
            defaultBillingDetails: {
                name: 'Alin Khatri',
                email: 'alin@khatri.com',
                phone: '9842431325'
            }
        });

        if (initResponse.error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Something went wrong. Please try again',
                autoClose: 2000,
            });
            return;
        }

        const paymentResponse = await presentPaymentSheet();

        if (paymentResponse.error) {
            if (paymentResponse.error.code == 'Canceled') return;
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: `Error code: ${paymentResponse.error.code}, ${paymentResponse.error.message}`,
                autoClose: 2000,
            });
            return;
        }
        dispatch(bookParking(userId, ownerId, parkingId, startTime, endTime, vehicleType, fee)).then(async () => {
            navigation.navigate('HomeStack', { screen: 'home' });

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "ParkPin 📬",
                    body: 'Your booking time will expire after 5 minutes. Please extend your booking time if needed. Thank you!',
                },
                trigger: { date: moment(endTime).subtract(5, 'minutes') },
            });
        });

        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Booking Successful',
            textBody: 'Your booking request has been sent successfully. Thank you!',
            autoClose: 2000,
        });

    };

    const _onPaymentComplete = (data) => {
        setIsVisible(false);
        const str = data.nativeEvent.data;
        const resp = JSON.parse(str);
        if (resp.event === 'CLOSED') {
            return;
        } else if (resp.event === 'SUCCESS') {
            dispatch(bookParking(userId, ownerId, parkingId, startTime, endTime, vehicleType, fee)).then(async () => {
                navigation.navigate('HomeStack', { screen: 'home' });

                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "ParkPin 📬",
                        body: 'Your booking time will expire after 5 minutes. Please extend your booking time if needed. Thank you!',
                    },
                    trigger: { date: moment(endTime).subtract(5, 'minutes') },
                });
            });

            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Booking Successful',
                textBody: 'Your booking request has been sent successfully. Thank you!',
                autoClose: 2000
            });
        } else if (resp.event === 'ERROR') {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Error',
                textBody: 'Something went wrong. Please try again',
                autoClose: 2000
            });
            return;
        }
        return;
    };


    console.log(route.params)

    function SummarySection({ label, data }) {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 5
            }}>
                <Text style={{
                    ...lightFONTS.h5
                }}>{label}</Text>
                <View style={{ width: 30 }} />
                <Text numberOfLines={1} style={{
                    flex: 1,
                    textAlign: 'right',
                    ...lightFONTS.body4,
                    flexWrap: 'wrap'
                }}>{data}</Text>
            </View>
        )
    };

    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
        }}>
            <StatusBar barStyle={'dark-content'} />
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'white',
                margin: 15,
                padding: 10,
                borderRadius: 10
            }}>
                <View style={{
                    flexDirection: 'column',
                    marginHorizontal: 5
                }}>
                    <SummarySection label={'Parking Area'} data={parkingAddress?.split(',')[0]} />
                    <SummarySection label={'Address'} data={parkingAddress} />
                    <SummarySection label={'Vehicle Type'} data={vehicleType} />
                    <SummarySection label={'No. of Slot'} data={1} />
                    <SummarySection label={'Date'} data={moment(startTime).format('LL')} />
                    <SummarySection label={'Duration'} data={`${moment(startTime).format('LT')} - ${moment(endTime).format('LT')}`} />
                </View>
            </View>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: 'white',
                margin: 15,
                padding: 10,
                borderRadius: 10
            }}>
                <View style={{
                    flexDirection: 'column',
                    marginHorizontal: 5
                }}>
                    <SummarySection label={'Rate per hour'} data={`Rs. ${rate}`} />
                    <SummarySection label={'Hours'} data={`${Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))} hour`} />
                    {/* <SummarySection label={'Taxes & Fees (10%)'} data={`Rs. ${rate * 0.1}`} /> */}
                    <View style={{ height: 1, backgroundColor: 'grey', margin: 10 }} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 5
                    }}>
                        <Text style={{
                            ...lightFONTS.h4
                        }}>Total</Text>
                        <Text style={{
                            ...lightFONTS.h5
                        }}>{fee}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                onPress={onPayment}
                style={{
                    backgroundColor: COLORS.green,
                    margin: SIZES.padding2,
                    padding: SIZES.padding2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: SIZES.padding2
                }}>
                <Text style={{
                    ...lightFONTS.h5,
                    color: 'white',
                }}>
                    Pay
                </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
                onPress={() => setIsVisible(true)}
                style={{
                    backgroundColor: COLORS.green,
                    margin: SIZES.padding2,
                    padding: SIZES.padding2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: SIZES.padding2
                }}>
                <Text style={{
                    ...lightFONTS.h5,
                    color: 'white',
                }}>
                    Khalti
                </Text>
            </TouchableOpacity> */}
            <KhatiSdk
                amount={fee * 100} // Number in paisa
                isVisible={isVisible} // Bool to show model
                paymentPreference={[
                    // Array of services needed from Khalti
                    'KHALTI',
                    'EBANKING',
                    'MOBILE_BANKING',
                    'CONNECT_IPS',
                    'SCT',
                ]}
                productName={'Parking'} // Name of product
                productIdentity={parkingId} // Unique product identifier at merchant
                onPaymentComplete={_onPaymentComplete} // Callback from Khalti Web Sdk
                productUrl={'https://parkpin-server.onrender.com/api/v1'} // Url of product
                publicKey={'test_public_key_f263f31dc43c4f59bd4479e8137e4418'} // Test or live public key which identifies the merchant
            />
        </SafeAreaView>
    )
}

export default Payment

const styles = StyleSheet.create({})