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
import { TextInput } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
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
import { changePassword, loadUser, register } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime';
import { Formik } from 'formik'
import * as yup from 'yup'
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

const ChangePassword = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.auth);


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

  const changePasswordValidationSchema = yup.object().shape({
    oldPassword: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Old Password is required'),
    newPassword: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('New Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm Password is required')

  })

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }}
        onSubmit={async (values) => {
          await dispatch(changePassword(oldPassword, newPassword));
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Success',
            textBody: 'Your password has been changed successfully',
            autoClose: 2000
          });
          dispatch(loadUser());
        }}
        validationSchema={changePasswordValidationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
          return (
            <View style={{
              marginHorizontal: 15
            }}>
              <TextInput
                style={styles.inputField} outlineColor='#FAFAFA' activeOutlineColor='#333333'
                mode='outlined'
                label="Old Password"
                onChangeText={handleChange('oldPassword')}
                onBlur={handleBlur('oldPassword')}
                value={values.password}
                secureTextEntry
              />
              {errors.oldPassword && touched.oldPassword &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.oldPassword}</Text>
              }
              <TextInput
                style={styles.inputField} outlineColor='#FAFAFA' activeOutlineColor='#333333'
                mode='outlined'
                label="New Password"
                onChangeText={handleChange('newPassword')}
                onBlur={handleBlur('newPassword')}
                value={values.password}
                secureTextEntry
              />
              {errors.newPassword && touched.newPassword &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.newPassword}</Text>
              }
              <TextInput
                style={styles.inputField} outlineColor='#FAFAFA' activeOutlineColor='#333333'
                mode='outlined'
                label="Confirm Password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry
              />
              {errors.confirmPassword && touched.confirmPassword &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.confirmPassword}</Text>
              }
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.next}>
                {
                  loading ?
                    <ActivityIndicator size={'small'} color='white' />
                    :
                    <Text style={{ ...FONTS.h5, color: 'white' }}>Change Password</Text>
                }
              </TouchableOpacity>
            </View>
          )
        }}

      </Formik>
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
    ...FONTS.h2,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: SIZES.padding,
  },
  inputField: {
    backgroundColor: '#FAFAFA',
    margin: SIZES.padding,
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