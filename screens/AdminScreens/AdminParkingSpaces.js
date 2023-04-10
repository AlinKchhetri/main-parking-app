import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { COLORS, SIZES, FONTS, darkFONTS, icons, images } from '../../constants'
import { useSelector } from 'react-redux'
import ParkingList from '../../components/ParkingList';

const AdminParkingSpaces = () => {

  const { parkingSpace } = useSelector(state => state.parking)
  console.log("🚀 ~ file: AdminParkingSpaces.js:8 ~ AdminParkingSpaces ~ parkingSpace:", parkingSpace)
  return (
    <SafeAreaView style={{
      flex: 1,
      margin: 10
    }}>
      <Text style={{ ...FONTS.h3, margin: 15, marginTop: 30 }}>Parking Spaces</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          marginBottom: 80
        }}
      >
        {
          parkingSpace?.map((item) => <ParkingList key={item._id} item={item} />)
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default AdminParkingSpaces

const styles = StyleSheet.create({})