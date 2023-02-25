import React, { useState, useCallback, useEffect } from 'react';
import {
  Image,
  Switch,
  ImageBackground,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar } from 'react-native-ui-lib';
import { login, logout, verifyPassword } from '../redux/action';
import { COLORS, icons, SIZES, images, darkFONTS, lightFONTS } from '../constants';
import * as LocalAuthentication from 'expo-local-authentication'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-vector-icons/MaterialIcons';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const UI = (props) => {
  return (
    <TouchableOpacity onPress={props.press} style={styles.infoCard}>
      <View style={styles.iconCard}>
        <Image source={props.icon} style={{ width: 20, height: 20 }} />
      </View>
      <View style={styles.textCard}>
        <Text style={{ ...lightFONTS.h5 }}>{props.title}</Text>
        <Text style={{ ...lightFONTS.body5 }}>{props.titleInfo}</Text>
      </View>
      <View style={styles.gotoCard}>
        <Image source={props.goto} style={{ width: 15, height: 15 }} />
      </View>
    </TouchableOpacity>
  );
};

const MyProfile = ({ navigation }) => {
  const { user, message, error, verify } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [darkEnabled, setDarkEnabled] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const { isDarkMode } = useSelector(state => state.color);
  const [biometricPassword, setBiometricPassword] = useState({});

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      if (compatible) {
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        console.log("🚀 ~ file: MyProfile.js:58 ~ savedBiometrics", savedBiometrics)
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      const jsonValue = await AsyncStorage.getItem('loginInfo')
      setIsEnabled(jsonValue ? true : false);
      if (jsonValue && JSON.parse(jsonValue).email !== user.email) {
        setDisabled(true)
      }

    })();
  }, [isEnabled])

  // useEffect(() => {
  //   if (verify) {
  //     biometricAuth(biometricPassword);
  //   }
  // }, [verify])



  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('loginInfo', jsonValue)
    } catch (e) {
      console.log("🚀 ~ file: MyProfile.js:69 ~ storeData ~ e", e)
    }
  }


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('loginInfo')
      console.log("🚀 ~ file: MyProfile.js:77 ~ getData ~ jsonValue", jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log("🚀 ~ file: MyProfile.js:79 ~ getData ~ e", e)
    }
  }


  const biometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Register Biometrics',
    });
    if (result.success) {
      console.log("🚀 ~ file: SignUp.js:26 ~ onAuthentication ~ result", result)
      const info = { email: 'kcalan672@gmail.com', password: 'password' }
      storeData(info);
      setIsEnabled(true)
    }
  }

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  }

  const darkModeSwitch = () => {
    setDarkEnabled((previousState) => !previousState);
    dispatch({ type: 'toggleDarkMode', payload: !darkEnabled });
  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={false} barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <ScrollView
        // bounces = {false}
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.avatarSection}>
          {/* <View style={styles.avatar}>
            <Avatar
              size={100}
              name={user.name}
              source={{ uri: user.avatarUrl.url }}
              style={{ alignSelf: 'center' }}
            />
          </View> */}
          <Avatar
            size={100}
            animate={true}
            name={user.name}
            useAutoColors
            source={{ uri: user.avatarUrl.url }}
            autoColorsConfig={user.name}
          />
          <Text onPress={() => navigation.navigate('HomeStack', {
            screen: 'editProfile'
          })} 
          style={{ ...lightFONTS.body3 }}>Edit Profile</Text>
          <Text onPress={() => {
            Alert.prompt(
              "Verify your password", `Please enter password for account with email address: ${user.email}`,
              (password) => {
                try {
                  dispatch(verifyPassword(user.email, password)).then(() => {
                    biometricAuth();
                  }).catch((err) => {
                    Alert.alert(err)
                  });
                } catch (error) {
                  Alert.alert(error)
                }
              }
            )
          }} style={{ ...lightFONTS.body3 }}>Open</Text>
          <View>
            <View style={styles.infoSection}>
              <UI
                icon={icons.user}
                title="My Account"
                titleInfo="Make changes to your account"
                goto={icons.goto}
                press={() => navigation.navigate('HomeStack', {
                  screen: 'editProfile'
                })}
              />
              <Pressable style={styles.infoCard}>
                <View style={styles.iconCard}>
                  <Image source={icons.lock} style={{ width: 20, height: 20 }} />
                </View>
                <View style={styles.textCard}>
                  <Text style={{ ...lightFONTS.h5 }}>Face ID/Touch ID</Text>
                  <Text style={{ ...lightFONTS.body5 }}>Manage your account security</Text>
                </View>
                <View style={styles.gotoCard}>
                  <Switch
                    trackColor={{ false: '#767577', true: COLORS.green }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={async (c) => {
                      if (c) {
                        biometricAuth()
                      } else {
                        try {
                          await AsyncStorage.removeItem('loginInfo')
                          setIsEnabled(false)
                        } catch (error) {
                          console.log("🚀 ~ file: MyProfile.js:172 ~ onValueChange={async ~ error", error)
                        }
                      }
                    }}
                    value={isEnabled}
                    disabled={disabled}
                  />
                </View>
              </Pressable>
              <Pressable style={styles.infoCard}>
                <View style={styles.iconCard}>
                  <Image source={icons.dark} style={{ width: 20, height: 20 }} />
                </View>
                <View style={styles.textCard}>
                  <Text style={{ ...lightFONTS.h5 }}>Dark Mode</Text>
                  <Text style={{ ...lightFONTS.body5 }}>Turn On/Off dark mode</Text>
                </View>
                <View style={styles.gotoCard}>
                  <Switch
                    trackColor={{ false: '#767577', true: COLORS.green }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={darkModeSwitch}
                    value={darkEnabled}
                  />
                </View>
              </Pressable>
              <UI
                icon={icons.logout}
                title="Log out"
                titleInfo="Log out of yor account"
                goto={icons.goto}
                press={handleLogout}
              >
                <Switch />
              </UI>
            </View>
          </View>
          <View style={[styles.infoSection, { height: 130 }]}>
            <UI icon={icons.support} title="Help & Support" goto={icons.goto} />
            <UI icon={icons.lock} title="About App" goto={icons.goto} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginBottom: 88
  },
  avatarSection: {
    flex: 1,
    justifyContent: 'flex-start',
    margin: SIZES.padding2,
    alignItems: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    margin: SIZES.padding,
    marginBottom: SIZES.padding2 * 2,
  },
  infoSection: {
    width: SIZES.width - 50,
    height: 260,
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.darkgray,
    flexDirection: 'column',
    margin: SIZES.padding,
    padding: 8,
    borderRadius: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  iconCard: {
    flex: 0.4,
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.padding
  },
  textCard: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginHorizontal: SIZES.padding
  },
  gotoCard: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
});

export default MyProfile;