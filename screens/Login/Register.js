import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React, { useState, useEffect } from 'react';
import {
  COLORS,
  FONTS,
  SIZES,
  darkFONTS,
  images,
  icons,
} from '../../constants';
import { TextInput, HelperText } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Avatar } from 'react-native-paper';
import { register } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime';
import { Formik } from 'formik'
import * as yup from 'yup'


const Register = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const { error } = useSelector(state => state.auth)

  // const [avatar, setAvatar] = useState('');
  // const [name, setName] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    if (error) {
      console.log("🚀 ~ file: Register.js:48 ~ useEffect ~ error:", error)

    }
  }, [route, error])



  const handleImage = () => {
    navigation.navigate('camera', { register: true });
  }

  const handleRegister = (values) => {
    const myForm = new FormData();

    myForm.append('name', values.fullName);
    myForm.append('email', values.email);
    myForm.append('phoneNumber', values.phoneNumber);
    myForm.append('password', values.password);
    // myForm.append('avatar', { uri: avatar, type: mime.getType(avatar), name: avatar.split("/").pop() });
    console.log("🚀 ~ file: Register.js:64 ~ handleRegister ~ myForm", myForm)


    navigation.navigate('verify', { email: values.email });
    dispatch(register(myForm));
  }

  const handleVerify = () => {
    navigation.navigate('verify')
  }

  const InputFields = props => {
    return (
      <TextInput style={styles.inputField} placeholder={props.placeholder} defaultValue={props.defaultValue} onChange={props.onChangeText} />
    );
  };

  const registerValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password is required'),
    fullName: yup
      .string()
      .matches(/^[a-zA-Z ]*$/, 'Must be a valid character name')
      .required('Full Name is required'),
    phoneNumber: yup
      .string()
      .min(10, ({ min }) => `Phone Number must be at least ${min} characters long`)
      .max(10, ({ max }) => `Phone Number must be only ${max} characters long`)
      .required('Phone Number is required'),

  })

  const registerButton = () => {
    return (
      <TouchableOpacity
        onPress={handleRegister}
        style={styles.next}>
        <Text style={styles.buttonStyle}>Sign in</Text>
      </TouchableOpacity>
    );
  };

  const RegisterTitle = () => {
    return (
      <View style={styles.registerHeader}>
        <Text style={styles.registerText}>Register your account</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.register}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAwareScrollView>
        {/* <Image source={{ uri: 'https://res.cloudinary.com/db86nidu6/image/upload/v1676741741/City_driver-pana_fjek9z.png' }}
          resizeMode='contain'
          style={{
            height: 180, width: 270, alignSelf: 'center', margin: 0
          }} /> */}
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: ''
          }}
          onSubmit={values => {
            console.log("🚀 ~ file: Register.js:121 ~ Register ~ fullName", values)
            handleRegister(values)
          }}
          validationSchema={registerValidationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: 30
            }}>
              <RegisterTitle />
              <TextInput
                style={styles.inputField} underlineColor='#FAFAFA' activeUnderlineColor='#333333'
                label="Full Name"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                left={
                  <TextInput.Icon icon='account-outline' />
                }
              />
              {errors.fullName && touched.fullName &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.fullName}</Text>
              }
              <TextInput
                style={styles.inputField} underlineColor='#FAFAFA' activeUnderlineColor='#333333'
                label="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                left={
                  <TextInput.Icon icon='email-outline' />
                }
              />
              {errors.email && touched.password &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.email}</Text>
              }
              <TextInput
                style={styles.inputField} underlineColor='#FAFAFA' activeUnderlineColor='#333333'
                label="Phone Number"
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                keyboardType='phone-pad'
                left={
                  <TextInput.Icon icon='phone-outline' />
                }
              />
              {errors.phoneNumber && touched.phoneNumber &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.phoneNumber}</Text>
              }
              <TextInput
                style={styles.inputField} underlineColor='#FAFAFA' activeUnderlineColor='#333333'
                label="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                left={
                  <TextInput.Icon icon='lock-outline' />
                }
              />
              {errors.password && touched.password &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.password}</Text>
              }
              <TextInput
                style={styles.inputField} underlineColor='#FAFAFA' activeUnderlineColor='#333333'
                label="Confirm Password"
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry
                left={
                  <TextInput.Icon icon='lock-outline' />
                }
              />
              {errors.confirmPassword && touched.confirmPassword &&
                <Text style={{ fontSize: 10, color: 'red', marginHorizontal: 15 }}>{errors.confirmPassword}</Text>
              }
              <View style={{
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'center',
                // marginHorizontal: 8
              }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={styles.next}>
                  <Text style={styles.buttonStyle}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  register: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  register: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  registerHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  registerText: {
    ...FONTS.h2,
    textAlign: 'left',
    padding: SIZES.padding,
  },
  inputField: {
    backgroundColor: '#FAFAFA',
    margin: SIZES.padding,
  },
  next: {
    flex: 1,
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