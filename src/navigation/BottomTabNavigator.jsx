import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import ReportExtract from '../screens/bottomtab/ReportExtract'
import ReportImpacted from '../screens/bottomtab/ReportImpacted'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IonIcon from 'react-native-vector-icons/Ionicons';
import CrudHoliday from '../screens/CrudHoliday'
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIClient,{  host } from '../../lib/react-native-api-client';
import CrudDayoff from '../screens/CrudDayoff'

const Tab = createBottomTabNavigator()  
const BottomTabNavigator = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem('@token')
    const response = await  fetch(`${host}/authen`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ accessToken
      },
      
    })
    const data = await response.json()
    setUser(data.decoded)
    console.log(data)
    if (data.status === 'ok') {
     // fetchUser()
      setIsLoading(false)
     return
    }
    if (data.status === 'error') {
      navigation.navigate('Login')
      setIsLoading(true)
      console.log('Profile')
      return
    }
  }
  useEffect(() => {
    fetchUser()
  }, [isLoading])


  return (
  
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#fff176',
        tabBarInactiveTintColor: '#e0f7fa',
        tabBarStyle: {
          backgroundColor: 'teal',
          height: 56,
          fontSize: 20,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
      }}>
      <Tab.Screen
        name="ReportExtract"
        component={ReportExtract}
        options={{
          tabBarLabel: 'รายชื่อตรวจฟัน - ถอนฟัน',
          tabBarIcon: ({ color, size }) => (
            <IonIcon name="person-circle-sharp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ReportImpacted"
        component={ReportImpacted}
        options={{
          tabBarLabel: 'รายชื่อผ่าฟันคุด',
          tabBarIcon: ({ color, size }) => (
            <IonIcon name="person-circle-sharp" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CrudDayoff"
        component={CrudDayoff}
        options={{
          tabBarLabel: 'ตั้งค่าวันหยุด',
          tabBarIcon: ({ color, size }) => (
            <IonIcon name="calendar" color={color} size={size} />
          ),
        }}
      />

        <Tab.Screen
        name="CrudHoliday"
        component={CrudHoliday}
        options={{
          tabBarLabel: 'ตั้งค่าวันหยุดราชการ',
          tabBarIcon: ({ color, size }) => (
            <IonIcon name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
   
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})
