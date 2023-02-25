import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyParking } from '../../redux/action';
import { COLORS } from '../../constants';
import ParkingCard from '../../components/ParkingCard';

const MyParking = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { parkingSpace } = useSelector(state => state.parking);

    useEffect(() => {
        dispatch(getMyParking(user._id))
    }, [])

    console.log(parkingSpace);


    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
            <ParkingCard />
            {
                parkingSpace?.map((item) => {
                    return <Text key={item._id}>{item.publishedDate}</Text>
                })
            }
            <Text>h</Text>
        </View>
    )
}

export default MyParking