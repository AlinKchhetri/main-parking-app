import React, { useEffect, useState } from 'react';
import DatePicker, { getToday } from 'react-native-modern-datepicker';
import { ScrollView, SafeAreaView, View, Text, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { COLORS, images, lightFONTS, SIZES } from '../../constants';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons'
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import { Stepper, Slider } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { bookParking } from '../../redux/action';

const Booking = ({ navigation, route }) => {

    const { user } = useSelector(state => state.auth);
    const [selectedDate, setSelectedDate] = useState(getToday());
    const [startTime, setStartTime] = useState(new Date());
    console.log("🚀 ~ file: Booking.js:15 ~ Booking ~ startTime:", startTime)
    const [endTime, setEndTime] = useState(new Date(moment().add(1, 'h')));
    console.log("🚀 ~ file: Booking.js:17 ~ Booking ~ endTime:", endTime)
    const [startTimeModal, setStartTimeModal] = useState(false);
    const [endTimeModal, setEndTimeModal] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentValue, setCurrentValue] = useState('bike');
    const [item, setItem] = useState();
    const [selected, setSelected] = useState('bike');
    const [duration, setDuration] = useState(1);

    const dispatch = useDispatch();

    useEffect(() => {
        if (route.params) {
            setItem(route.params.item)
        }
    }, [])

    useEffect(() => {
        const newEndTime = moment().add(duration, 'h')
        setEndTime(new Date(newEndTime));
    }, [duration])



    const showDatePicker = () => {
        setModalVisible(true);
    };

    const getHours = (start, end) => {
        const hours = end.getTime() - start.getTime() / (1000 * 60 * 60);
        return hours;
    }

    const getTotal = () => {
        if (selected === 'bike') {
            return (Math.round(item?.two_wheeler?.rate * Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))))
        } else {
            return (Math.round(item?.four_wheeler?.rate * Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))))
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: COLORS.white,
            padding: SIZES.padding
        }}>
            <StatusBar barStyle={'light-content'} />
            <ScrollView style={{
                flex: 1
            }}>
                <Text style={{
                    ...lightFONTS.h4,
                    marginTop: 20,
                    marginHorizontal: SIZES.padding
                }}>Select Date</Text>
                <DatePicker
                    options={{
                        mainColor: '#005df4ff',
                    }}
                    selected={selectedDate}
                    mode={'calendar'}
                    onSelectedChange={date => setSelectedDate(date)}
                />
                <DateTimePickerModal
                    isVisible={startTimeModal}
                    mode="time"
                    themeVariant='light'
                    // minimumDate={startTime}
                    onConfirm={(time) => {
                        setStartTime(time);
                        setStartTimeModal(false);
                    }}
                    date={startTime}
                    onCancel={() => setStartTimeModal(false)}
                />
                <DateTimePickerModal
                    isVisible={endTimeModal}
                    mode="time"
                    themeVariant='light'
                    // minimumDate={endTime}
                    onConfirm={(time) => {
                        setEndTime(time);
                        setEndTimeModal(false);
                    }}
                    date={endTime}
                    onCancel={() => setEndTimeModal(false)}
                />
                <View>
                    <Text style={{
                        ...lightFONTS.h4,
                        marginTop: 20,
                        marginHorizontal: SIZES.padding
                    }}>Select Vehicle Type</Text>
                    <View style={{
                        marginTop: 10
                    }}>
                        {
                            item?.four_wheeler?.no_slot > 0 &&
                            <Pressable
                                onPress={() => setSelected('bike')}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    backgroundColor: '#f2f2f2ff',
                                    marginHorizontal: 15,
                                    marginVertical: 5,
                                    paddingVertical: 15,
                                    borderColor: selected == 'bike' ? '#0054fdff' : '#f2f2f2ff',
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
                                    <Text style={{ ...lightFONTS.h4 }}>Bike</Text>
                                    <Text style={{
                                        ...lightFONTS.h5,
                                        color: '#1987ff'
                                    }}>{`Rs. ${item?.two_wheeler?.rate} `}<Text style={{
                                        ...lightFONTS.body4,
                                        color: '#707C80'
                                    }}>/hr</Text></Text>
                                </View>
                                <Text style={{
                                    ...lightFONTS.body4,
                                    color: '#707C80'
                                }}>
                                    <Text>{`${item?.two_wheeler?.no_slot} `}</Text>
                                    spaces left
                                </Text>
                            </Pressable>
                        }
                        {
                            item?.four_wheeler?.no_slot > 0 &&
                            <Pressable
                                onPress={() => setSelected('car')}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    backgroundColor: '#f2f2f2ff',
                                    marginHorizontal: 15,
                                    marginVertical: 5,
                                    paddingVertical: 15,
                                    borderRadius: 15,
                                    borderColor: selected == 'car' ? '#0054fdff' : '#f2f2f2ff',
                                    borderWidth: 2,
                                }}>
                                <MaterialIcon
                                    name='car'
                                    size={27}
                                />
                                <View>
                                    <Text style={{ ...lightFONTS.h4 }}>Car</Text>
                                    <Text style={{
                                        ...lightFONTS.h5,
                                        color: '#1987ff'
                                    }}>{`Rs. ${item?.four_wheeler?.rate} `}<Text style={{
                                        ...lightFONTS.body4,
                                        color: '#707C80'
                                    }}>/hr</Text></Text>
                                </View>
                                <Text style={{
                                    ...lightFONTS.body4,
                                    color: '#707C80'
                                }}>
                                    <Text>{`${item?.four_wheeler?.no_slot} `}</Text>
                                    spaces left
                                </Text>
                            </Pressable>
                        }
                    </View>
                </View>
                <Text style={{
                    ...lightFONTS.h4,
                    marginTop: 20,
                    marginHorizontal: SIZES.padding
                }}>Duration</Text>
                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    margin: 10,
                }}>
                    <Slider
                        value={duration}
                        minimumValue={1}
                        maximumValue={12}
                        step={1}
                        thumbTintColor='#0054fdff'
                        minimumTrackTintColor='#0054fdff'
                        containerStyle={{
                            flex: 1,
                            marginHorizontal: 15
                        }}
                        onValueChange={(value) => {
                            const newEndTime = moment().add(value, 'h')
                            console.log("🚀 ~ file: Booking.js:194 ~ Booking ~ newEndTime:", newEndTime)
                            setEndTime(new Date(newEndTime));
                            setDuration(value);
                        }}
                    />
                    <SimpleIcon
                        name='minus'
                        size={25}
                        onPress={() => {
                            if (duration <= 1) return;
                            setDuration(duration - 1)
                        }}
                    />
                    <Text style={{
                        ...lightFONTS.h4, color: '#0054fdff'
                    }}>{duration} hrs</Text>
                    <SimpleIcon
                        name='plus'
                        size={25}
                        onPress={() => {
                            if (duration >= 12) return;
                            setDuration(duration + 1)
                        }}
                    />
                </View> */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'flex-end',
                    marginTop: 10
                }}>
                    <View>
                        <Text style={{ ...lightFONTS.h5, marginBottom: 10 }}>Start Hour</Text>
                        <TouchableOpacity
                            onPress={() => setStartTimeModal(true)}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#f2f2f2ff',
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                borderRadius: 15
                            }}>
                            <Text style={{ ...lightFONTS.body3, marginRight: 15 }}>{moment(startTime).format('LT')}</Text>
                            <MaterialIcon
                                name='clock-outline'
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    <MaterialIcon
                        name='ray-start-arrow'
                        size={25}
                        style={{
                            marginBottom: 15
                        }}
                    />
                    <View>
                        <Text style={{ ...lightFONTS.h5, marginBottom: 10 }}>End Hour</Text>
                        <TouchableOpacity
                            onPress={() => setEndTimeModal(true)}
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#f2f2f2ff',
                                paddingHorizontal: 20,
                                paddingVertical: 15,
                                borderRadius: 15
                            }}>
                            <Text style={{ ...lightFONTS.body3, marginRight: 15 }}>{moment(endTime).format('LT')}</Text>
                            <MaterialIcon
                                name='clock-outline'
                                size={25}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                flex: 0.15,
                // flexDirection: 'row',
                // justifyContent: 'space-between',
                // alignItems: 'center',
            }}>
                {/* <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <MaterialIcon
                        name='office-building-marker-outline'
                        size={30}
                    />
                    <Text style={{
                        ...lightFONTS.body3,
                        color: '#707C80'
                    }}>
                        <Text>123 </Text>
                        spaces left
                    </Text> */}
                {/* <Text>{(endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60)}</Text> */}
                {/* </View> */}
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
                    onPress={() => {
                        dispatch(bookParking(user._id, item.ownerDetails._id, item._id, startTime, endTime, selected)).then(() => {
                            navigation.navigate('HomeStack', { screen: 'home' })
                        });
                        // console.log(item)
                        console.log(user._id, item.ownerDetails._id, item._id, startTime, endTime, selected)
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
                    }}>
                        {/* {`Reserve for: Rs.${Math.round(selected === 'bike' ? item?.two_wheeler?.rate : item?.four_wheeler?.rate * (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))}`} */}
                        Reserve for: Rs. {getTotal()}
                    </Text>
                    {/* <Text style={{
                        ...lightFONTS.h5,
                        color: 'white',
                    }}>{Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60))} hrs</Text> */}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Booking;