import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LinearGradient from 'react-native-linear-gradient'
import APIClient,{  host } from '../../lib/react-native-api-client';

const Login = ({ navigation }) => {
  const [username, setusername] = React.useState('')
  const [password, setpassword] = React.useState('')
 // State variable to track password visibility 
 const [showPassword, setShowPassword] = useState(false); 
  
 // Function to toggle the password visibility state 
 const toggleShowPassword = () => { 
     setShowPassword(!showPassword); 
 };

  //const response = await fetch('https://www.melivecode.com/api/login',{
  //const response = await fetch('http://localhost:3333/login',{
  const handleLogin = async () => {
    const response = await  fetch(`${host}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    const data = await response.json()
    if (data.status === 'ok') {
      Alert.alert(data.status, data.massage, [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ])
      await AsyncStorage.setItem('@token', data.token)
      const accessToken = await AsyncStorage.getItem('@token')
    //navigation.navigate('Profile')
      navigation.navigate('BottomTabNavigator')
      //console.log(accessToken)
    } else {
      Alert.alert(data.status, data.message, [
        { text: 'OK', onPress: () => console.log('error') },
      ])
    }
  }

  return (
    <LinearGradient
      colors={['#FFCCFF', '#CC99FF', 'white']}
      style={styles.container}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../img/logox.png')}
          style={{width: 300, height: 300 }}
        />
         <View style={styles.inputContainer}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={text => setusername(text)}
          />

       
            <TextInput
              label="Password"
              secureTextEntry
              right={<TextInput.Icon icon="eye"  onPress={toggleShowPassword} />}
              value={password}
              onChangeText={text => setpassword(text)}
              secureTextEntry={!showPassword} 
             
            />
        
        </View>

        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleLogin}>
            Login
          </Button>
        </View>
      </View>
    </LinearGradient>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // maxWidth: 350,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5EE',
  },
  imageContainer: {
    alignSelf: 'center',
    paddingBottom: 20,
    marginTop:50,
  },
  inputimageContainer: {
    paddingBottom: 14,
  },
  buttonContainer: {
    Width: '50%',
    alignSelf: 'center',
  },
  inputContainer:{
    marginBottom:20,
    marginTop:20,
  }


})
