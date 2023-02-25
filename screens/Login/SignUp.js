import { SafeAreaView, View, Platform, StatusBar, Image, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { COLORS, icons, SIZES } from "../../constants"
import * as LocalAuthentication from 'expo-local-authentication'
import { useEffect, useState } from 'react';

const Tab = createMaterialTopTabNavigator();

const SignUp = () => {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    });

    const handleBiometricAuth = async () => {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        console.log("🚀 ~ file: SignUp.js:21 ~ handleBiometricAuth ~ savedBiometrics", savedBiometrics);
    }

    const onAuthentication = async () => {
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
        });
        console.log("🚀 ~ file: SignUp.js:26 ~ onAuthentication ~ result", result)
    }

    function SignUp1() {
        return (
            <>
                <Text> {isBiometricSupported ? 'Your device is compatible with Biometrics'
                    : 'Face or Fingerprint scanner is available on this device'}
                </Text>
                <Text onPress={handleBiometricAuth}>Check</Text>
                <Text onPress={onAuthentication}>CheckMporere</Text>
            </>
        )
    }
    function SignUp2() {
        return (
            <Text>Sign Up 2</Text>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: '#fff',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}>
            <Tab.Navigator initialRouteName='Add'>
                <Tab.Screen name="Add" component={SignUp1} options={{
                    title: 'Add'
                }} />
                <Tab.Screen name="My Parking" component={SignUp2} options={{
                    title: 'My Parking Spaces'
                }} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

export default SignUp;
