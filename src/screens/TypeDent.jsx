import React, { useEffect, useState } from 'react'
import TypedentCard from '../../components/TypedentCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import APIClient,{  host } from '../../lib/react-native-api-client';
import { ConnectionInternet} from '../../lib/ConnectionInternet';

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native'

const { width, height } = Dimensions.get('screen')

const TypeDent = props => {
  
  const [AppName, setAppName] = useState('')
  const [AppLastname, setAppLastname] = useState('')
  const [AppCid, setAppCid] = useState('')
  const [AppTele, setAppTele] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [TypeDents, setTypeDent] = useState([])

  const backIcon = require('../assets/images/register/back.png')
  const background = require('../assets/images/register/background.png')


  useEffect(() => {
    getType()
   
  }, [isLoading])



    const getType = async () => {
      fetch(`${host}/get_type`)
        .then(res => res.json())
        .then(
          result => {
            setTypeDent(result)
            setIsLoading(false)
            // console.log('fetchHolidays', result)
          //  console.log('1')
          },
  
          error => {
            console.log(error)
          },
        )
  
    }

  // สร้างฟังก์ชันกลับไปหน้า inputRegister
  const onGoBackPress = () => {
    props.navigation.goBack()
  }

  return (
    <View style={styles.container}>
    {isLoading ? (
      <View style={styles.horizontal}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      
    <SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          resizeMode="cover">
            <View style={styles.headerIconView}>
              <TouchableOpacity
                style={styles.headerBackButtonView}
                onPress={onGoBackPress}>
                <Image
                  source={backIcon}
                  style={styles.backButtonIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
             
            </View>
           
            {TypeDents.map(getTypeDent => (
              <TypedentCard
                navigation={props.navigation}
                key={getTypeDent.dental_t}
                getTypeDent={getTypeDent}
              />
            ))}
    
          </ImageBackground>
          
          </View>
      </ScrollView>
    </SafeAreaView>
       )}
       </View>
  )
}

export default TypeDent

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  background: {
    width,
    height,
  },

  headerIconView: {
    marginTop: 20,
    marginLeft: 20,
    backgroundColor: 'transparent',
    
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25,
  },
  horizontal: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
