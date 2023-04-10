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
import { changePassword, forgotPassword, resetPassword, loadUser, register } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime';
import { Formik } from 'formik'
import * as yup from 'yup'
import { ALERT_TYPE, Toast, Dialog } from 'react-native-alert-notification';

const ResetPassword = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { error, loading } = useSelector(state => state.message)

  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleSendEmail = async () => {
    await dispatch(resetPassword(otp, newPassword));
    navigation.navigate('login');
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

  const resetPasswordValidationSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password is required'),
    OTP: yup
      .string()
      .min(6, ({ min }) => `OTP must be at least ${min} characters long`)
      .max(6, ({ max }) => `OTP must be only ${max} characters long`)
      .required('OTP is required')

  })

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      <View>
        {/* <Title /> */}
        <Text style={{ ...FONTS.body3, margin: 15 }}>Your new password must be different from previous used passwords.</Text>
        <Formik
          initialValues={{
            OTP: '',
            password: '',
            passwordConfirm: ''
          }}
          onSubmit={values => {
            dispatch(resetPassword(values.OTP, values.password));
            Toast.show({
              type: ALERT_TYPE.SUCCESS,
              title: 'Success',
              textBody: 'Your password has been reset successfully',
              autoClose: 2000,
            });
            navigation.navigate('login');
          }}
          validationSchema={resetPasswordValidationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
            <View>
              <TextInput
                style={styles.inputField} outlineColor='#FAFAFA' activeOutlineColor='#333333'
                mode='outlined'
                label="OTP"
                onChangeText={handleChange('OTP')}
                onBlur={handleBlur('OTP')}
                value={values.OTP}
                keyboardType="numeric"
              />
              {errors.OTP && touched.OTP &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.OTP}</Text>
              }
              <TextInput
                style={styles.inputField} outlineColor='#FAFAFA' activeOutlineColor='#333333'
                mode='outlined'
                label="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.password}</Text>
              }
              <TextInput
                style={styles.inputField} outlineColor='#FAFAFA' activeOutlineColor='#333333'
                mode='outlined'
                label="Confirm Password"
                onChangeText={handleChange('passwordConfirm')}
                onBlur={handleBlur('passwordConfirm')}
                value={values.passwordConfirm}
                secureTextEntry
              />
              {errors.passwordConfirm && touched.passwordConfirm &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.passwordConfirm}</Text>
              }
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.next}>
                {
                  loading ?
                    <ActivityIndicator size={'small'} color='white' />
                    :
                    <Text style={styles.buttonStyle}>Reset Password</Text>
                }
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
    ...FONTS.h1,
    fontWeight: 'bold',
    textAlign: 'left',
    padding: SIZES.padding,
  },
  inputField: {
    backgroundColor: '#FAFAFA',
    marginHorizontal: 15,
    marginVertical: 10
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