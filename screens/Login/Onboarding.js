import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { images, FONTS } from '../../constants';

const OnboardingScreen = ({ navigation }) => {
    return (
        <View style={{
            flex: 1
        }}>
            <Onboarding
                onSkip={() => navigation.navigate('login')}
                onDone={() => navigation.navigate('login')}
                titleStyles={{
                    ...FONTS.h3,
                    marginHorizontal: 10
                }}
                subTitleStyles={{
                    ...FONTS.body3,
                    marginHorizontal: 10,
                    color: '#707C80'
                }}
                pages={[
                    {
                        // backgroundColor: '#005df4ff',
                        backgroundColor: '#FAFAFA',
                        image: <Image source={images.onboarding} style={{ height: 350, width: 400 }} />,
                        title: 'Welcome to ParkPin',
                        subtitle: 'The best parking app that provides convenient access to parking spaces all over the city',
                    },
                    {
                        backgroundColor: '#FAFAFA',
                        image: <Image source={images.onboarding1} style={{ height: 305, width: 350, marginBottom: 40 }} />,
                        title: 'Search for available parking',
                        subtitle: 'Find and book your perfect parking spot nearest to your location',
                    },
                    {
                        backgroundColor: '#FAFAFA',
                        image: <Image source={images.onboarding2} style={{ height: 350, width: 350 }} />,
                        title: 'Save time and money',
                        subtitle: 'ParkPin provides hassle-free booking experience completed in minutes ',
                    },
                    {
                        backgroundColor: '#FAFAFA',
                        image: <Image source={images.onboarding3} style={{ height: 330, width: 350 }} />,
                        title: 'Easy payment options',
                        subtitle: 'ParkPin provides multiple payment options for customers to pay for the parking spaces',
                    },
                ]}
            />
        </View>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({})