import { View, Text, TouchableOpacity, StatusBar, Share, StyleSheet, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS, darkFONTS, lightFONTS, SIZES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { bookParking } from '../../redux/action';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { ImageHeaderScrollView, TriggeringView } from 'react-native-image-header-scroll-view';
import LoadingScreen from '../../components/LoadingScreen';
import * as Notifications from 'expo-notifications';

const ParkingDetails = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { location } = useSelector(state => state.location);
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (route.params) {
      // console.log("🚀 ~ file: ParkingDetails.js:16 ~ useEffect ~ route", route)
      setDetails(route.params.space)
    }
  }, [route])

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
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <TouchableOpacity onPress={handleBooking} style={{ backgroundColor: COLORS.green, justifyContent: 'center', alignItems: 'center', width: '80%', height: 50 }}>
        <Text style={{ ...darkFONTS.h4 }}>Book</Text>
      </TouchableOpacity> */}
      <StatusBar barStyle={'light-content'} />
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
                    ...lightFONTS.h4
                  }}>{`Paid Parking at \nPutalisadak, Kathmandu`}</Text>
                  <Text style={{
                    ...lightFONTS.h3,
                    color: '#1987ff'
                  }}>Rs. {details.two_wheeler && details.two_wheeler.rate}<Text style={{
                    ...lightFONTS.body3,
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
                  <Text style={{
                    ...lightFONTS.body4,
                    marginLeft: 5,
                    color: '#707C80'
                  }}>Putalisadak, Kathmandu</Text>
                </View>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 10
                }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <MaterialIcon
                      name='bike'
                      size={25}
                      // color='#1987ff'
                      style={{
                        marginLeft: 10
                      }}
                    />
                    <MaterialIcon
                      name='car'
                      size={27}
                      // color='#1987ff'
                      style={{
                        marginHorizontal: 20
                      }}
                    />
                  </View>
                  <Text style={{
                    ...lightFONTS.body3,
                    color: '#707C80'
                  }}>
                    <Text>{details.two_wheeler && details.two_wheeler.no_slot} </Text>
                    spaces left
                  </Text>
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
                      // Linking.openURL(`maps:0,0?q=ParkPin Parking Space@${details.location.coordinates[1]},${details.location.coordinates[0]}`);
                      // Linking.openURL(`maps://app?daddr=${details.location.coordinates[1]},${details.location.coordinates[0]}`);
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
                    ...lightFONTS.h5,
                    marginBottom: 10
                  }}>Description</Text>
                  <Text style={{
                    color: '#707C80',
                  }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                </View>
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
          onPress={async function schedulePushNotification() {
            await Notifications.scheduleNotificationAsync({
              content: {
                title: "ParkPin 📬",
                body: 'Your reservation request has been sent'
              },
              trigger: { seconds: 2 },
            });
          }}
          style={{
            backgroundColor: COLORS.green,
            margin: SIZES.padding2,
            padding: SIZES.padding2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SIZES.padding2
          }}>
          <Text style={{
            ...lightFONTS.h5,
            color: 'white',
          }}>{`Reserve Parking Space`}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 15
  }
});

export default ParkingDetails