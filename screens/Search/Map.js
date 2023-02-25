import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Platform, Text, View, Animated, StyleSheet, TouchableOpacity, Image, Dimensions, Linking, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { COLORS, lightFONTS, darkFONTS, images, icons, SIZES } from '../../constants'
import Toast from 'react-native-toast-message'
import { TextInput } from 'react-native-paper';
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import ParkingCard from '../../components/ParkingCard';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Searchbar } from 'react-native-paper';

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.65;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const Map = ({ navigation }) => {
  const dispatch = useDispatch();
  const { locationValue } = useSelector(state => state.location);
  const { parkingSpace, error, message } = useSelector(state => state.parking);
  // console.log("🚀 ~ file: Map.js:17 ~ Map ~ parkingSpace", parkingSpace)


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(27.755922803682985);
  const [longitude, setLongitude] = useState(85.32136381529808);
  const [marker, setMarker] = useState({
    latitude: 27.755922803682985,
    longitude: 85.32136381529808
  });
  const [searchText, setSearchText] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [showOpenMap, setShowOpenMap] = useState(false)
  const [mapLocation, setMapLocation] = useState({});

  const handleSearch = () => {
    Keyboard.dismiss();
    if (!searchText) return;
    fetch(`https://nominatim.openstreetmap.org/search?q=${searchText}-bagmati-pradesh&format=json&polygon_geojson=1&limit=5&addressdetails=1`)
      .then((response) => response.text())
      .then((result) => {
        setSearchResult(JSON.parse(result))
      })
      .catch((error) => console.log(error));
  }


  useEffect(() => {
    if (locationValue) {
      setMarker({
        latitude: locationValue.coords.latitude,
        longitude: locationValue.coords.longitude
      });
      setLatitude(locationValue.coords.latitude)
      setLongitude(locationValue.coords.longitude)
    }
  }, [locationValue]);

  const handleChooseLocation = () => {
    navigation.navigate('Add', { latitude: marker.latitude, longitude: marker.longitude });
  }

  const darkMap = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ]

  const NewMapStyle =
    [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8ec3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1a3646"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#64779e"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#4b6878"
          }
        ]
      },
      {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#334e87"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#6f9ba5"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3C7680"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#304a7d"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#2c6675"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#255763"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#b0d5ce"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#023e58"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#98a5be"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1d2c4d"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#283d6a"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3a4762"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0e1626"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#4e6d70"
          }
        ]
      }
    ]

  const StandartMapStyle = [
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]



  const openGoogleMap = () => {
    if (mapLocation) {

      const url =
        `maps:0,0?q=label@${mapLocation.latitude, mapLocation.longitude}`

      console.log(url)
    }
  }

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= parkingSpace.length) {
        index = parkingSpace.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { location } = parkingSpace[index];
          _map.current.animateToRegion(
            {
              latitude: location.coordinates[1],
              longitude: location.coordinates[0],
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = parkingSpace.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20);
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
      <MapView
        onPress={() => {
          Keyboard.dismiss();
          setSearchResult([]);
        }}
        ref={_map}
        style={{
          width: '100%',
          height: '100%'
        }}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        provider="google"
        customMapStyle={StandartMapStyle}
      >

        {
          parkingSpace &&
          parkingSpace.map((item, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale
                }
              ]
            }
            return (
              <MapView.Marker
                key={item._id}
                coordinate={{
                  latitude: item.location.coordinates[1],
                  longitude: item.location.coordinates[0]
                }}
                onPress={e => onMarkerPress(e)}
              >
                <Animated.View style={styles.markerWrap}>
                  <Animated.Image style={[{
                    width: 50, height: 50
                  }, scaleStyle]} source={icons.setMarker} />
                </Animated.View>
                {/* <Callout
                  onPress={
                    () => {
                      Linking.openURL(`maps:0,0?q=parking@${item.location.latitude},${item.location.longitude}`);

                    }

                  }
                  // onPress={() => navigation.navigate('parkingDetails', { space: item })}

                  tooltip>
                  <View style={styles.card}>
                    <Image
                      source={{ uri: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1734&q=80' }}
                      // source={{ uri: item.item.image.url}}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                    <View style={styles.textContent}>
                      <Text numberOfLines={1} style={styles.cardtitle}>123</Text>
                      <Text numberOfLines={1} style={styles.cardDescription}>abdc</Text>
                      <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                      }}>
                        <MaterialIcon
                          name='bike'
                          size={20}
                          style={{
                            marginHorizontal: 10
                          }}
                        />
                        <MaterialIcon
                          name='car'
                          size={23}
                        />
                      </View>
                    </View>
                  </View>
                </Callout> */}
              </MapView.Marker>
            )
          })
        }
        <Marker
          coordinate={marker}
        >
          <Image style={{
            width: 60, height: 60
          }} source={require('../../assets/llll.gif')} />
        </Marker>
      </MapView >
      <View style={{
        position: 'absolute',
        top: 30,
        width: Dimensions.get('window').width - 40,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
          backgroundColor: 'white',
          borderRadius: 20
        }}>
          <TextInput
            placeholder='Search'
            style={{
              backgroundColor: 'white',
              width: SIZES.width - 60,
              height: 40,
              padding: 10,
              fontSize: 15
            }}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <Icon
            onPress={handleSearch}
            name='search'
            size={25}
            color='black'
            style={{
              backgroundColor: 'white',
              padding: 6,
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15
            }}
          />
        </View> */}
        <Searchbar
          placeholder="Search Parking Spaces"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          onSubmitEditing={handleSearch}
          onIconPress={handleSearch}
          autoComplete='street-address'
          inputStyle={{
            ...lightFONTS,
            fontSize: 15,
            color: 'black'
          }}
        />
        {
          searchResult.map((item, index) => {
            return (
              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  padding: 10,
                  borderTopWidth: 0.3,
                  borderBottomWidth: 0.3,
                  borderColor: 'grey',
                }}
                onPress={() => {
                  setLatitude(Number(item.lat));
                  setLongitude(Number(item.lon));
                  setSearchText('');
                  setSearchResult([]);
                }}
                key={index}>
                <MaterialIcon
                  name='map-marker'
                  size={20}
                />
                <Text style={{
                  overflow: 'hidden',
                }}>
                  {item.display_name}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        pagingEnabled
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment='center'
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {parkingSpace.map((item) => {
          return (
            <ParkingCard key={item._id} item={item} />
          )
        })}
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding2
  },
  headerText: {
    ...lightFONTS.h2,
    marginHorizontal: SIZES.padding2,
    // top: 10,
  },
  scrollView: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 140,
    width: Dimensions.get('window').width * 0.4,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
    width: '100%',
    padding: 5,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3
  },
  textSign: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF'
  }

})

export default Map