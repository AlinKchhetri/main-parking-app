import React, { useState, useEffect } from "react";
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as Location from 'expo-location';
import { Main, Home, MyProfile, History, Map, Shop, Add } from "../screens"
import AddTabs from "../screens/Add/AddTabs";
import { COLORS, icons, SIZES } from "../constants"
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import MapBox from "../screens/Search/MapBox";
import { Theme } from "../constants/theme";
import MyParking from "../screens/Add/MyParking";
import AdminHome from "../screens/AdminScreens/AdminHome";
import AdminUsers from "../screens/AdminScreens/AdminUsers";
import AdminParkingSpaces from "../screens/AdminScreens/AdminParkingSpaces";

const Tab = createBottomTabNavigator()


const AdminTabs = () => {
    const dispatch = useDispatch();

    const [location, setLocation] = useState({});
    // console.log("🚀 ~ file: Tabs.js:25 ~ Tabs ~ location", location)

    const { isDarkMode } = useSelector(state => state.color)

    const { user } = useSelector(state => state.auth);
    // console.log("🚀 ~ file: Tabs.js:31 ~ Tabs ~ user:", user)

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            dispatch({ type: 'getLocation', payload: location });
        })();

        if (isDarkMode == false) {

            dispatch({ type: 'setPrimaryColor', payload: '#000' })
        }
        else {

            dispatch({ type: 'setPrimaryColor', payload: '#66D59A' });
        }


    }, []);


    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle: [{
                        display: "flex",
                        position: 'absolute',
                        width: SIZES.width,
                        height: (SIZES.height * 80) / SIZES.height,
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundColor: 'black',
                        elevation: 0
                    },
                        null]
                }}>
                <Tab.Screen
                    name="AdminHome"
                    component={AdminHome}
                    options={{
                        tabBarIcon: ({ size, focused }) => (
                            <Image
                                source={focused ? icons.home : icons.home_outline}
                                style={{
                                    width: size,
                                    height: size,
                                }}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="AdminUsers"
                    component={AdminUsers}
                    options={{
                        tabBarIcon: ({ size, focused }) => (
                            <Ionicon
                                name={focused ? 'ios-people' : 'ios-people-outline'}
                                size={28}
                                color={'#fff'}
                            />
                        )
                    }}
                />
                <Tab.Screen
                    name="AdminParkingSpaces"
                    component={AdminParkingSpaces}
                    options={{
                        tabBarIcon: ({ size, focused }) => (
                            <MaterialIcon
                                name={focused ? 'newspaper-variant' : 'newspaper-variant-outline'}
                                size={28}
                                color={'#fff'}
                            />
                        )
                    }}
                />

                <Tab.Screen
                    name="MyProfile"
                    component={MyProfile}
                    options={{
                        tabBarIcon: ({ size, focused }) => (
                            <Image
                                source={focused ? icons.profile : icons.profile_outline}
                                style={{
                                    width: size,
                                    height: size,
                                }}
                            />
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default AdminTabs;