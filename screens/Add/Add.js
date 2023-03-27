import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
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
import { TextInput as PaperInput } from 'react-native-paper';
import { Input } from 'react-native-elements';
import NumericInput from 'react-native-numeric-input'
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import MapView, { Marker } from 'react-native-maps'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Avatar } from 'react-native-paper';
import { addParking } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import mime from 'mime';
import LoadingScreen from '../../components/LoadingScreen';
import { Formik } from 'formik';
import * as yup from 'yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

  const [showBikeDetails, setShowBikeDetails] = useState(true);
  const [showCarDetails, setShowCarDetails] = useState(false);

  const [locationName, setLocationName] = useState();
  console.log("🚀 ~ file: Add.js:58 ~ Add ~ locationName:", locationName)

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

      fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${locationValue.coords.latitude}&lon=${locationValue.coords.longitude}`)
        .then((response) => response.json())
        .then((result) => {
          // setFieldValue('locationName', result?.display_name)
          setLocationName(result.display_name);
          // console.log("🚀 ~ file: Add.js:149 ~ .then ~ result", result.display_name)
        })
        .catch((error) => console.log(error));
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

  const addValidationSchema = yup.object().shape({
    locationName: yup.string()
      .required('Parking Space name is required'),
    two_wheeler_rate: yup.number().required('Two-Wheeler parking rate is required '),
    four_wheeler_rate: yup.number(),
    two_wheeler_slot: yup.number().required('Two-Wheeler parking slot is required '),
    four_wheeler_slot: yup.number()
  })

  return (
    <SafeAreaView style={styles.login}>
      <StatusBar barStyle="dark-content" />
      {
        locationValue ?
          <Formik
            initialValues={{
              locationName: locationName,
              latitude: latitude,
              longitude: longitude,
              two_wheeler_rate: null,
              four_wheeler_rate: null,
              two_wheeler_slot: null,
              four_wheeler_slot: null
            }}
            onSubmit={async (values) => {
              console.log(values.four_wheeler_rate)
              const myForm = new FormData();

              myForm.append('ownerId', user._id);
              myForm.append('locationName', locationName);
              myForm.append('two_wheeler_no_slot', values.two_wheeler_slot);
              myForm.append('two_wheeler_rate', values.two_wheeler_rate);
              values.four_wheeler_slot && myForm.append('four_wheeler_no_slot', values.four_wheeler_slot);
              values.four_wheeler_rate && myForm.append('four_wheeler_rate', values.four_wheeler_rate);
              myForm.append('latitude', values.latitude);
              myForm.append('longitude', values.longitude);
              myForm.append('thumbnailImage', { uri: thumbnailImage, type: mime.getType(thumbnailImage), name: thumbnailImage.split("/").pop() });
              myForm.append('image', { uri: image, type: mime.getType(image), name: image.split("/").pop() });

              dispatch(addParking(myForm)).then(() => {
                console.log("Added")
              })
            }}
            validationSchema={addValidationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors, isValid, touched }) => {
              console.log(errors)
              return (
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{
                  flex: 1,
                  marginHorizontal: 15
                }}>
                  <Text style={{
                    ...lightFONTS.h4,
                    marginVertical: 10,
                  }}>Parking Details</Text>
                  <Text style={{
                    ...lightFONTS.h5,
                    marginVertical: 10,
                  }}>Location Details <Text style={{
                    color: 'red'
                  }}>*</Text></Text>
                  <View style={{
                    // marginHorizontal: 20
                  }}>
                    {/* <Text style={{
                      ...lightFONTS.body3,
                      color: '#707C80'
                    }}>Location</Text> */}

                    <PaperInput
                      style={styles.inputField} underlineColor='#FAFAFA' activeOutlineColor='#333333'
                      mode='outlined'
                      disabled
                      multiline
                      numberOfLines={1}
                      label="Parking Location"
                      onChangeText={() => handleChange('locationName')}
                      onBlur={handleBlur('locationName')}
                      value={locationName}
                      left={
                        <PaperInput.Icon icon='map-marker-outline' />
                      }
                    />
                    {/* <TouchableOpacity onPress={handleChooseLocation} style={{ alignSelf: 'flex-end', margin: 5 }}>
                      <Text style={{ ...lightFONTS.body4, color: COLORS.green }}>Set on map</Text>
                    </TouchableOpacity> */}
                    {
                      locationValue ?
                        <View style={{ flex: 1 }} >
                          <MapView
                            style={{ width: Dimensions.get('window').width, height: 250 }}
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
                                setLongitude(e.nativeEvent.coordinate.longitude);
                                setFieldValue('latitude', e.nativeEvent.coordinate.latitude);
                                setFieldValue('longitude', e.nativeEvent.coordinate.longitude);
                                if (e.nativeEvent.coordinate) {
                                  fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${e.nativeEvent.coordinate.latitude}&lon=${e.nativeEvent.coordinate.longitude}`)
                                    .then((response) => response.json())
                                    .then((result) => {
                                      let location_name = result?.display_name.split(',');
                                      setFieldValue('locationName', result?.display_name);
                                      setLocationName(result?.display_name)
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
                        </View>

                        :
                        <LoadingScreen />
                    }
                  </View>
                  <View>
                    <Text style={{
                      ...lightFONTS.h5,
                      marginVertical: 10,
                    }}>Bike Parking Details <Text style={{
                      color: 'red'
                    }}>*</Text></Text>
                    <PaperInput
                      style={styles.inputField} underlineColor='#FAFAFA' activeOutlineColor='#333333'
                      mode='outlined'
                      keyboardType='numeric'
                      label="No. of Slots"
                      onChangeText={handleChange('two_wheeler_slot')}
                      onBlur={handleBlur('two_wheeler_slot')}
                      value={values.two_wheeler_slot}
                    />
                    {errors.two_wheeler_slot && touched.two_wheeler_slot &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.two_wheeler_slot}</Text>
                    }
                    <PaperInput
                      style={styles.inputField} underlineColor='#FAFAFA' activeOutlineColor='#333333'
                      mode='outlined'
                      keyboardType='numeric'
                      label="Rate per hour"
                      onChangeText={handleChange('two_wheeler_rate')}
                      onBlur={handleBlur('two_wheeler_rate')}
                      value={values.two_wheeler_rate}
                    />
                    {errors.two_wheeler_rate && touched.two_wheeler_rate &&
                      <Text style={{ fontSize: 10, color: 'red' }}>{errors.two_wheeler_rate}</Text>
                    }
                  </View>
                  <View>
                    <Text style={{
                      ...lightFONTS.h5,
                      marginVertical: 10
                    }}>Car Parking Details</Text>
                    <PaperInput
                      style={styles.inputField} underlineColor='#FAFAFA' activeOutlineColor='#333333'
                      mode='outlined'
                      keyboardType='numeric'
                      label="No. of Slots"
                      onChangeText={handleChange('four_wheeler_slot')}
                      onBlur={handleBlur('four_wheeler_slot')}
                      value={values.four_wheeler_slot}
                    />
                    <PaperInput
                      style={styles.inputField} underlineColor='#FAFAFA' activeOutlineColor='#333333'
                      mode='outlined'
                      keyboardType='numeric'
                      label="Rate per hour"
                      onChangeText={handleChange('four_wheeler_rate')}
                      onBlur={handleBlur('four_wheeler_rate')}
                      value={values.four_wheeler_rate}
                    />
                  </View>
                  <View>
                    <Text style={{
                      ...lightFONTS.h5,
                      marginVertical: 10,
                    }}>Parking Images <Text style={{
                      color: 'red'
                    }}>*</Text></Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                      <Pressable style={{ backgroundColor: COLORS.green, justifyContent: 'center', width: 170, height: 170, borderRadius: 20 }} onPress={handleThumbnailImage}>
                        {
                          thumbnailImage ?
                            <Image
                              resizeMode='cover'
                              source={{ uri: thumbnailImage }}
                              style={{ backgroundColor: COLORS.green, alignSelf: 'center', width: 170, height: 170, borderRadius: 20 }}
                            />
                            :
                            <Image
                              resizeMode='contain'
                              source={icons.thumbnail}
                              style={{ backgroundColor: COLORS.green, alignSelf: 'center', width: 30, height: 30 }}
                            />
                        }
                      </Pressable>
                      <Pressable style={{ backgroundColor: COLORS.green, justifyContent: 'center', width: 170, height: 170, borderRadius: 20 }} onPress={handleImage}>
                        {
                          image ?
                            <Image
                              resizeMode='cover'
                              source={{ uri: image }}
                              style={{ backgroundColor: COLORS.green, alignSelf: 'center', width: 170, height: 170, borderRadius: 20 }}
                            />
                            :
                            <Image
                              resizeMode='contain'
                              source={icons.thumbnail}
                              style={{ backgroundColor: COLORS.green, alignSelf: 'center', width: 30, height: 30 }}
                            />
                        }
                      </Pressable>
                    </View>
                  </View>




                  <View>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.next}>
                      <Text style={styles.buttonStyle}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </KeyboardAwareScrollView>
              )
            }}
          </Formik>
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
    backgroundColor: '#FAFAFA',
    marginVertical: 5,
    borderRadius: 10
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