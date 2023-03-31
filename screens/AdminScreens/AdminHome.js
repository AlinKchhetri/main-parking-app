import { SafeAreaView, Dimensions, ScrollView, StatusBar, RefreshControl, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import { COLORS, SIZES, lightFONTS, darkFONTS, icons, images } from '../../constants'
import { Avatar, Card } from 'react-native-ui-lib';
import {
    LineChart
} from "react-native-chart-kit";
import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux'
import { Colors } from 'react-native-paper';
import moment from 'moment';
import { getAllUser, getAllParking, getTotalSales, getMonthlySales, getTotalEarnings, getMonthlyEarnings } from '../../redux/action';
import UserDemography from '../../components/UserDemography';

const AdminHome = ({ navigation }) => {
    const dispatch = useDispatch();

    const [refreshing, setRefreshing] = useState(false);
    const { user, loading, error } = useSelector(state => state.auth);
    const { totalSales, monthlySales } = useSelector(state => state.sales);
    const { totalEarnings, monthlyEarnings } = useSelector(state => state.earnings);
    const { parkingSpace, userDetails, loading: parkingLoading, message } = useSelector(state => state.parking);

    const userCount = userDetails?.count;

    const grouped = (userDetails?.userDetails || []).reduce((acc, { role }) => {
        acc[role] = (acc[role] || 0) + 1;
        return acc;
    }, {});

    const percentages = Object.entries(grouped).map(([role, count]) => ({
        role,
        percentage: (count / userDetails?.userDetails?.length) * 100,
    }));

    const userDemography = percentages.map(({ percentage }) => percentage / 100);



    const parkingCount = parkingSpace?.length;


    const sales = totalSales?.totalSales[0]?.total_sales;
    const monthly_sales = monthlySales?.salesDetails;

    const earnings = totalEarnings?.totalEarnings[0]?.total_earnings;
    const monthly_earnings = monthlyEarnings?.commissionDetails;

    const SalesLabels = monthly_sales?.map(item => {
        const [year, month] = item._id.split('-');
        const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'short' });
        return monthName;
    });

    const SalesData = [
        {
            data: monthly_sales?.map(item => item.total_sales)
        }
    ];

    // const EarningsLabels = monthly_earnings?.map(item => {
    //     const [year, month] = item._id.split('-');
    //     const monthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'short' });
    //     return monthName;
    // });

    // const EarningsData = [
    //     {
    //         data: monthly_earnings?.map(item => item.total_sales)
    //     }
    // ];

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getAllUser());
        dispatch(getAllParking());
        dispatch(getTotalSales());
        dispatch(getMonthlySales());
        dispatch(getTotalEarnings());
        dispatch(getMonthlyEarnings());
        setRefreshing(false);
    }

    useEffect(() => {
        onRefresh()
    }, []);

    const Card = (props) => {
        return (
            <TouchableOpacity
                onPress={props.press}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: Colors.white,
                    borderRadius: 10,
                    margin: 10,
                    padding: 10,
                }}>
                <View style={{
                    backgroundColor: COLORS.gray,
                    padding: 8,
                    borderRadius: 100,
                    margin: 6,
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    overflow: 'hidden'
                }}>
                    {props.icon}
                </View>
                <View>
                    <Text style={{
                        ...lightFONTS.h5,
                        fontSize: 14,
                        color: COLORS.grey,
                        margin: 5
                    }}>{props.label}</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        marginLeft: 5
                    }}>
                        {
                            props.showRuppees &&
                            <Image source={icons.rupees} resizeMode='cover' style={{ width: 30, height: 30 }} />
                        }
                        <Text style={{
                            ...lightFONTS.h5,
                            // fontSize: 14,

                        }}>{props.information}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.homeHeader}>
                <Icon
                    name='ios-menu-outline'
                    size={30}
                // onPress={() => navigation.openDrawer()}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity style={{
                        marginLeft: 20
                    }} onPress={() => navigation.navigate('MyProfile')}>
                        <Avatar
                            size={50}
                            animate={true}
                            name={user.name}
                            useAutoColors
                            source={{ uri: user.avatarUrl.url }}
                            autoColorsConfig={user.name}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                contentContainerStyle={{
                    flexDirection: 'column',
                    marginHorizontal: 15,
                    paddingBottom: 80
                }}>
                <Text style={{ ...lightFONTS.h3, marginHorizontal: 15 }}>Dashboard</Text>
                <View style={{
                    // flex: 1,
                    flexDirection: 'column',
                    // flexGrow: 1
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Card
                            label='Sales'
                            information={sales?.toLocaleString()}
                            showRuppees={true}
                            icon={
                                <Icon
                                    name='ios-wallet'
                                    size={25}
                                    color='#005fd4ff'
                                />
                            }
                        />
                        <Card
                            label='Earnings'
                            information={earnings?.toLocaleString()}
                            showRuppees={true}
                            icon={
                                <FoundationIcon
                                    name='dollar'
                                    size={25}
                                    color='#005fd4ff'
                                />
                            }
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Card
                            label='Users'
                            information={userDetails?.count}
                            press={() => navigation.navigate('AdminUsers')}
                            icon={
                                <Icon
                                    name='ios-people'
                                    size={25}
                                    color='#005fd4ff'
                                />
                            }
                        />
                        <Card
                            label='Posts'
                            information={parkingSpace?.length}
                            press={() => navigation.navigate('AdminParkingSpaces')}
                            icon={
                                <MaterialIcon
                                    name='newspaper-variant'
                                    size={25}
                                    color='#005fd4ff'
                                />
                            }
                        />
                    </View>
                </View>
                {
                    monthly_sales &&
                    <>
                        <Text style={{ ...lightFONTS.h5, marginHorizontal: 15, marginTop: 10, marginBottom: 5 }}>Monthly Sales</Text>

                        <LineChart
                            data={{
                                labels: SalesLabels,
                                datasets: SalesData
                            }}
                            width={Dimensions.get("window").width - 50} // from react-native
                            height={220}
                            segments={3}
                            // yAxisLabel="Rs."
                            // yAxisSuffix="k"
                            // transparent
                            // withVerticalLabels={false}
                            // withHorizontalLabels={false}
                            withHorizontalLines={false}
                            // withVerticalLines
                            yAxisInterval={1} // optional, defaults to 1
                            yLabelsOffset={2}

                            // withShadow={false}
                            // withDots={false}
                            withInnerLines={false}
                            withOuterLines={false}
                            chartConfig={{
                                backgroundColor: COLORS.white,
                                backgroundGradientFrom: COLORS.white,
                                backgroundGradientTo: COLORS.white,
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(0, 95, 212, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(112, 124, 128, ${opacity})`,
                                propsForDots: {
                                    r: "5",
                                    strokeWidth: "3",
                                    stroke: COLORS.gray
                                }
                            }}
                            bezier
                            style={{
                                // flex: 1,
                                marginVertical: 8,
                                marginHorizontal: 10,
                                // padding: SIZES.padding,
                                borderRadius: 10
                            }}
                        />
                    </>
                }
                <Text style={{ ...lightFONTS.h5, marginHorizontal: 15, marginTop: 10, marginBottom: 5 }}>User Demography</Text>
                <UserDemography />
            </ScrollView>
        </SafeAreaView >
    )
}

export default AdminHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    homeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.padding2,
    },
})