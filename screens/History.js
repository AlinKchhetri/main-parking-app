import { SafeAreaView, ScrollView, View, Text, Image, TextInput, TouchableOpacity, Linking, Platform, StyleSheet, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, lightFONTS, darkFONTS } from '../constants'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { getMyBookings } from '../redux/action'
import QRCode from 'react-native-qrcode-svg'
import ParkingHistory from '../components/ParkingHistory'
import BookingHistory from '../components/BookingHistory'



const History = ({ route }) => {

  const dispatch = useDispatch();
  const { bookingDetails } = useSelector(state => state.booking);
  console.log("🚀 ~ file: History.js:17 ~ History ~ bookingDetails:", bookingDetails)

  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getMyBookings(user._id));
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50, justifyContent: 'flex-start' }}>
      <Text style={{ ...lightFONTS.h3, margin: 20 }}>Booking History</Text>

      <ScrollView style={{
        flex: 1,
        marginHorizontal: SIZES.padding
      }}>
        {
          bookingDetails?.bookingDetails?.map((item, index) => <BookingHistory key={item._id} item={item} />)
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#FAFAFA',
    margin: SIZES.padding2,
    height: 50,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: SIZES.base,
    borderRadius: SIZES.padding,
  },
  next: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: SIZES.padding,
    backgroundColor: COLORS.green,
    width: '80%',
    height: 55,
    borderRadius: SIZES.padding * 2,
  },
});

export default History