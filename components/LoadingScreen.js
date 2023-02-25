import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const LoadingScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size='large' color='black' />
    </View>
  )
}

export default LoadingScreen

const styles = StyleSheet.create({})