import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Navigation from './src/navigation/index'
import DrawerNavigator from './src/navigation/DrawerNavigator'


const App = () => {
  return (
   
     <Navigation/>
  )
}

export default App
