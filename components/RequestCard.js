import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES, lightFONTS } from '../constants'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const RequestCard = () => {

    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('HomeStack', {
                screen: 'parkingDetails'
            })}
            style={styles.card}>
            <Text style={{
                ...lightFONTS.h5
            }}>Booking Request</Text>
            <Text style={styles.cardtitle}>You have a new booking request for your parking space</Text>
            <TouchableOpacity>
                <Text>Accept</Text>
            </TouchableOpacity>
        </TouchableOpacity>
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
        height: 100,
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