import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { COLORS, icons, SIZES, FONTS } from '../constants'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'

const ParkingCard = ({ item, isMapScreen }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('HomeStack', {
                screen: 'parkingDetails',
                params: { space: item },
            })}
            style={{
                elevation: 2,
                backgroundColor: "#FFF",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                marginHorizontal: 10,
                shadowColor: "#000",
                shadowRadius: 5,
                shadowOpacity: 0.3,
                shadowOffset: { x: 2, y: -2 },
                height: 220,
                width: isMapScreen ? Dimensions.get('window').width * 0.8 : Dimensions.get('window').width * 0.5,
                overflow: "hidden",
                flexDirection: 'column',
            }}
        >
            <Image
                source={{ uri: item?.image.url }}
                style={styles.cardImage}
                resizeMode="cover"
            />
            <View style={styles.textContent}>
                <Text style={{
                    ...FONTS.h5,
                    color: '#1987ff'
                }}>Rs. {item?.two_wheeler && item?.two_wheeler.rate}<Text style={{
                    ...FONTS.body5,
                    color: '#707C80'
                }}>/hr</Text></Text>
                {/* <Text style={styles.cardtitle}>{item?.locationName?.split(',')[0]}</Text> */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <MaterialIcon
                        name='map-marker'
                        size={17}
                        color='black'
                        style={{
                            opacity: 0.5,
                        }}
                    />
                    <Text numberOfLines={1} style={{ ...FONTS.body5, color: '#707C80' }}>{item?.locationName}</Text>
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: COLORS.gray,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 8,
                        marginRight: 5
                    }}>
                        <MaterialIcon
                            name='bike'
                            size={17}
                            color='black'
                            style={{
                                opacity: 0.5,
                            }}
                        />
                        <Text style={{
                            ...FONTS.body5,
                            opacity: 0.5,
                            marginLeft: 5
                        }}>{item?.two_wheeler?.no_slot} slot</Text>
                    </View>
                    {
                        item?.four_wheeler?.no_slot > 0 &&
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: COLORS.gray,
                            paddingHorizontal: 8,
                            paddingVertical: 2,
                            borderRadius: 8,
                            marginRight: 5
                        }}>
                            <MaterialIcon
                                name='car'
                                size={20}
                                color='black'
                                style={{
                                    opacity: 0.5,
                                }}
                            />
                            <Text style={{
                                ...FONTS.body5,
                                opacity: 0.5,
                                marginLeft: 5
                            }}>{item?.four_wheeler?.no_slot} slot</Text>
                        </View>
                    }
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
        ...FONTS.h2,
        marginHorizontal: SIZES.padding2,
        // top: 10,
    },
    card: {
        // padding: 10,
        // flex: 1,
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
        width: Dimensions.get('window').width * 0.45,
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
        ...FONTS.h4,
        fontSize: 12,
        color: '#707C80'
    },
    cardDescription: {
        ...FONTS.h6,
        color: COLORS.blue,
        fontSize: 10
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