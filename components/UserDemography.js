import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import {
    ProgressChart
} from "react-native-chart-kit";

const UserDemography = () => {

    const { userDetails } = useSelector(state => state.parking);
    const grouped = (userDetails?.userDetails || []).reduce((acc, { role }) => {
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const percentages = Object.entries(grouped).map(([role, count]) => ({
        role,
        percentage: (count / userDetails?.userDetails?.length) * 100,
    }));

    const userDemography = percentages.map(({ percentage }) => percentage / 100);

    return (
        userDetails ?
            <ProgressChart
                data={{
                    labels: ['User', 'Owner', 'Admin'],
                    data: userDemography
                }}
                width={Dimensions.get('window').width - 50}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 2,
                    paddingRight: 60,
                    labelColor: (opacity = 1) => `rgba(112, 124, 128, ${opacity})`,
                    color: (opacity = 1) => `rgba(0, 95, 212, ${opacity})`
                }}
                style={{
                    // flex: 1,
                    marginVertical: 8,
                    marginHorizontal: 10,
                    borderRadius: 10
                }}
            />
            : null
    )
}

export default UserDemography

const styles = StyleSheet.create({})