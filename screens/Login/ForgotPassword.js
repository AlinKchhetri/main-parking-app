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
  import { changePassword, forgotPassword, loadUser, register } from '../../redux/action';
  import { useDispatch, useSelector } from'react-redux';
  import mime from 'mime';
  import Toast  from 'react-native-toast-message';
  
  const ForgotPassword = ({ navigation, route }) => {
  
    const dispatch = useDispatch();
    const {error} = useSelector(state => state.message)
  
    const [email, setEmail] = useState('');
  
    
    const handleSendEmail = async () => {
      await dispatch(forgotPassword(email));
      if (!error) {
        navigation.navigate('resetPassword');
      }
    }

    useEffect(() => {
      if (error) {
        Toast.show({
          type: 'error',
          position: 'bottom',
          bottomOffset:100,
          text1:  error || 'Invalid',
        })
        dispatch({ type: "clearError" })
      }
    }, [error]);

  
    const Title = () => {
      return (
        <View style={styles.loginHeader}>
          <Text style={styles.loginText}>Reset Password</Text>
        </View>
      );
    };

    const SubmitButton = () => {
      return (
        <TouchableOpacity
          onPress={handleSendEmail}
          style={styles.next}>
          <Text style={styles.buttonStyle}>Send OTP</Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <SafeAreaView style={styles.login}>
        <StatusBar barStyle="dark-content" />
        <View>
          <Title />
          <TextInput style={styles.inputField} placeholder="Email" onChangeText={setEmail} />
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