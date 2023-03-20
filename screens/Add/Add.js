import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  ScrollView,
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
import MapView, { Marker } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import { addParking } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime';
import LoadingScreen from '../../components/LoadingScreen';

const Add = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { locationValue, loading } = useSelector(state => state.location);


  // console.log(loading + ' value')


  const [image, setImage] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [rate, setRate] = useState(0);
  const [latitude, setLatitude] = useState(locationValue?.coords?.latitude);
  const [longitude, setLongitude] = useState(locationValue?.coords?.longitude);


  useEffect(() => {
    if (route.params) {
      if (route.params.thumbnailImage) {
        setThumbnailImage(route.params.thumbnailImage)
      }
      if (route.params.image) {
        setImage(route.params.image)
      }
      if (route.params.latitude) {
        setLatitude(route.params.latitude);
        setLongitude(route.params.longitude);
      }
    }
  }, [route]);

  useEffect(() => {
    if (locationValue) {
      setLatitude(locationValue.coords.latitude)
      setLongitude(locationValue.coords.longitude)
    }
  }, [locationValue])



  const handleImage = () => {
    navigation.navigate('camera', { addImage: true });
  }

  const handleThumbnailImage = () => {
    navigation.navigate('camera', { addThumbnailImage: true });
  }

  const handleChooseLocation = () => {
    navigation.navigate('Search');
  }

  const handleAddParking = async () => {
    const myForm = new FormData();

    myForm.append('ownerID', user._id);
    myForm.append('ownerName', user.name);
    myForm.append('ownerEmail', user.email);
    myForm.append('ownerPhoneNumber', user.phoneNumber);
    myForm.append('rate', rate);
    myForm.append('latitude', latitude);
    myForm.append('longitude', longitude);
    myForm.append('thumbnailImage', { uri: thumbnailImage, type: mime.getType(thumbnailImage), name: thumbnailImage.split("/").pop() });
    myForm.append('image', { uri: image, type: mime.getType(image), name: image.split("/").pop() });

    dispatch(addParking(myForm));
    console.log('done')

    navigation.navigate('My Parking')
  }

  const Button = () => {
    return (
      <TouchableOpacity
        onPress={handleAddParking}
        style={styles.next}>
        <Text style={styles.buttonStyle}>Add</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      {
        locationValue ?
          <ScrollView>
            {/* <Text style={{ ...lightFONTS.h3, textAlign: 'center', margin: SIZES.padding }}>Add New Parking spot</Text> */}
            {/* {console.log("🚀 ~ file: Add.js:36 ~ Add ~ locationValue", latitude, longitude)} */}
            {
              locationValue ?
                <MapView style={{ width: '80%', height: '40%', margin: SIZES.padding, alignSelf: 'center' }}
                  region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.0121,
                  }}
                  provider="google"
                >
                  <Marker
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                    title='test'
                    draggable={true}
                    onDragStart={(e) => e.nativeEvent.coordinate}
                    onDragEnd={(e) => {
                      setLatitude(e.nativeEvent.coordinate.latitude);
                      setLongitude(e.nativeEvent.coordinate.longitude)
                      if (e.nativeEvent.coordinate) {
                        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.nativeEvent.coordinate.latitude}&lon=${e.nativeEvent.coordinate.longitude}`)
                          .then((response) => response.json())
                          .then((result) => {
                            console.log("🚀 ~ file: Add.js:149 ~ .then ~ result", result.display_name)
                          })
                          .catch((error) => console.log(error));
                      }
                    }
                    }
                  >
                    <Image source={icons.setMarker} style={{ width: 60, height: 60 }} />
                  </Marker>
                </MapView>
                :
                <LoadingScreen />
            }

            <View>
              {/* <TouchableOpacity onPress={handleChooseLocation} style={styles.inputField}>
          <Text>Set on map</Text>
          <Icon name='map-marker-plus' size={25} />
        </TouchableOpacity> */}
              <TextInput style={styles.inputField} placeholder="Hourly Rate" onChangeText={setRate} clearButtonMode='while-editing' />
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Pressable style={{ backgroundColor: '#1ab65c', justifyContent: 'center', width: 170, height: 170, borderRadius: 20 }} onPress={handleThumbnailImage}>
                  {
                    thumbnailImage ?
                      <Image
                        resizeMode='cover'
                        source={{ uri: thumbnailImage }}
                        style={{ backgroundColor: '#1ab65c', alignSelf: 'center', width: 170, height: 170, borderRadius: 20 }}
                      />
                      :
                      <Image
                        resizeMode='contain'
                        source={icons.thumbnail}
                        style={{ backgroundColor: '#1ab65c', alignSelf: 'center', width: 30, height: 30 }}
                      />
                  }
                </Pressable>
                <Pressable style={{ backgroundColor: '#1ab65c', justifyContent: 'center', width: 170, height: 170, borderRadius: 20 }} onPress={handleImage}>
                  {
                    image ?
                      <Image
                        resizeMode='cover'
                        source={{ uri: image }}
                        style={{ backgroundColor: '#1ab65c', alignSelf: 'center', width: 170, height: 170, borderRadius: 20 }}
                      />
                      :
                      <Image
                        resizeMode='contain'
                        source={icons.thumbnail}
                        style={{ backgroundColor: '#1ab65c', alignSelf: 'center', width: 30, height: 30 }}
                      />
                  }
                </Pressable>
              </View>
              <Button />
            </View>
          </ScrollView>
          :
          <LoadingScreen />
      }
    </SafeAreaView>
  );
};

export default Add;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.white,
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
    flexDirection: 'row',
    margin: SIZES.padding2,
    backgroundColor: COLORS.lightGray,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
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