import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES, lightFONTS } from '../constants'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { respond } from '../redux/action';
import moment from 'moment';

const RequestCard = (props) => {
    const { item } = props;
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate('HomeStack', {
                    screen: 'bookingDetails',
                    params: { booking: item }
                })}
                style={styles.card}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <MaterialIcon name='circle' size={8} color={item.response === 'Pending' ? '#ffcc00' : item.response === 'Rejected' ? '#cc3300' : '#99cc33'} style={{ marginHorizontal: 10, marginTop: 5 }} />
                    <View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{
                                ...lightFONTS.h5,
                                marginRight: 5
                            }}>Booking Request</Text>
                            <View style={{ backgroundColor: item?.response === 'Pending' ? '#ffcc00' : item.response === 'Rejected' ? '#cc3300' : '#99cc33', padding: 5, borderRadius: SIZES.padding }}>
                                <Text style={{ ...lightFONTS.body6, color: 'white' }}>{item?.response}</Text>
                            </View>
                        </View>
                        {
                            item?.ownerDetails?._id == user._id ?
                                <Text style={styles.cardtitle}>You have a new booking request for your parking space</Text>
                                :
                                <Text style={styles.cardtitle}>{`Your booking request has been ${item?.response === 'Pending' ? 'sent' : item.response === 'Rejected' ? 'rejected' : 'accepted'}`}</Text>
                        }
                        <Text style={{ ...lightFONTS.body5, color: '#707C80' }}>{moment(item?.bookedAt).calendar()}</Text>
                        {
                            item?.ownerDetails?._id == user._id && item?.response == 'Pending' &&
                            (
                                <View View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                                    <TouchableOpacity
                                        onPress={() => dispatch(respond(item?._id, 'Accepted'))}
                                        style={{ backgroundColor: '#70db83', padding: SIZES.padding, borderRadius: SIZES.padding }}>
                                        <Text style={{ ...lightFONTS.body4, color: 'white' }}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => dispatch(respond(item?._id, 'Rejected'))}
                                        style={{ backgroundColor: COLORS.darkgray, padding: SIZES.padding, borderRadius: SIZES.padding, marginLeft: 10 }}>
                                        <Text style={{ ...lightFONTS.body4, color: 'white' }}>Decline</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </View>
                </View>
            </TouchableOpacity >
            <View style={{ height: 0.3, width: '90%', alignSelf: 'center', backgroundColor: 'grey' }} />
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        elevation: 2,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        width: Dimensions.get('window').width,
        overflow: "hidden",
        flexDirection: 'column',
        padding: 10
    },
    cardImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "center",
        backgroundColor: '#707C80',
        borderRadius: 10,
        marginRight: 5
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        ...lightFONTS.h4,
        fontSize: 12,
        color: '#707C80'
    },
    cardDescription: {
        ...lightFONTS.h6,
        color: COLORS.blue,
        fontSize: 10
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: 'center',
        marginTop: 5
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF'
    }

})

export default RequestCard