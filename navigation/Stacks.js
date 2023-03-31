import React, { useEffect, useState, useRef } from 'react'
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DarkTheme, DefaultTheme, useTheme } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../screens/Login/Login';
import Register from '../screens/Login/Register';
import { loadUser, registerToken } from '../redux/action';
import Profile from '../screens/Profile';
import TestNotification from '../screens/TestNotification';
import Tabs from './Tabs';
import CameraComponent from '../screens/Camera';
import ChangePassword from '../screens/Login/ChangePassword';
import Verify from '../screens/Login/Verify';
import ForgetPassword from '../screens/Login/ForgotPassword';
import ResetPassword from '../screens/Login/ResetPassword';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingScreen from '../components/LoadingScreen';
import { Theme, lightFONTS, COLORS } from '../constants';
import ParkingDetails from '../screens/Home/ParkingDetails';
import SignUp from '../screens/Login/SignUp';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerNavigation, { DrawerContent } from './Drawer';
import LoginScreen from '../screens/Login/LoginScreen';
import OnboardingScreen from '../screens/Login/Onboarding';
import Booking from '../screens/Booking/Booking';
import Add from '../screens/Add/Add';
import Messages from '../screens/Messages';
import BookingDetails from '../screens/Booking/BookingDetails';
import Payment from '../screens/Booking/Payment';
import ChangeRole from '../screens/Login/ChangeRole';
import ChoosePayment from '../screens/Booking/ChoosePayment';
import AdminTabs from './AdminTabs';

const Drawer = createDrawerNavigator();

const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#005fe4",
        card: "#C3C6C7",
        background: "#FFFF",
        notification: "#1987ff",
        text: "#000"
    }
}

const BlackTheme = {
    ...DarkTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#161616",
        background: "#000000",
        card: "#1C1C1EFF",
        notification: "#1987ff",
        text: "#FFFF"
    }
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const Stack = createStackNavigator();

export const LoginStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'onboarding'}
        >
            <Stack.Screen name="onboarding" component={OnboardingScreen} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen
                name="register"
                component={Register}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerBackTitleVisible: false,
                    headerBackImage: () => <Icon name='arrow-back-ios' size={25} style={{ marginLeft: 10 }} />,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen name="verify" component={Verify} options={{
                headerShown: true,
                headerTitle: '',
                headerBackTitleVisible: false,
                headerBackImage: () => <Icon name='arrow-back-ios' size={25} style={{ marginLeft: 10 }} />
            }} />
            <Stack.Screen name="signup" component={SignUp} options={{ headerShown: true, headerTitle: '', headerBackTitleVisible: false }} />
            <Stack.Screen name="forgotPassword" component={ForgetPassword} options={{
                headerShown: true,
                headerTitle: 'Reset Password',
                headerBackTitleVisible: false,
                headerBackImage: () => <Icon name='arrow-back-ios' size={25} style={{ marginLeft: 10 }} />
            }} />
            <Stack.Screen name="resetPassword" component={ResetPassword} options={{
                headerShown: true,
                headerTitle: 'Create New Password',
                headerBackTitleVisible: false,
                headerBackImage: () => <Icon name='arrow-back-ios' size={25} style={{ marginLeft: 10 }} />
            }} />
        </Stack.Navigator>
    );
}

