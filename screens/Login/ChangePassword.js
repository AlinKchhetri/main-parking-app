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
  import { changePassword, loadUser, register } from '../../redux/action';
  import { useDispatch, useSelector } from'react-redux';
  import mime from 'mime';
  
  const ChangePassword = ({ navigation, route }) => {
  
    const dispatch = useDispatch();
  
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    
    const handleChangePassword = async () => {
      await dispatch(changePassword(oldPassword, newPassword));
      dispatch(loadUser());
    }
    
    const LoginButton = () => {
      return (
        <TouchableOpacity
          onPress={handleChangePassword}
          style={styles.next}>
          <Text style={styles.buttonStyle}>Update</Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <SafeAreaView style={styles.login}>
        <StatusBar barStyle="dark-content" />
        <View>
          <TextInput style={styles.inputField} placeholder="Old Password" onChangeText={setOldPassword} secureTextEntry clearButtonMode='while-editing'/>
          <TextInput style={styles.inputField} placeholder="New Password" onChangeText={setNewPassword} clearButtonMode='while-editing' />
          <TextInput style={styles.inputField} placeholder="Confirm Password" onChangeText={setConfirmPassword} clearButtonMode='while-editing' />
          <LoginButton />
        </View>
      </SafeAreaView>
    );
  };
  
  export default ChangePassword;
  
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