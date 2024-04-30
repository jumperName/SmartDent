import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import ConnectionInternet, { NetworkCheck } from '../../lib/ConnectionInternet'

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
  Alert,
} from 'react-native'

const { width, height } = Dimensions.get('screen')

const InputRegister = ({ navigation, connectionType }) => {
  const background = require('../assets/images/register/background.png')
  const backIcon = require('../assets/images/register/back.png')
  const personIcon = require('../assets/images/register/signup_person.png')
  const lockIcon = require('../assets/images/register/signup_lock.png')
  const idcard = require('../assets/images/register/idcard.png')
  const calling = require('../assets/images/register/calling.png')
  const line = require('../assets/images/register/line.png')
  const dental2 = require('../img/dental2.png')
  const logox = require('../img/logox.png')

  const [AppName, setAppName] = useState('')
  const [AppLastname, setAppLastname] = useState('')
  const [AppCid, setAppCid] = useState('')
  const [AppCidtext, setAppCidtext] = useState('x-xxxx-xxxx-')
  const [AppTele, setAppTele] = useState('')
  const [errors, setErrors] = useState({})
  const [AppLine, setAppLine] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const validateForm = () => {
    let errors = {}
    if (!AppName) errors.AppName = 'กรุณากรอกชื่อ'
    if (!AppLastname) errors.AppLastname = 'กรุณากรอกนามสกุล'
    if (!AppCid) errors.AppCid = 'กรุณากรอกเลขบัตรประชาชน'
   
    if (AppCid.length < 16) {
      errors.AppCid = 'กรุณากรอกเลขบัตรประชาชน 4 ตัวสุดท้าย'
    }
     if (!AppTele) errors.AppTele = 'กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก'
    if (AppTele.length < 10) {
      errors.AppTele = 'กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก'
    }
   
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      console.log('Submitted', AppName, AppLastname, AppCid, AppTele)

      setErrors({})
      try {
        AsyncStorage.setItem('AppNames', AppName)
        AsyncStorage.setItem('AppLastnames', AppLastname)
        AsyncStorage.setItem('AppCids', AppCid)
        AsyncStorage.setItem('AppTeles', AppTele)
     
        console.log('ok')
      } catch (error) {
        console.log(error)
      }

      navigation.navigate('TypeDent')
    }
  }

  const deleteName = () => {
    AsyncStorage.removeItem('AppNames')
    AsyncStorage.removeItem('AppLastnames')
    AsyncStorage.removeItem('AppCids')
    AsyncStorage.removeItem('AppTeles')
  }

  useEffect(() => {
   errors.AppCid = 'กรอกเลขบัตรประชาชน 4 ตัวสุดท้าย'
    
      setIsLoading(false)

  }, [isLoading])

  // สร้างฟังก์ชันกลับไปหน้า Login
  const onGoLogin = () => {
    navigation.navigate('Login')
  }

  return (
    <SafeAreaView>
      <ConnectionInternet />

      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={background}
            style={styles.background}
            resizeMode="cover">
            <View style={styles.headerIconView}>
              <TouchableOpacity
                style={styles.headerlogoButtonView}
                onPress={onGoLogin}>
                <Image
                  source={logox}
                  style={styles.logoButtonIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputsContainerAll}>
              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={personIcon}
                    style={styles.inputIcon}
                    resizeMode="contain"
                  />
                </View>

                <TextInput
                  style={[styles.input, styles.whiteFont]}
                  placeholder="ชื่อ"
                  // clearTextEntry
                  // value={AppName}
                  placeholderTextColor="#0a3a66"
                  underlineColorAndroid="transparent"
                  onChangeText={setAppName}
                />
                <TextInput
                  style={[styles.input, styles.whiteFont]}
                  placeholder="นามสกุล"
                  // clearTextEntry
                  // value={AppLastname}
                  placeholderTextColor="#0a3a66"
                  underlineColorAndroid="transparent"
                  onChangeText={setAppLastname}
                />
              </View>
              <View style={styles.ValidateContainer}>
                {errors.AppName ? (
                  <Text style={styles.errorText}>{errors.AppName}</Text>
                ) : null}
                {errors.AppLastname ? (
                  <Text style={styles.errorText}>{errors.AppLastname}</Text>
                ) : null}
              </View>
              

              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={idcard}
                    style={styles.inputIcon}
                    resizeMode="contain"
                  />
                </View>
                <TextInput
                  keyboardType="numeric"
                   label ="fff"
                   value={AppCidtext}
                  style={[styles.input2, styles.whiteFont]}
               
                  maxLength={16}
                  placeholderTextColor="#0a3a66"
                  placeholder="เลขบัตรประชาชน 4 ตัวท้าย"
                  onChangeText={(text) => {
              
                    if (text.startsWith('x-xxxx-xxxx-')) {                    
                      const newCid = text.replace(/^0+/, '');
                      setAppCidtext(newCid.replace(/ /g, '').replace('+', ''));
                      setAppCid(newCid);
                    }
                  }}
                />
              </View>
              {errors.AppCid ? (
                <Text style={styles.errorText}>{errors.AppCid}</Text>
                
              ) : null}

              <View style={styles.inputContainer}>
                <View style={styles.iconContainer}>
                  <Image
                    source={calling}
                    style={styles.inputIcon}
                    resizeMode="contain"
                  />
                </View>
                {/* <Text> {SuggesCid}</Text> */}
                <TextInput
                  keyboardType="numeric"
                  // clearTextEntry
                  // value={AppTele}
                  style={[styles.input2, styles.whiteFont]}
                  placeholder="เบอร์โทรศัพท์มือถือ 10 หลัก"
                  maxLength={10}
                  placeholderTextColor="#0a3a66"
                  underlineColorAndroid="transparent"
                  onChangeText={setAppTele}
                />
              </View>
              {errors.AppTele ? (
                <Text style={styles.errorText}>{errors.AppTele}</Text>
              ) : null}

              
           
            </View>

            <View style={styles.footerContainer}>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.signup}>
                  <Text style={styles.buttonText}>ถัดไป</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default InputRegister

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  inputsContainer: {
    flex: 3,
    marginTop: 150,
  },
  inputsContainerAll: {
    flex: 3,
    marginTop: 100,
  },
  footerContainer: {
    marginBottom: '10%',
    flex: 2,
    alignSelf: 'flex-end',
  },
  headerIconView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerlogoButtonView: {
    marginTop: 100,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    // fontSize: RFPercentage(3),
  },

  logoButtonIcon: {
    width: '300%',
  },
  logoButtonIconx: {
    // marginTop:20,
    width: '40%',
    //  height:'50%',
  },

  inputs: {
    marginTop: 20,
    paddingVertical: 5,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    marginTop: '3%',
    padding: '20',
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    backgroundColor: 'white',
    width: '42%',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 50,
    fontSize: RFValue(12, 580) // second argument is standardScreenHeight(optional),
  },
  input2: {
    backgroundColor: 'white',
    marginTop: 5,
    width: '85%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'thistle',
    borderRadius: 50,
    fontSize: RFValue(12, 580) // second argument is standardScreenHeight(optional),
  },
  signup: {
    marginTop: 30,
    borderRadius: 50,
    width: 150,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  whiteFont: {
    color: '#0a3a66',
  },
  buttonText: {
    color: '#0a3a66',
    fontSize: RFValue(12, 580) // second argument is standardScreenHeight(optional),
  },

  button: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 3,
    paddingHorizontal: 10,
  },
  errorText: {
    // width: '38%',
    marginLeft: 65,
    color: 'red',
   // marginBottom: 10,
  },
  
  ValidateContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderColor: 'transparent',
    flexDirection: 'row',
  },
})