export const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'home'}
        >
            <Stack.Screen name="home" component={Tabs} />
            <Stack.Screen name="book" component={Booking}
                options={{
                    headerShown: true,
                    headerTitle: 'Reserve Parking Details',
                    headerBackTitleVisible: false,
                    headerTitleStyle: { ...lightFONTS.h4 },
                    headerBackImage: () => <Icon name='arrow-back-ios' color={'#000'} size={25} style={{ marginLeft: 10 }} />
                }}
            />
            <Stack.Screen name="add" component={Add}
                options={{
                    headerShown: true,
                    headerTitle: 'Add New Space',
                    headerBackTitleVisible: false,
                    headerTitleStyle: { ...lightFONTS.h4 },
                    headerBackImage: () => <Icon name='arrow-back-ios' color={'#000'} size={25} style={{ marginLeft: 10 }} />,
                    presentation: 'modal'
                }}
            />
            <Stack.Screen name="test" component={TestNotification} />
            <Stack.Screen name="changePassword" component={ChangePassword} options={{ headerShown: true, headerTitle: 'Change Password', headerBackTitleVisible: false, headerTitleStyle: { ...lightFONTS.h3 } }} />
            <Stack.Screen name="verify" component={Verify} />
            <Stack.Screen name="parkingDetails" component={ParkingDetails}
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTransparent: true,
                    headerBackTitleVisible: false,
                    headerBackImage: () => <Icon name='arrow-back-ios' color={'#FFF'} size={25} style={{ marginLeft: 10 }} />
                }} />
            <Stack.Screen name="messages" component={Messages}
                options={{
                    headerShown: true,
                    headerTitle: 'Messages',
                    headerBackTitleVisible: false,
                    headerTitleStyle: { ...lightFONTS.h4 },
                    headerBackImage: () => <Icon name='arrow-back-ios' color={'#000'} size={25} style={{ marginLeft: 10 }} />
                }} />
            <Stack.Screen name="bookingDetails" component={BookingDetails}
                options={{
                    headerShown: true,
                    headerTitle: 'Booking Details',
                    headerBackTitleVisible: false,
                    headerTitleStyle: { ...lightFONTS.h4 },
                    headerBackImage: () => <Icon name='arrow-back-ios' color={'#000'} size={25} style={{ marginLeft: 10 }} />,
                }} />
            <Stack.Screen name="payment" component={Payment}
                options={{
                    headerShown: true,
                    headerTitle: 'Payment',
                    headerBackTitleVisible: false,
                    headerTitleStyle: { ...lightFONTS.h4 },
                    headerBackImage: () => <Icon name='arrow-back-ios' color={'#000'} size={25} style={{ marginLeft: 10 }} />,
                }} />
            <Stack.Screen name="choosePayment" component={ChoosePayment}
                options={{
                    headerShown: true,
                    headerTitle: 'Payment Options',
                    headerBackTitleVisible: false,
                    headerTitleStyle: { ...lightFONTS.h4 },
                    headerBackImage: () => <Icon name='arrow-back-ios' color={'#000'} size={25} style={{ marginLeft: 10 }} />,
                }} />
            <Stack.Screen name="editProfile" component={Profile} options={{ headerShown: true, headerTitle: 'Update Profile', headerBackTitleVisible: false, headerTitleStyle: { ...lightFONTS.h3 } }} />
        </Stack.Navigator>
    );
}

export const MainStack = ({ user }) => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={Tabs} />
            <Drawer.Screen name="SupportScreen" component={Profile} />
        </Drawer.Navigator>
    )
}



const Stacks = () => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    // console.log("🚀 ~ file: Stacks.js:139 ~ Stacks ~ isAuthenticated", isAuthenticated, user)

    const [authStatus, setAuthStatus] = useState(false);

    const { isDarkMode } = useSelector(state => state.color);

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const { colors } = useTheme();


    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            console.log("🚀 ~ file: Stacks.js:233 ~ registerForPushNotificationsAsync ~ token:", token)
            setExpoPushToken(token);
            dispatch(registerToken(token));
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);



    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);
    return (
        <>
            {loading ? <LoadingScreen /> :
                <NavigationContainer independent={true}>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                            // headerLeft: null,
                            // gestureEnabled: false,
                        }}
                        initialRouteName={
                            isAuthenticated ?
                                user && user.verified ?
                                    user.role === 'admin' ?
                                        'AdminTabs' :
                                        'DrawerStack'
                                    : 'verify'
                                :
                                'LoginStack'
                        }
                    >
                        <Stack.Screen name="LoginStack" component={LoginStack} />
                        <Stack.Screen name="AdminTabs" component={AdminTabs} />
                        <Stack.Screen name="DrawerStack" component={DrawerNavigation} />
                        <Stack.Screen name="HomeStack" component={HomeStack} />
                        <Stack.Screen name="verify" component={Verify} options={{
                            headerShown: true,
                            headerTitle: '',
                            headerBackTitleVisible: false,
                            headerBackImage: () => <Icon name='arrow-back-ios' size={25} style={{ marginLeft: 10 }} />
                        }} />
                        <Stack.Screen name="camera" component={CameraComponent} />
                    </Stack.Navigator>
                </NavigationContainer>}
        </>
    )
}

export default Stacks