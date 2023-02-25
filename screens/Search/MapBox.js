import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Map from 'react-map-gl';
import { useSelector } from 'react-redux';

const MapBox = () => {
    const { locationValue } = useSelector(state => state.location);

    const [location, setLocation] = useState({
        latitude: locationValue.coords.latitude,
        longitude: locationValue.coords.longitude,
        zoom: 8,
        width: '100%',
        height: '100%',
    });
    console.log(location.latitude);
    return (
        <Map
            mapboxAccessToken={'pk.eyJ1IjoiYWxpbmtoYXRyaSIsImEiOiJjbDl4Mnhsdm8wNmJoM3BzNHptODZtZWE5In0.aA_tCcDKBl0EseEU44gQUw'}
            {...location}
            onViewPortChange={(newView)=>setLocation(newView)}
        />
    )
}

export default MapBox

const styles = StyleSheet.create({})