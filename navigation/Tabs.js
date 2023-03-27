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
import Icon from 'react-native-vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import MapBox from "../screens/Search/MapBox";
import { Theme } from "../constants/theme";
import MyParking from "../screens/Add/MyParking";

const Tab = createBottomTabNavigator()


const Tabs = () => {
    const dispatch = useDispatch();

    const [location, setLocation] = useState({});
    // console.log("🚀 ~ file: Tabs.js:25 ~ Tabs ~ location", location)

    const { isDarkMode } = useSelector(state => state.color)

    const { user } = useSelector(state => state.auth);

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
                    name="Home"
                    component={Home}
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
                    name="Search"
                    component={Map}
                    options={{
                        tabBarIcon: ({ size, focused }) => (
                            <Image
                                source={focused ? icons.map : icons.map_outline}
                                style={{
                                    width: size,
                                    height: size,
                                }}
                            />
                        )
                    }}
                />
                {
                    !user.role === 'user' &&
                    <Tab.Screen
                        name="MySpaces"
                        component={MyParking}
                        options={{
                            tabBarIcon: ({ size, focused }) => (
                                <Image
                                    source={focused ? icons.add : icons.add_outline}
                                    style={{
                                        width: size,
                                        height: size,
                                    }}
                                />
                            )
                        }}
                    />
                }
                <Tab.Screen
                    name="History"
                    component={History}
                    options={{
                        tabBarIcon: ({ size, focused }) => (
                            <Image
                                source={focused ? icons.history : icons.history_outline}
                                style={{
                                    width: size,
                                    height: size,
                                }}
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

export default Tabs;