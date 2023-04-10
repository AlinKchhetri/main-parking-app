import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator
} from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import {
  COLORS,
  FONTS,
  SIZES,
  darkFONTS,
  images,
  icons,
} from '../constants';
import useTheme from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Avatar } from 'react-native-ui-lib';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, logout, updateProfile } from '../redux/action';
import mime from 'mime';

const Profile = ({ navigation, route }) => {

  const [refreshing, setRefreshing] = useState(false);

  const { user, loading } = useSelector(state => state.auth);
  // console.log("🚀 ~ file: Profile.js:30 ~ Profile ~ loading:", user)
  const dispatch = useDispatch();
  // const {colors} = useTheme()
  const newNavigation = useNavigation();


  const [avatar, setAvatar] = useState(user.avatarUrl.url);
  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  console.log("🚀 ~ file: Profile.js:44 ~ Profile ~ phoneNumber:", phoneNumber)


  useEffect(() => {
    if (route.params) {
      if (route.params.image) {
        setAvatar(route.params.image)
      }
    }
  }, [route])


  const handleImage = () => {
    navigation.navigate('camera', { updateProfile: true });
  }

  const handleUpdate = async () => {
    setRefreshing(true);
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('avatar', { uri: avatar, type: mime.getType(avatar), name: avatar.split("/").pop() });

    await dispatch(updateProfile(myForm));
    setRefreshing(false);
    navigation.navigate('MyProfile')
  }
  const handleChangePassword = () => {
    navigation.navigate('changePassword');
  }

  const handleVerify = () => {
    navigation.navigate('verify');
  };
  const handleLogout = () => {
    dispatch(logout());
  }


  const UpdateButton = () => {
    return (
      <TouchableOpacity
        onPress={handleUpdate}
        style={styles.next}>
        {
          refreshing ?
            <ActivityIndicator color={'white'} size={'small'} />
            :
            <Text style={{ ...FONTS.h5, color: 'white' }}>Update Profile</Text>
        }
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      <View>
        <View style={{
          margin: 15
        }}>
          <Avatar
            size={100}
            animate={true}
            name={user.name}
            useAutoColors
            source={{ uri: user.avatarUrl.url }}
            autoColorsConfig={user.name}
            containerStyle={{
              alignSelf: 'center'
            }}
          />
          <Text
            onPress={handleImage}
            style={{ ...FONTS.body4, color: COLORS.green, alignSelf: 'center' }}>
            Change photo
          </Text>
          <PaperInput
            style={{
              backgroundColor: '#FFF',
              margin: 5,
            }} outlineColor='#707C80' activeOutlineColor='#333333'
            mode='outlined'
            label="Full Name"
            onChangeText={setName}
            value={name}
          />
          <PaperInput
            style={{
              backgroundColor: '#FFF',
              margin: 5,
            }} outlineColor='#707C80' activeOutlineColor='#333333'
            mode='outlined'
            label="Role"
            // onChangeText={setName}
            value={user.role}
            disabled={true}
          />
          <PaperInput
            disabled={true}
            style={{
              backgroundColor: '#FAFAFA',
              margin: 5,
            }} outlineColor='#FAFAFA' activeOutlineColor='#333333'
            mode='outlined'
            label="Email Address"
            value={user.email}
          />
          <UpdateButton />
          <TouchableOpacity
            onPress={handleChangePassword}>
            <Text style={{ ...FONTS.body3, color: COLORS.green, textAlign: 'center', margin: 5 }}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

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