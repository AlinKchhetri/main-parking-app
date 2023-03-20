import { View, Text, Image, TextInput, TouchableOpacity, Linking, Platform, StyleSheet, ToastAndroid } from 'react-native'
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

  const iosUrl = "itms-apps://apps.apple.com/US/app/id388497605"
  const androidUrl = "https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
  const googleAuthUrl = 'otpauth://totp/inerva?secret=FQ2SIXSKKY7CI6RUNBZXSRCNF5WWIRRTMZGE65KJNUSWY3KBNB6Q'


  const handleGetUser = () => {
    // dispatch(getUser(userID));
    // Linking.openURL("imepay://");
    Linking.openURL(`maps:0,0?q=label@27.753747841856804,85.31840097159147`);
    // Linking.openURL("instagram://user?_alinkc_=instagram");
    // Linking.openURL("esewa://");
  };

  const openGoogleAuth = () => {
    Linking.openURL(googleAuthUrl).catch(async () => {
      if (Platform.OS === "ios") {
        const supported = await Linking.canOpenURL(iosUrl)
        supported && await Linking.openURL(iosUrl)
      } else if (Platform.OS === "android") {
        const supported = await Linking.canOpenURL(androidUrl)
        supported && await Linking.openURL(androidUrl)
      }
    });
  }

  const qrcode = 'data:image/png;base64,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'



  return (
    <View style={{ flex: 1, paddingTop: 50, justifyContent: 'flex-start', backgroundColor: COLORS.white }}>
      {/* <TextInput style={styles.inputField} placeholder="ID" value={setUserID} clearButtonMode='while-editing' /> */}
      {/* <TouchableOpacity
        onPress={openGoogleAuth}
        style={styles.next}>
        <Text style={styles.buttonStyle}>Google Authenticator</Text>
      </TouchableOpacity>
      <Image source={{ uri: qrcode }} style={{
        width: 200, height: 200
      }} /> */}
      <QRCode value='otpauth://totp/QRtest?secret=KRXXON2PHJ3VEV33FY4WOSBPMFDFALCSKI6HUNZQGJUVMYS2LIWA' />
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