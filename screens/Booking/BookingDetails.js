import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { COLORS, lightFONTS } from '../../constants';

const BookingDetails = ({ navigation, route }) => {
    const [details, setDetails] = useState({});
    console.log("🚀 ~ file: BookingDetails.js:8 ~ BookingDetails ~ details:", details)

    useEffect(() => {
        if (route.params) {
            setDetails(route.params.booking)
        }
    }, [route]);


    return (
        <View style={styles.container}>
            <View style={styles.ticketContainer}>
                <View style={styles.ticketHeader}>
                    <Text style={styles.ticketHeaderText}>Parking Ticket</Text>
                </View>
                <View style={[styles.ticketHeader, { margin: 20 }]}>
                    <View style={{ marginVertical: 15 }}>
                        <Text style={styles.labelText}>Ticket Id:</Text>
                        <Text onPress={() => navigation.navigate('parkingDetails', { space: details })} style={styles.detailText}>{details?._id}</Text>
                    </View>
                    <View style={{ marginVertical: 15 }}>
                        <Text style={styles.labelText}>Location:</Text>
                        <Text style={styles.detailText}>Putalisadak, Kathmandu</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>
                        <View>
                            <Text style={styles.labelText}>Date:</Text>
                            <Text style={styles.detailText}>{moment(details?.booking_startTime).format('LL')}</Text>
                        </View>
                        <View>
                            <Text style={styles.labelText}>Duration:</Text>
                            <Text style={styles.detailText}>{`${moment(details?.booking_startTime).format('LT')} - ${moment(details?.booking_endTime).format('LT')}`}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 }}>

                        <View>
                            <Text style={styles.labelText}>Vehicle Type:</Text>
                            <Text style={styles.detailText}>{details?.vehicleType}</Text>
                        </View>
                        <View>
                            <Text style={styles.labelText}>Status:</Text>
                            <View style={{ backgroundColor: details?.response === 'Pending' ? '#ffcc00' : details?.response === 'Rejected' ? '#cc3300' : '#99cc33', padding: 5, borderRadius: 10 }}>
                                <Text style={{ ...lightFONTS.body6, color: 'white' }}>{details?.response}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'flex-end', flexDirection: 'row' }}>
                        <Text style={{ ...lightFONTS.h4 }}>Total:</Text>
                        <Text style={{ ...lightFONTS.h4 }}> Rs. {details?.total_fee}</Text>
                    </View>
                </View>
                <View style={{ alignSelf: 'center' }}>
                    <QRCode value='ticket' size={170} />
                </View>
            </View>
        </View>
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