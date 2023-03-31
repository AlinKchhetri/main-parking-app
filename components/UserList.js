import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ActionSheetIOS } from 'react-native'
import React, { useState } from 'react'
import { COLORS, icons, SIZES, lightFONTS } from '../constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-ui-lib'

const UserList = ({ item }) => {

    const navigation = useNavigation();

    return (
        <View
            style={styles.card}>
            <Avatar
                size={70}
                animate={true}
                name={item?.name}
                useAutoColors
                source={{ uri: item?.avatarUrl?.url }}
                autoColorsConfig={item?.name}
            />
            <View style={styles.textContent}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        ...lightFONTS.h5,
                        color: '#1987ff'
                    }}>{item?.name}</Text>
                    {
                        item?.role === 'admin' &&
                        < EntypoIcon
                            name='shield'
                            size={20}
                            color="#FFC664"
                            style={{
                                marginLeft: 5
                            }}
                        />
                    }
                    {
                        item?.verified &&
                        <Icon
                            name='verified'
                            size={20}
                            color='#99cc33'
                            style={{
                                marginHorizontal: 5
                            }}
                        />
                    }

                </View>

                <Text style={styles.cardtitle}>{item?.email}</Text>

                <Text style={{ ...lightFONTS.body4, color: '#707C80', paddingRight: 30 }}>{item?.phoneNumber}</Text>
            </View>
        </View >
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
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 110,
        marginVertical: 5,
        width: Dimensions.get('window').width - 30,
        overflow: "hidden",
        flexDirection: 'row',
        alignItems: 'center'
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
        padding: 10
    },
    cardtitle: {
        ...lightFONTS.h4,
        fontSize: 13,
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

export default UserList