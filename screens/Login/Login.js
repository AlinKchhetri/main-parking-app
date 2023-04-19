import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import {
  COLORS,
  FONTS,
  SIZES,
  darkFONTS,
  images,
  icons,
} from '../../constants';
import * as Notifications from 'expo-notifications';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { login, googleOAuthlogin } from '../../redux/action'
import { ALERT_TYPE, Toast, Dialog } from 'react-native-alert-notification';
import { Formik } from 'formik'
import * as yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication'
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'

// import CheckBox from '@react-native-community/checkbox';

const Login = ({ navigation }) => {
  const { error } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [googleRequest, googleResponse, googlePromptAsync] = Google.useAuthRequest({
    androidClientId: "6159442136-9dmcll1s5g5dbj79u2lqj661k2umpiat.apps.googleusercontent.com",
    iosClientId: "6159442136-mq1bp69v0kas4non0k1mbkvfn90bntue.apps.googleusercontent.com",
    expoClientId: "6159442136-4jkrol1cv9eq20kkbe8cu8u2vrlaj90m.apps.googleusercontent.com"
  });

  const [facebookRequest, facebookResponse, facebookPromptAsync] = Facebook.useAuthRequest({
    expoClientId: "1514457449047549"
  });


  useEffect(() => {
    if (googleResponse?.type === "success") {
      setAccessToken(googleResponse.authentication.accessToken);

      async function getData() {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { 'Authorization': `Bearer ${googleResponse.authentication.accessToken}` }
        });

        userInfoResponse.json().then((data) => {
          dispatch(googleOAuthlogin(data.name, data.email, data.id))
          setUserInfo(data);
        });
      }
      getData();
    }
  }, [googleResponse])

  const getUserData = async () => {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });

    userInfoResponse.json().then((data) => {
      console.log("🚀 ~ file: Login.js:60 ~ userInfoResponse.json ~ data", data)
      setUserInfo(data);
    });
  };

  // const GoogleLogin = async () => {
  //   const login = await googlePromptAsync({ useProxy: true, showInRecents: true })
  //   console.log("🚀 ~ file: Login.js:67 ~ GoogleLogin ~ login", googleResponse)
  //   if (login?.type === "success") getUserData();
  // }

  const LoginBanner = () => {
    if (userInfo) {
      return (
        <View>
          <Image source={images.loginBanner} style={{ width: 100, height: 100 }} />
        </View>
      )
    }
  };


  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const handleForgotPassword = () => {
    navigation.navigate('forgotPassword');
  }

  useEffect(() => {
    // console.log(isAuthenticated);
    if (error) {
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: error,
        autoClose: 2000,
      }),
        dispatch({ type: "clearError" })
    }
  }, [error, dispatch, alert])

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
      if (compatible && savedBiometrics) {
        console.log("🚀 ~ file: Login.js:64 ~ savedBiometrics", savedBiometrics)
      }
    })();
  });

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loginInfo')
      console.log("🚀 ~ file: MyProfile.js:77 ~ getData ~ jsonValue", jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("🚀 ~ file: MyProfile.js:79 ~ getData ~ e", e)
    }
  }

  const biometricLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
    });
    if (result.success) {
      console.log("🚀 ~ file: SignUp.js:26 ~ onAuthentication ~ result", result)
      try {
        const jsonValue = await AsyncStorage.getItem('loginInfo')
        const loginInfo = JSON.parse(jsonValue)
        dispatch(login(loginInfo.email, loginInfo.password))
      } catch (e) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: 'Warning',
          textBody: 'Biometric login failed. Make sure you have activated biometric login',
          autoClose: 2000,
        })
        console.log("🚀 ~ file: MyProfile.js:79 ~ getData ~ e", e)
      }
    }
  }

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })

  const LoginTitle = () => {
    return (
      <View style={styles.loginHeader}>
        <Text style={styles.loginText}>Login</Text>
      </View>
    );
  };

  const LoginButton = (props) => {
    return (
      <TouchableOpacity
        onPress={props.submit}
        style={styles.next}>
        <Text style={styles.buttonStyle}>Sign in</Text>
      </TouchableOpacity>
    );
  };

  const GoogleAuthView = (props) => {
    return (
      <TouchableOpacity
        onPress={async function schedulePushNotification() {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: "You've got mail! 📬",
              body: 'Here is the notification body',
              data: { data: 'goes here' },
            },
            trigger: { date: new Date('2023-03-25T18:47:40.918Z') },
          });
        }}
      >
        <Text>{accessToken ? 'Log Out' : 'Log In'}</Text>
      </TouchableOpacity>
    )
  }

  const SocialLogin = () => {
    return (
      <View style={styles.socialContainer}>
        <View style={styles.socialButton}>
          <TouchableOpacity onPress={async () => {
            await facebookPromptAsync();
          }}>
            <Icon name='facebook' size={30} style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={async () => {
            await googlePromptAsync({ showInRecents: false });
          }}>
            <Icon name='google' size={28} style={styles.iconStyle} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='apple' size={30} style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle='dark-content' />
      <View style={{
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}>
        <Image
          source={images.onboarding}
          style={{ height: 250, width: 250, alignSelf: 'center' }}
        />
        <View style={{
          color: '#FAFAFA'
        }}>
          <LoginTitle />
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={values => {
              dispatch(login(values.email, values.password))
            }}
            validationSchema={loginValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
              <View style={{
                marginHorizontal: 15
              }}>
                <TextInput
                  style={styles.inputField} outlineColor='#FAFAFA' activeOutlineColor='#333333'
                  mode='outlined'
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
                  style={styles.inputField} outlineColor='#FAFAFA' activeOutlineColor='#333333'
                  mode='outlined'
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
                <View style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  {
                    isBiometricSupported &&
                    <TouchableOpacity
                      onPress={biometricLogin}
                      style={{
                        borderWidth: 2,
                        flexDirection: 'row',
                        borderColor: '#333333',
                        borderRadius: SIZES.padding,
                        marginRight: 5,
                      }}>
                      <Ionicon name='finger-print' size={30} color='#33333' style={{
                        padding: 10
                      }} />
                    </TouchableOpacity>
                  }
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.next}>
                    <Text style={styles.buttonStyle}>Sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
          <Text onPress={handleForgotPassword} style={styles.forgotText}>Forgot the password?</Text>

          <Text style={{
            ...FONTS.body4,
            alignSelf: 'center',
            marginVertical: 10
          }}>or continue with </Text>
          <SocialLogin />
          <Text style={styles.dontText}>
            Don't have an account yet?{' '}
            <Text
              onPress={() => navigation.navigate('register')}
              style={styles.singnupText}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView >
  );

};

export default Login;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
  },
  loginHeader: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 15
  },
  loginText: {
    ...FONTS.h2,
    textAlign: 'left',
    paddingHorizontal: SIZES.padding,
  },
  inputField: {
    backgroundColor: '#FAFAFA',
    margin: 5,
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
    color: COLORS.green,
    textAlign: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 20,
    // margin: SIZES.padding,
  },
  iconStyle: {
    width: 45,
    height: 45,
  },
  socialText: {
    ...FONTS.body3,
    textAlign: 'center',
    marginVertical: 30
  },
  dontText: {
    ...FONTS.body3,
    textAlign: 'center',
  },
  singnupText: {
    ...FONTS.body3,
    color: COLORS.green,
    textDecorationLine: 'underline'
  },
});