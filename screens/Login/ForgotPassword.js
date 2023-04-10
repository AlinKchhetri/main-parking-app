import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import {
  COLORS,
  FONTS,
  SIZES,
  darkFONTS,
  images,
  icons,
} from '../../constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Avatar } from 'react-native-paper';
import { changePassword, forgotPassword, loadUser, register } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime';
import { ALERT_TYPE, Toast, Dialog } from 'react-native-alert-notification';

const ForgotPassword = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.message)

  const [email, setEmail] = useState('');
  console.log("🚀 ~ file: ForgotPassword.js:34 ~ ForgotPassword ~ email:", email)
  const [errorMessage, setErrorMessage] = useState();


  const handleSendEmail = async () => {
    if (email == '') {
      setErrorMessage('Please enter a valid email');
      return;
    }
    if (error) return;
    await dispatch(forgotPassword(email));

    if (!error) {
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Email sent',
        textBody: 'Email has been sent to your account with an OTP',
        autoClose: 2000,
      });
      navigation.navigate('resetPassword');
    }
  }

  useEffect(() => {
    if (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error,
        autoClose: 2000,
      });
      dispatch({ type: "clearError" })
    }
  }, [error]);


  const Title = () => {
    return (
      <View style={styles.loginHeader}>
        <Text style={styles.loginText}>Forgot Password?</Text>
      </View>
    );
  };

  const SubmitButton = () => {
    return (
      <TouchableOpacity
        onPress={handleSendEmail}
        style={styles.next}>
        {
          loading ?
            <ActivityIndicator size={'small'} color='white' />
            :
            <Text style={styles.buttonStyle}>Send OTP</Text>
        }
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      <View>
        {/* <Title /> */}
        {/* <TextInput style={styles.inputField} placeholder="Email" onChangeText={setEmail} /> */}
        <Text style={{ ...FONTS.body3, margin: 15 }}>Enter the email address asscociated with your account and we'll send an email with instructions to reset your password.</Text>
        <TextInput
          style={styles.inputField} outlineColor='#FAFAFA' activeOutlineColor='#333333'
          mode='outlined'
          label="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        {errorMessage &&
          <Text style={{ fontSize: 12, color: 'red', marginHorizontal: 15, marginVertical: 5 }}>{errorMessage}</Text>
        }
        <SubmitButton />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
  },
  loginHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 5
  },
  loginText: {
    ...FONTS.h3,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: SIZES.padding,
  },
  inputField: {
    backgroundColor: '#FAFAFA',
    marginHorizontal: 15,
  },
  next: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: SIZES.padding,
    backgroundColor: COLORS.green,
    height: 55,
    borderRadius: SIZES.padding * 2,
  },

  buttonStyle: {
    ...darkFONTS.h4,
  },
  forgotText: {
    ...FONTS.body4,
    textAlign: 'center',
    marginTop: SIZES.padding,
    color: COLORS.green,
  },
  socialButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 40,
    margin: SIZES.padding,
  },
  iconStyle: {
    width: 45,
    height: 45,
  },
  socialText: {
    ...FONTS.body3,
    textAlign: 'center',
  },
  dontText: {
    ...FONTS.body3,
    textAlign: 'center',
  },
  singnupText: {
    ...FONTS.body3,
    color: COLORS.green,
  },
});