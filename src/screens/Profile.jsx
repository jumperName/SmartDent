import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem('@token')
    const response = await fetch('http://192.168.201.14:3333/authen', {
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
      setIsLoading(false)

    }
    if (data.status === 'error') {
      navigation.navigate('Login')

      setIsLoading(false)
      console.log('login')
    
    }
  }
  useEffect(() => {
    fetchUser()
  }, [isLoading])

  return (
    <View>
      { isLoading ? 
       <Text>ข้อมูลผิดพลาด</Text>
       : 
        <View>  
          <Text>test</Text>
        </View>
      }
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
