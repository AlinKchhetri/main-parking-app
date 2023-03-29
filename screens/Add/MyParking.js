import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyParking } from '../../redux/action';
import { COLORS, lightFONTS } from '../../constants';
import ParkingList from '../../components/ParkingList';
import { Chip } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

const MyParking = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { parkingSpace } = useSelector(state => state.parking);

    const [selectedFilter, setSelectedFilter] = useState('all')

    useEffect(() => {
        dispatch(getMyParking(user._id))
    }, [])

    console.log(parkingSpace);

    const CustomChip = (props) => {
        return (
            <TouchableOpacity
                onPress={props.press}
                style={{
                    flex: 1,
                    height: 45,
                    backgroundColor: selectedFilter === 'all' ? 'blue' : 'grey',
                }}>
                <Text style={{ ...lightFONTS.body4, padding: 10 }}>{props.title}</Text>
            </TouchableOpacity>
        );
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: 30
            }}>
                <Text style={{ ...lightFONTS.h2 }}>My Parking Spaces</Text>
                <Feather
                    name='plus'
                    size={30}
                    onPress={() => navigation.navigate('HomeStack', {
                        screen: 'add'
                    })} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {
                    parkingSpace?.map((item) => <ParkingList key={item._id} item={item} />)
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyParking;

const styles = StyleSheet.create({
    container: {
        margin: 15
    }
});