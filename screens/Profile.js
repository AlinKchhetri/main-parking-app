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
} from '../constants';
import useTheme from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, logout, updateProfile } from '../redux/action';
import mime from 'mime';

const Profile = ({ navigation, route }) => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  // const {colors} = useTheme()
  const newNavigation = useNavigation();


  const [avatar, setAvatar] = useState(user.avatarUrl.url);
  const [name, setName] = useState(user.name);


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
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('avatar', { uri: avatar, type: mime.getType(avatar), name: avatar.split("/").pop() });

    await dispatch(updateProfile(myForm));
    dispatch(loadUser());
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
        <Text style={styles.buttonStyle}>Update Profile</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      <View>
        {user.verified ? <View>
          <Avatar.Image
            size={100}
            source={{ uri: avatar }}
            style={{ backgroundColor: '#1ab65c', alignSelf: 'center' }}
          />
          <Text
            onPress={handleImage}
            style={{ ...lightFONTS.body4, color: COLORS.green, alignSelf: 'center' }}>
            Change photo
          </Text>
          <TextInput style={styles.inputField} placeholder={name} onChangeText={setName} clearButtonMode='while-editing'  />
          <TextInput style={styles.inputField} placeholder={user.email}  editable={false} />
          <UpdateButton />
        </View> : 
        <View>
          <Text style={{...lightFONTS.h5, color: COLORS.red, textAlign: 'center'}}>Verify your account to access Account Settings</Text>
          <TouchableOpacity
          onPress={handleVerify}
          style={[styles.next]}>
          <Text style={styles.buttonStyle}>Verify your Account</Text>
        </TouchableOpacity>
        </View>}
        <TouchableOpacity
          onPress={handleChangePassword}
          style={[styles.next, {backgroundColor: null}]}>
          <Text style={{...lightFONTS.h5, color:COLORS.green}}>Change Password</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.next, {position: 'absolute', bottom: 30, width: '95%'}]}>
          <Text style={styles.buttonStyle}>Logout</Text>
        </TouchableOpacity>
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