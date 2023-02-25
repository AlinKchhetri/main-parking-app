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
  import React, { useState, useEffect } from 'react';
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
  import { changePassword, forgotPassword, resetPassword, loadUser, register } from '../../redux/action';
  import { useDispatch, useSelector } from'react-redux';
  import mime from 'mime';
  
  const ResetPassword = ({ navigation, route }) => {
  
    const dispatch = useDispatch();
  
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    
    const handleSendEmail = async () => {
      await dispatch(resetPassword(otp, newPassword));
      navigation.navigate('login');
    }

  
    const Title = () => {
      return (
        <View style={styles.loginHeader}>
          <Text style={styles.loginText}>Reset fefefPassword</Text>
        </View>
      );
    };

    const SubmitButton = () => {
      return (
        <TouchableOpacity
          onPress={handleSendEmail}
          style={styles.next}>
          <Text style={styles.buttonStyle}>Reset Password</Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <SafeAreaView style={styles.login}>
        <StatusBar barStyle="dark-content" />
        <View>
          <Title />
          <TextInput style={styles.inputField} placeholder="OTP" onChangeText={setOtp} />
          <TextInput style={styles.inputField} placeholder="New Password" onChangeText={setNewPassword} />
          <TextInput style={styles.inputField} placeholder="Confirm Password" onChangeText={setConfirmPassword} />
          <SubmitButton />
        </View>
      </SafeAreaView>
    );
  };
  
  export default ResetPassword;
  
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
      ...lightFONTS.h1,
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