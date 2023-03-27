import { ScrollView, SafeAreaView, StyleSheet, RefreshControl, Image, Text, View, TouchableOpacity, FlatList, StatusBar, Dimensions, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import Swiper from 'react-native-swiper';
import { COLORS, SIZES, lightFONTS, darkFONTS, icons, images } from '../../constants'
import { Avatar, Card } from 'react-native-ui-lib'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux'
import { getAllParking, getMyBookings } from '../../redux/action'
import ParkingCard from '../../components/ParkingCard'
import axios from 'axios'
import TestNotification from '../TestNotification'
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';
import ParkingHistory from '../../components/ParkingHistory';
import moment from 'moment';

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { locationValue } = useSelector(state => state.location);
    const { parkingSpace, error, message } = useSelector(state => state.parking);
    const { bookingDetails } = useSelector(state => state.booking);

    const [locationName, setLocationName] = useState();
    const [refreshing, setRefreshing] = useState(false);
    // console.log("🚀 ~ file: Home.js:19 ~ Home ~ locationName", locationName)

    // console.log("🚀 ~ file: Home.js:14 ~ Home ~ location", parkingSpace)

    useEffect(() => {
        dispatch(getAllParking());
        dispatch(getMyBookings(user._id))
        if (locationValue) {
            // fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=27.756028&lon=85.321436`)
            fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locationValue.coords.latitude}&lon=${locationValue.coords.longitude}`)
                .then((response) => response.text())
                .then((result) => {
                    // console.log("🚀 ~ file: Home.js:29 ~ .then ~ result", result)
                    // console.log("🚀 ~ file: Home.js:29 ~ .then ~ result", Object.values(JSON.parse(result).address)[0]);
                    const location_name = result.display_name
                    setLocationName(JSON.parse(result).display_name.split(','))
                })
                .catch((error) => console.log(error));
        }
    }, [user]);

    const handleRefresh = () => {
        setRefreshing(true);
        dispatch(getAllParking());
        dispatch(getMyBookings(user._id));
        setRefreshing(false);
    }

    // const ongoingBookings = bookingDetails?.bookingDetails
    const ongoingBookings = bookingDetails?.bookingDetails.filter(b => b.response !== 'Rejected').sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
    // console.log("🚀 ~ file: Home.js:49 ~ Home ~ ongoingBookings:", ongoingBookings)

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
                    <MaterialIcon
                        name='message-outline'
                        size={25}
                        onPress={() => navigation.navigate('HomeStack', {
                            screen: 'messages'
                        })}
                    />
                    {/* <Icon
                        name='ios-notifications-outline'
                        size={25}
                        onPress={() => navigation.navigate('Search')}
                    /> */}
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
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                style={{
                    marginBottom: 140
                }}>
                <View style={styles.sliderContainer}>
                    <Swiper
                        autoplay
                        horizontal={false}
                        height={150}
                        activeDotColor="#0054fdff">
                        <View style={styles.slide}>
                            <Image
                                source={images.offerBanner}
                                resizeMode="cover"
                                style={styles.sliderImage}
                            />
                        </View>
                        <View style={styles.slide}>
                            <Image
                                source={images.offerBanner}
                                resizeMode="cover"
                                style={styles.sliderImage}
                            />
                        </View>
                    </Swiper>
                </View>

                {
                    (ongoingBookings?.length > 0 && moment().isBefore(ongoingBookings[0]?.booking_endTime)) &&
                    <View>
                        <Text style={{
                            ...lightFONTS.h4,
                            marginHorizontal: 20,
                            // marginBottom: 10,
                        }}>Ongoing Bookings</Text>
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            marginHorizontal: 15,
                            marginVertical: 10,
                            borderRadius: 15
                        }}>
                            {/* <Image source={require('../../assets/images/progress.gif')} style={{ height: 6, width: Dimensions.get('window').width - 30, alignSelf: 'center', marginVertical: 15 }} /> */}
                            <Text style={{
                                ...lightFONTS.h5,
                                marginHorizontal: 20,
                                marginTop: 15,
                                marginBottom: 10,
                                color: '#0054fdff'
                            }}>ID: {ongoingBookings[0]?._id}</Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginHorizontal: 20
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                }}>
                                    <Text style={{
                                        ...lightFONTS.h5
                                    }}>Kathmandu, Nepal</Text>
                                    <Text style={{ ...lightFONTS.body3 }}>{moment(ongoingBookings[0]?.booking_startTime).format('LL')}</Text>
                                </View>
                                <View>
                                    <Text style={{ ...lightFONTS.body3 }}>{`${moment(ongoingBookings[0]?.booking_startTime).format('LT')} - ${moment(ongoingBookings[0]?.booking_endTime).format('LT')}`}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('HomeStack', {
                                    screen: 'bookingDetails',
                                    params: { booking: ongoingBookings[0] }
                                })}
                                style={styles.card}>
                                <Image
                                    // source={{ uri: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80' }}
                                    source={{ uri: ongoingBookings[0]?.parkingSpaceDetails?.image.url }}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={2} style={styles.cardtitle}>Kathmandu, Nepal</Text>

                                    <View style={{ width: 70, backgroundColor: ongoingBookings[0]?.response === 'Pending' ? '#ffcc00' : ongoingBookings[0]?.response === 'Rejected' ? '#cc3300' : '#99cc33', padding: 5, borderRadius: SIZES.padding }}>
                                        <Text style={{ ...lightFONTS.body6, color: 'white' }}>{ongoingBookings[0]?.response}</Text>
                                    </View>
                                    {/* <Text style={{
                                        ...lightFONTS.h3,
                                        color: '#0054fdff',
                                    }}>Rs. {(Math.round(ongoingBookings[0]?.parkingSpaceDetails?.two_wheeler?.rate * Math.round((ongoingBookings[0]?.booking_endtime.getTime() - ongoingBookings[0]?.booking_starttime.getTime()) / (1000 * 60 * 60))))
                                        }</Text> */}
                                    {/* {} */}
                                </View>
                            </TouchableOpacity>
                            {/* <ParkingHistory item={item.parkingSpaceDetails} />
                            {
                                ongoingBookings?.map((item, index) => {
                                    return (
                                        // <View key={item._id}>
                                        <ParkingHistory item={item.parkingSpaceDetails} />
                                    );
                                })
                            } */}
                        </View>
                    </View>
                }

                <Text style={{
                    ...lightFONTS.h4,
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
                            <ParkingCard item={item} isMapScreen={false} />
                        )
                    }}
                    keyExtractor={item => item._id}
                />
                <Text style={{
                    ...lightFONTS.h4,
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
                            <ParkingCard item={item} isMapScreen={false} />
                        )
                    }}
                    keyExtractor={item => item._id}
                />
                {/* <Text style={{
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
                </View> */}
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
        borderRadius: 5,
        marginHorizontal: 10,
        // shadowColor: "#000",
        // shadowRadius: 5,
        // shadowOpacity: 0.3,
        // shadowOffset: { x: 2, y: -2 },
        height: 100,
        width: '95%',
        marginVertical: 15,
        flexDirection: 'row',
    },
    cardImage: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "center",
        backgroundColor: '#707C80',
        borderRadius: 10
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
    },
    sliderContainer: {
        height: 150,
        width: '90%',
        marginTop: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 8,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 8,
    },

})