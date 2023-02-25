import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { COLORS, icons, SIZES } from "../constants"
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Tabs from './Tabs';
import { Avatar } from 'react-native-ui-lib';
import { Main, Home, MyProfile, History, Map, Shop, Add } from "../screens"
import AddTabs from "../screens/Add/AddTabs";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/action';


const DrawerNav = createDrawerNavigator();


function DrawerContent(props) {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate('MyProfile')}
                            style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar
                                size={50}
                                animate={true}
                                name={user.name}
                                useAutoColors
                                source={{ uri: user.avatarUrl.url }}
                                autoColorsConfig={user.name}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>{user.name}</Title>
                                <Caption style={styles.caption}>{user.email}</Caption>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-filled"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="map"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Map"
                            onPress={() => { props.navigation.navigate('Search') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="add-box"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Add"
                            onPress={() => { props.navigation.navigate('AddTabs') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="history"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="History"
                            onPress={() => { props.navigation.navigate('History') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="person"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="My Profile"
                            onPress={() => { props.navigation.navigate('MyProfile') }}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="logout"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Log Out"
                    onPress={() => { dispatch(logout()) }}
                />
            </Drawer.Section>
        </View>
    );
}

export default function DrawerNavigation() {
    return (
        <DrawerNav.Navigator
            drawerContent={props => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false
            }}
        >
            <DrawerNav.Screen name="HomeDrawer" component={Tabs} />
        </DrawerNav.Navigator>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});