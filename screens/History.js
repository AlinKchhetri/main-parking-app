import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, SIZES, lightFONTS, darkFONTS } from '../constants'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../redux/action'
import QRCode from 'react-native-qrcode-svg'
import ParkingHistory from '../components/ParkingHistory'



const History = ({ route }) => {

  const dispatch = useDispatch();
  const { parkingSpace } = useSelector(state => state.parking);

  const [userID, setUserID] = useState('hello');


  const handleGetUser = () => {
    // dispatch(getUser(userID));
    // Linking.openURL("imepay://");
    Linking.openURL(`maps:0,0?q=label@27.753747841856804,85.31840097159147`);
    // Linking.openURL("instagram://user?_alinkc_=instagram");
    // Linking.openURL("esewa://");
  };


  return (
    <View style={{ flex: 1, paddingTop: 50, justifyContent: 'flex-start', backgroundColor: COLORS.white }}>
      {/* <TextInput style={styles.inputField} placeholder="ID" value={setUserID} clearButtonMode='while-editing' />
      <TouchableOpacity
        onPress={handleGetUser}
        style={styles.next}>
        <Text style={styles.buttonStyle}>Add</Text>
      </TouchableOpacity>
      <QRCode value='hfeifnienf' /> */}
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
    </View>
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