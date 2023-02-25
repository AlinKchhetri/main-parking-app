import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES, lightFONTS } from '../constants'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const ParkingCard = ({ item }) => {

    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('HomeStack', {
                screen: 'parkingDetails',
                params: { space: item },
            })}
            style={styles.card}>
            <Image
                // source={{ uri: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80' }}
                source={{ uri: item?.image.url}}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <View style={styles.textContent}>
                <Text style={{
                    ...lightFONTS.h4,
                    color: '#1987ff'
                }}>Rs. {item?.two_wheeler && item?.two_wheeler.rate}<Text style={{
                    ...lightFONTS.body3,
                    color: '#707C80'
                }}>/hr</Text></Text>
                <Text numberOfLines={2} style={styles.cardtitle}>Paid Parking available</Text>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <MaterialIcon
                        name='bike'
                        size={20}
                        style={{
                            marginHorizontal: 20
                        }}
                    />
                    <MaterialIcon
                        name='car'
                        size={23}
                    />
                </View>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    homeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding2
    },
    headerText: {
        ...lightFONTS.h2,
        marginHorizontal: SIZES.padding2,
        // top: 10,
    },
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 200,
        width: Dimensions.get('window').width * 0.65,
        overflow: "hidden",
        flexDirection: 'column',
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        backgroundColor: '#707C80',
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 13,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 13,
        fontWeight: "bold",
        color: COLORS.blue,
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
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

export default ParkingCard