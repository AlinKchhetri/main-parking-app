import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { COLORS, FONTS, darkFONTS, images } from '../../constants'
import Toast from 'react-native-toast-message'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';


const MapView = () => {
  const dispatch = useDispatch();
  const { locationValue } = useSelector(state => state.location);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState(27.729736);
  const [longitude, setLongitude] = useState(85.309125);
  const [marker, setMarker] = useState({
    latitude: 27.755922803682985,
    longitude: 85.32136381529808
  });

  useEffect(() => {
    if (locationValue) {
      setLatitude(locationValue.coords.latitude);
      setLongitude(locationValue.coords.longitude);
    }
  }, [locationValue])


  console.log(latitude, longitude + 'gg', marker);


  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLORS.white }}>
      <MapView style={{ width: '100%', height: '100%' }}
        region={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        provider="google"
      >
        <Marker
          coordinate={marker}
          title='test'
          draggable={true}
          onDragStart={(e) => e.nativeEvent.coordinate}
          onDragEnd={(e) => {
            setMarker({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }}
        >
          <Image source={images.marker} style={{ width: 45, height: 45 }} />
        </Marker>
      </MapView>
      <GooglePlacesAutocomplete
        placeholder='Search'
        fetchDetails={true}
        GooglePlacesSearchQuery={{
          rankby: 'distance'
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          // key: 'AIzaSyBryyr_7nreCmC5MDMxaAYkryJZ6oHNJjE',
          key: '',
          language: 'en',
        }}
        styles={{
          container: { flex: 0, position: 'absolute', top: 50, width: '80%', height: '100%', zIndex: 1 },
          listView: { backgroundColor: COLORS.white }
        }}
      />
    </View>
  )
}

export default MapView