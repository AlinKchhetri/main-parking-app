import { View, Text, TouchableOpacity, StatusBar, Pressable, Share, StyleSheet, Linking } from 'react-native'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { COLORS, darkFONTS, FONTS, SIZES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { bookParking } from '../../redux/action';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import LoadingScreen from '../../components/LoadingScreen';
import * as Notifications from 'expo-notifications';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const ParkingDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { location } = useSelector(state => state.location);
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (route.params) {
      console.log("🚀 ~ file: ParkingDetails.js:16 ~ useEffect ~ route", route)
      setDetails(route.params.space)
    }
  }, [route]);

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['35%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  // console.log(details, '--------------------------------')
  // console.log(user)

  const handleBooking = async () => {
    await dispatch(bookParking(details._id, user._id, user.name, user.email, user.phoneNumber, 3, 60));

    navigation.navigate('Home');
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'ParkPin',
        message:
          'Share ParkPin parking spaces',
        url: `https://maps.google.com/?q=${details?.location.coordinates[1]},${details?.location.coordinates[0]}`
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const locationAddress = details.locationName;

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        {/* <TouchableOpacity onPress={handleBooking} style={{ backgroundColor: COLORS.green, justifyContent: 'center', alignItems: 'center', width: '80%', height: 50 }}>
        <Text style={{ ...darkFONTS.h4 }}>Book</Text>
      </TouchableOpacity> */}
        <StatusBar barStyle={'light-content'} />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          // index={1}
          backgroundStyle={{
            backgroundColor: '#f2f2f2ff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.55,
            shadowRadius: 14.78,

            elevation: 12,
          }}
          snapPoints={snapPoints}
        >
          <View style={styles.contentContainer}>
            <Text style={{
              ...FONTS.h4,
              textAlign: 'center',
            }}>Select a vehicle</Text>
            <View style={{
              marginTop: 20
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                marginHorizontal: 15,
                marginVertical: 5,
                paddingVertical: 15,
                borderRadius: 15
              }}>
                <MaterialIcon
                  name='bike'
                  size={25}
                />
                <View style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  alignSelf: 'flex-start'
                }}>
                  <Text style={{ ...FONTS.h4 }}>Bike</Text>
                  <Text style={{
                    ...FONTS.h5,
                    color: '#1987ff'
                  }}>Rs. {details.two_wheeler && details.two_wheeler.rate}<Text style={{
                    ...FONTS.body4,
                    color: '#707C80'
                  }}>/hr</Text></Text>
                </View>
                <Text style={{
                  ...FONTS.body4,
                  color: '#707C80'
                }}>
                  <Text>{details.two_wheeler && details.two_wheeler.no_slot} </Text>
                  spaces left
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                marginHorizontal: 15,
                marginVertical: 5,
                paddingVertical: 15,
                borderRadius: 15
              }}>
                <MaterialIcon
                  name='car'
                  size={27}
                />
                <View>
                  <Text style={{ ...FONTS.h4 }}>Car</Text>
                  <Text style={{
                    ...FONTS.h5,
                    color: '#1987ff'
                  }}>Rs. {details.two_wheeler && details.two_wheeler.rate}<Text style={{
                    ...FONTS.body4,
                    color: '#707C80'
                  }}>/hr</Text></Text>
                </View>
                <Text style={{
                  ...FONTS.body4,
                  color: '#707C80'
                }}>
                  <Text>{details.two_wheeler && details.two_wheeler.no_slot} </Text>
                  spaces left
                </Text>
              </View>
            </View>
          </View>
        </BottomSheetModal>
        {
          route.params.space ?
            <ImageHeaderScrollView
              showsVerticalScrollIndicator={false}
              maxHeight={300}
              minHeight={80}
              maxOverlayOpacity={0.6}
              minOverlayOpacity={0.3}
              overScrollMode="never"
              overlayColor='#000'
              disableHeaderGrow={true}
              headerImage={{ uri: details.image && details.image.url }}
            >
              <View style={{ flex: 1, height: 600 }}>
                <TriggeringView style={styles.container} onHide={() => console.log("text hidden")}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: 10
                  }}>
                    <Text style={{
                      ...FONTS.h4
                    }}>{locationAddress?.split(',')[0]}</Text>
                    <Text style={{
                      ...FONTS.h4,
                      color: '#1987ff'
                    }}>Rs. {details.two_wheeler && details.two_wheeler.rate}<Text style={{
                      ...FONTS.body4,
                      color: '#707C80'
                    }}>/hr</Text></Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}>
                    <MaterialIcon name='map-marker'
                      size={25} />
                    <Text numberOfLines={2} style={{
                      ...FONTS.body5,
                      marginLeft: 5,
                      color: '#707C80'
                    }}>{details?.locationName}</Text>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginVertical: 10
                  }}>
                    {/* <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}> */}
                    {
                      details.two_wheeler?.no_slot > 0 &&
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: COLORS.gray,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 8,
                        marginRight: 5
                      }}>
                        <MaterialIcon
                          name='bike'
                          size={17}
                          color='black'
                          style={{
                            opacity: 0.5,
                            // marginHorizontal: 20
                          }}
                        />
                        <Text style={{
                          ...FONTS.body5,
                          // color: 'white',
                          opacity: 0.5,
                          marginLeft: 5
                        }}>{details?.two_wheeler?.no_slot} slot</Text>
                      </View>
                    }
                    {
                      details.four_wheeler?.no_slot > 0 &&
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: COLORS.gray,
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        borderRadius: 8,
                        marginRight: 5
                      }}>
                        <MaterialIcon
                          name='car'
                          size={20}
                          color='black'
                          style={{
                            opacity: 0.5,
                            // marginHorizontal: 20
                          }}
                        />
                        <Text style={{
                          ...FONTS.body5,
                          // color: 'white',
                          opacity: 0.5,
                          marginLeft: 5
                        }}>{details?.four_wheeler?.no_slot} slot</Text>
                      </View>
                    }
                    {/* </View> */}
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    margin: 10,
                    borderBottomWidth: 0.3,
                    borderTopWidth: 0.3,
                    borderColor: '#707C80',
                    padding: SIZES.padding
                  }}>
                    <TouchableOpacity
                      onPress={() => {
                        Linking.openURL(`tel:${details.ownerDetails && details.ownerDetails.phoneNumber}`)
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Icon
                        name='ios-call-outline'
                        size={25}
                        color='#707C80'

                      />
                      <Text style={{
                        color: '#707C80',
                        marginHorizontal: 5
                      }}>Call</Text>
                    </TouchableOpacity>

                    <TouchableOpacity

                      onPress={() => {
                       Linking.openURL(`googleMaps://app?daddr=${details.location.coordinates[1]},${details.location.coordinates[0]}`)
                      }}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <SimpleLineIcon
                        name='directions'
                        size={25}
                        color='#707C80'

                      />
                      <Text style={{
                        color: '#707C80',
                        marginHorizontal: 5
                      }}>Directions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={onShare}
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                      <Icon
                        name='ios-share-social-outline'
                        size={25}
                        color='#707C80'

                      />
                      <Text style={{
                        color: '#707C80',
                        marginHorizontal: 5
                      }}>Share</Text>
                    </TouchableOpacity>

                  </View>
                  <View style={{
                    flexDirection: 'column',
                    marginVertical: 10,
                  }}>
                    <Text style={{
                      ...FONTS.h5,
                      marginBottom: 10
                    }}>Description</Text>
                    <Text style={{
                      color: '#707C80',
                    }}>
                      Our parking facility offers affordable and secure parking for both bikes and cars. With numbers of slots available, you can rest assured that there will be plenty of space for your vehicle. Our lot is equipped with surveillance cameras and security personnel, ensuring that your vehicle stays safe during your visit.
                    </Text>
                  </View>
                  {/* <View>
                    <Text style={{
                      ...FONTS.h4,
                      marginTop: 20,
                      marginHorizontal: SIZES.padding
                    }}>Select Vehicle Type</Text>
                    <View style={{
                      marginTop: 10
                    }}>
                      {
                        details?.four_wheeler?.no_slot > 0 &&
                        <Pressable
                          // onPress={() => setSelected('bike')}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            backgroundColor: '#f2f2f2ff',
                            marginHorizontal: 15,
                            marginVertical: 5,
                            paddingVertical: 15,
                            // borderColor: selected == 'bike' ? '#0054fdff' : '#f2f2f2ff',
                            borderWidth: 2,
                            borderRadius: 15
                          }}>
                          <MaterialIcon
                            name='bike'
                            size={25}
                          />
                          <View style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            alignSelf: 'flex-start'
                          }}>
                            <Text style={{ ...FONTS.h4 }}>Bike</Text>
                            <Text style={{
                              ...FONTS.h5,
                              color: '#1987ff'
                            }}>{`Rs. ${details?.two_wheeler?.rate} `}<Text style={{
                              ...FONTS.body4,
                              color: '#707C80'
                            }}>/hr</Text></Text>
                          </View>
                          <Text style={{
                            ...FONTS.body4,
                            color: '#707C80'
                          }}>
                            <Text>{`${details?.two_wheeler?.no_slot} `}</Text>
                            spaces left
                          </Text>
                        </Pressable>
                      }
                      {
                        details?.four_wheeler?.no_slot > 0 &&
                        <Pressable
                          // onPress={() => setSelected('car')}
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            backgroundColor: '#f2f2f2ff',
                            marginHorizontal: 15,
                            marginVertical: 5,
                            paddingVertical: 15,
                            borderRadius: 15,
                            // borderColor: selected == 'car' ? '#0054fdff' : '#f2f2f2ff',
                            borderWidth: 2,
                          }}>
                          <MaterialIcon
                            name='car'
                            size={27}
                          />
                          <View>
                            <Text style={{ ...FONTS.h4 }}>Car</Text>
                            <Text style={{
                              ...FONTS.h5,
                              color: '#1987ff'
                            }}>{`Rs. ${details?.four_wheeler?.rate} `}<Text style={{
                              ...FONTS.body4,
                              color: '#707C80'
                            }}>/hr</Text></Text>
                          </View>
                          <Text style={{
                            ...FONTS.body4,
                            color: '#707C80'
                          }}>
                            <Text>{`${details?.four_wheeler?.no_slot} `}</Text>
                            spaces left
                          </Text>
                        </Pressable>
                      }
                    </View>
                  </View> */}
                </TriggeringView>
              </View>
            </ImageHeaderScrollView>
            :
            <LoadingScreen />
        }
        <View style={{
          backgroundColor: 'white',
          height: 80
        }}>
          <TouchableOpacity
            // onPress={async function schedulePushNotification() {
            //   await Notifications.scheduleNotificationAsync({
            //     content: {
            //       title: "ParkPin 📬",
            //       body: 'Your reservation request has been sent'
            //     },
            //     trigger: { seconds: 2 },
            //   });
            // }}
            onPress={() => navigation.navigate('book', { item: details })}
            // onPress={handlePresentModalPress}
            style={{
              backgroundColor: COLORS.green,
              margin: SIZES.padding2,
              padding: SIZES.padding2,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: SIZES.padding2
            }}>
            <Text style={{
              ...FONTS.h5,
              color: 'white',
            }}>{`Reserve Parking Space`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 15
  },
  contentContainer: {
    flex: 1,
  },
});

export default ParkingDetails