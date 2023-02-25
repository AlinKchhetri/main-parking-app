import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  COLORS,
  lightFONTS,
  SIZES,
  darkFONTS,
  images,
  icons,
} from '../../constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Avatar } from 'react-native-paper';
import { changePassword, loadUser, register, verify, resendOTP } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime';

const Verify = ({ navigation, route }) => {

  const dispatch = useDispatch();

  // const [otp, setOtp] = useState('');
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();
  const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '', 6: '' });
  const [email, setEmail] = useState();

  useEffect(() => {
    if (route.params) {
      console.log("🚀 ~ file: Verify.js:42 ~ useEffect ~ route", route.params.email)
      setEmail(route.params.email)
    }
  }, [route])


  const handleVerify = async () => {
    dispatch(verify(Object.values(otp).join(''))).then(() => {
      dispatch(loadUser());
    })
  }

  const resendotp = () => {
    dispatch(resendOTP())
  }


  const LoginTitle = () => {
    return (
      <View style={styles.loginHeader}>
        <Text style={styles.loginText}>Verify Your Account</Text>
      </View>
    );
  };

  const LoginButton = () => {
    return (
      <TouchableOpacity
        onPress={handleVerify}
        style={styles.next}>
        <Text style={styles.buttonStyle}>Verify</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      <View>
        <LoginTitle />
        <Text style={styles.infoText}>{`Enter the OTP number just sent to ${email} `}</Text>
        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={text => {
                setOtp({ ...otp, 1: text });
                text && secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={text => {
                setOtp({ ...otp, 2: text });
                text ? thirdInput.current.focus() : firstInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={text => {
                setOtp({ ...otp, 3: text });
                text ? fourthInput.current.focus() : secondInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={text => {
                setOtp({ ...otp, 4: text });
                text ? fifthInput.current.focus() : thirdInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fifthInput}
              onChangeText={text => {
                setOtp({ ...otp, 5: text });
                text ? sixthInput.current.focus() : fourthInput.current.focus();
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <TextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={sixthInput}
              onChangeText={text => {
                setOtp({ ...otp, 6: text });
                !text && fifthInput.current.focus();
              }}
            />
          </View>
        </View>
        <LoginButton />
        <Text style={[{ alignSelf: 'center' }, styles.infoText]}>Didn't get code yet? <Text onPress={resendotp} style={[{ textDecorationLine: 'underline' }, styles.infoText]}>Resend OTP</Text></Text>
      </View>
    </SafeAreaView>
  );
};

export default Verify;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  loginHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  loginText: {
    ...lightFONTS.h2,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: SIZES.padding,
  },
  infoText: {
    ...lightFONTS.body3,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: SIZES.padding,
  },
  inputField: {
    backgroundColor: '#FAFAFA',
    margin: SIZES.padding2,
    height: 50,
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
    height: 55,
    borderRadius: SIZES.padding * 2,
  },

  buttonStyle: {
    ...darkFONTS.h4,
  },
  forgotText: {
    ...lightFONTS.body4,
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
  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  otpBox: {
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  otpText: {
    fontSize: 25,
    // color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  socialText: {
    ...lightFONTS.body3,
    textAlign: 'center',
  },
  dontText: {
    ...lightFONTS.body3,
    textAlign: 'center',
  },
  singnupText: {
    ...lightFONTS.body3,
    color: COLORS.green,
  },
});

