import { ScrollView, SafeAreaView, StyleSheet, Image, Text, View, TouchableOpacity, FlatList, StatusBar, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, SIZES, lightFONTS, darkFONTS, icons, images } from '../../constants'
import { Avatar, Card } from 'react-native-ui-lib'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux'
import { getAllParking } from '../../redux/action'
import ParkingCard from '../../components/ParkingCard'
import axios from 'axios'
import TestNotification from '../TestNotification'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import ParkingHistory from '../../components/ParkingHistory';


const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { locationValue } = useSelector(state => state.location);
    const { parkingSpace, error, message } = useSelector(state => state.parking);

    const [locationName, setLocationName] = useState();
    // console.log("🚀 ~ file: Home.js:19 ~ Home ~ locationName", locationName)

    // console.log("🚀 ~ file: Home.js:14 ~ Home ~ location", parkingSpace)

    useEffect(() => {
        dispatch(getAllParking());
        if (locationValue) {
            // fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=27.756028&lon=85.321436`)
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locationValue.coords.latitude}&lon=${locationValue.coords.longitude}`)
                .then((response) => response.text())
                .then((result) => {
                    console.log("🚀 ~ file: Home.js:29 ~ .then ~ result", result)
                    console.log("🚀 ~ file: Home.js:29 ~ .then ~ result", Object.values(JSON.parse(result).address)[0]);
                    const location_name = result.display_name
                    setLocationName(JSON.parse(result).display_name.split(','))
                })
                .catch((error) => console.log(error));
        }
    }, [user]);


    useEffect(() => {
        if (error) {
            alert(error);
            dispatch({ type: "clearError" });
        }
        if (message) {
            alert(message);
            dispatch({ type: "clearMessage" });
        }
    }, [alert, error, message, dispatch])


    const AvailableParking = (props) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('parkingDetails', { space: props.space })} style={{ flexDirection: 'row', padding: SIZES.padding, margin: SIZES.padding2, justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.lightGray, width: '80%', height: 60 }}>
                <Image resizeMode='contain' source={icons.setMarker} style={{ width: 50, height: 50 }} />
                <Text>{props.rate}</Text>
            </TouchableOpacity>
        );
    };

    const renderItem = (item) => {
        return (
            <TouchableOpacity key={item._id} onPress={() => navigation.navigate('parkingDetails', { space: item })}>
                <ParkingCard rate={item.rate} />
            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.homeHeader}>
                <Icon
                    name='ios-menu-outline'
                    size={30}
                    onPress={() => navigation.openDrawer()}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Icon
                        name='ios-search-outline'
                        size={25}
                        onPress={() => navigation.navigate('Search')}
                    />
                    <TouchableOpacity style={{
                        marginLeft: 20
                    }} onPress={() => navigation.navigate('MyProfile')}>
                        <Avatar
                            size={50}
                            animate={true}
                            name={user.name}
                            useAutoColors
                            source={{ uri: user.avatarUrl.url }}
                            autoColorsConfig={user.name}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{
                marginBottom: 160
            }}>
                <Text style={{
                    ...lightFONTS.h3,
                    marginHorizontal: 20,
                    marginBottom: 10,
                }}>Featured</Text>
                <FlatList
                    style={{
                        paddingLeft: SIZES.padding
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={parkingSpace}
                    renderItem={({ item }) => {
                        return (
                            <ParkingCard item={item} />
                        )
                    }}
                    keyExtractor={item => item._id}
                />
                <Text style={{
                    ...lightFONTS.h3,
                    marginHorizontal: 20,
                    marginVertical: 10,
                }}>Parking Spaces near you</Text>
                <FlatList
                    style={{
                        paddingLeft: SIZES.padding
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={parkingSpace}
                    renderItem={({ item }) => {
                        return (
                            <ParkingCard item={item} />
                        )
                    }}
                    keyExtractor={item => item._id}
                />
                <Text style={{
                    ...lightFONTS.h3,
                    marginHorizontal: 20,
                    marginVertical: 10,
                }}>Recent Parking History</Text>
                <View style={{
                    marginHorizontal: SIZES.padding
                }}>
                    {
                        parkingSpace?.map((item, index) => <ParkingHistory key={item._id} item={item} />)
                    }
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Home

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
        height: 270,
        width: Dimensions.get('window').width * 0.5,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
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
    signIn: {
        width: '100%',
        height: 40,
        padding: 5,
        backgroundColor: COLORS.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3
    },
    textSign: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FFF'
    }

})