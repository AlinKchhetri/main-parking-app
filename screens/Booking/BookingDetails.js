import React, { useState, useEffect } from 'react';
import { SafeAreaView, StatusBar, TouchableOpacity, View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS, lightFONTS, SIZES } from '../../constants';
import moment from 'moment';

const BookingDetails = ({ navigation, route }) => {
    // const [details, setDetails] = useState({});
    console.log("🚀 ~ file: BookingDetails.js:8 ~ BookingDetails ~ details:", route.params.booking)
    const {
        _id,
        booking_startTime,
        booking_endTime,
        vehicleType,
        response,
        status,
        total_fee
    } = route.params.booking;
    console.log("🚀 ~ file: BookingDetails.js:19 ~ BookingDetails ~ status:", status)

    const {
        _id: parkingSpaceId,
        locationName,
        two_wheeler,
        four_wheeler
    } = route.params.booking.parkingSpaceDetails;

    const {
        _id: ownerId
    } = route.params.booking.ownerDetails;

    const {
        _id: userId
    } = route.params.booking.userDetails;


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
            <ScrollView showsVerticalScrollIndicator={false}>
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
                        <SummarySection label={'Parking Area'} data={locationName?.split(',')[0]} />
                        <SummarySection label={'Address'} data={locationName} />
                        <SummarySection label={'Vehicle Type'} data={vehicleType} />
                        <SummarySection label={'No. of Slot'} data={1} />
                        <SummarySection label={'Date'} data={moment(booking_startTime).format('LL')} />
                        <SummarySection label={'Duration'} data={`${moment(booking_startTime).format('LT')} - ${moment(booking_endTime).format('LT')}`} />
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
                        <SummarySection label={'Rate per hour'} data={`Rs. ${vehicleType == 'bike' ? two_wheeler.rate : four_wheeler.rate}`} />
                        {/* <SummarySection label={'Hours'} data={`${Math.round((booking_endTime?.getTime() - booking_startTime?.getTime()) / (1000 * 60 * 60))} hour`} /> */}
                        <SummarySection label={'Taxes & total_fees (10%)'} data={`Rs. ${(vehicleType == 'bike' ? two_wheeler.rate : four_wheeler.rate) * 0.1}`} />
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
                            }}>{total_fee}</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    marginBottom: 10,
                    padding: 20,
                    borderRadius: 10
                }}>
                    <QRCode value={_id} size={150} />
                </View>
                {
                    response === 'Accepted' && status === 'Unpaid' ?
                        <TouchableOpacity
                            onPress={() => {
                                let bookingDetails = {
                                    userId: userId,
                                    ownerId: ownerId,
                                    bookingId: _id,
                                    parkingId: parkingSpaceId,
                                    parkingAddress: locationName,
                                    rate: vehicleType == 'bike' ? two_wheeler?.rate : four_wheeler?.rate,
                                    startTime: booking_startTime,
                                    endTime: booking_endTime,
                                    vehicleType: vehicleType,
                                    fee: total_fee
                                }
                                navigation.navigate('HomeStack',
                                    { screen: 'choosePayment', params: { details: bookingDetails, paymentMode: true } },
                                )
                            }}
                            style={{
                                backgroundColor: COLORS.green,
                                marginHorizontal: SIZES.padding2,
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
                        : null
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f2f2f2',
        marginTop: 20
    },
    ticketContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
    },
    ticketHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 10,
    },
    ticketHeaderText: {
        ...lightFONTS.h3,
        textAlign: 'center'
    },
    labelText: {
        ...lightFONTS.h5,
        color: '#707C80',
        marginBottom: 3,
    },
    detailText: {
        ...lightFONTS.h5
    }
});

export default BookingDetails;