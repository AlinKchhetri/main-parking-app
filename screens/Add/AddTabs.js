import { SafeAreaView, View, Platform, StatusBar, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Add from './Add';
import { Icon } from 'react-native-vector-icons/MaterialIcons';
import MyParking from './MyParking';
import { COLORS, icons, SIZES } from "../../constants"

const Tab = createMaterialTopTabNavigator();

const AddTabs = () => {
    return (
        <SafeAreaView style={{
            flex: 1, backgroundColor: '#fff',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
        }}>
            <Tab.Navigator initialRouteName='Add'>
                <Tab.Screen name="Add" component={Add} options={{
                    title: 'Add'
                }} />
                <Tab.Screen name="My Parking" component={MyParking} options={{
                    title: 'My Parking Spaces'
                }} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

export default AddTabs;
