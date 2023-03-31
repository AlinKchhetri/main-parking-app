import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES, lightFONTS, darkFONTS, icons, images } from '../constants'
import ParkingList from './ParkingList';
import Icon from 'react-native-vector-icons/Octicons'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native'

const BookingHistory = ({ item }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('HomeStack', {
                screen: 'bookingDetails',
                params: { booking: item }
            })}
        >
            <View style={{
                justifyContent: 'center',
                // marginHorizontal: 15,
                marginVertical: 10,
                elevation: 2,
                backgroundColor: "#FFF",
                borderRadius: 5,
                shadowColor: "#000",
                shadowRadius: 5,
                shadowOpacity: 0.3,
                shadowOffset: { x: 2, y: -2 },
                overflow: "hidden",
                flexDirection: 'column',
            }}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginHorizontal: 20,
                    marginTop: 15,
                    marginBottom: 10,
                }}>
                    <Text style={{
                        ...lightFONTS.h5
                    }}>{`#${item?._id.substring(-1, 6)} - ${item.parkingSpaceDetails.locationName?.split(',')[0]}`}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginTop: 5
                    }}>
                        <View style={{ backgroundColor: item?.response === 'Pending' ? '#ffcc00' : item?.response === 'Rejected' ? '#cc3300' : '#99cc33', padding: 5, borderRadius: SIZES.padding, marginRight: 5 }}>
                            <Text style={{ ...lightFONTS.body6, color: 'white' }}>{item?.response}</Text>
                        </View>
                        <View style={{ backgroundColor: COLORS.darkgray, padding: 5, borderRadius: SIZES.padding }}>
                            {/* <View style={{ backgroundColor: item?.response === 'Pending' ? '#ffcc00' : item?.response === 'Rejected' ? '#cc3300' : '#99cc33', padding: 5, borderRadius: SIZES.padding }}> */}
                            <Text style={{ ...lightFONTS.body6, color: 'white' }}>Unpaid</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginHorizontal: 20
                }}>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <Text style={{
                            ...lightFONTS.h5,
                            color: COLORS.grey,
                            fontSize: 14
                        }}>Starting Time</Text>
                        <Text style={{ ...lightFONTS.body3, color: '#1987ff' }}>{moment(item?.booking_startTime).format('LT')}</Text>
                    </View>
                    {/* <Icon
                    name='dash'
                    size={25}
                    color='#707C80'
                    /> */}
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <Text style={{
                            ...lightFONTS.h5,
                            color: COLORS.grey,
                            fontSize: 14
                        }}>Ending Time</Text>
                        <Text style={{ ...lightFONTS.body3, color: '#1987ff' }}>{moment(item?.booking_endTime).format('LT')}</Text>
                    </View>
                </View>
                <Text style={{
                    ...lightFONTS.h5,
                    marginHorizontal: 20,
                    marginTop: 10
                }}>Parking Space Details</Text>
                <ParkingList item={item.parkingSpaceDetails} />
            </View>
        </TouchableOpacity>
    )
}

export default BookingHistory

const styles = StyleSheet.create({})