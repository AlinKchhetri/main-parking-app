import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Drawer } from 'react-native-ui-lib';
import RequestCard from '../components/RequestCard';

const Messages = () => {
    return (
        <View>
            <Drawer
                rightItems={[{ text: 'Read', background: 'green', onPress: () => console.log('read pressed') }]}
                leftItem={{ text: 'Delete', background: 'red', onPress: () => console.log('delete pressed') }}
            >
                <RequestCard />
            </Drawer>
        </View>
    )
}

export default Messages;

const styles = StyleSheet.create({})