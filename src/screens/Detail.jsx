import React, { useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import moment from 'moment'
import APIClient, { host } from '../../lib/react-native-api-client'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import ViewShot, { captureRef } from 'react-native-view-shot'
import Share from 'react-native-share'
import { CameraRoll } from '@react-native-camera-roll/camera-roll'
import RNRestart from 'react-native-restart' // Import package from node modules

import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Modal,
  BackHandler,
  Platform,
  PermissionsAndroid,
} from 'react-native'

const { width, height } = Dimensions.get('screen')

const Detail = () => {
  const backIcon = require('../assets/images/register/back.png')
  const background = require('../assets/images/register/background2.png')
  const personIcon = require('../assets/images/register/signup_person.png')
  const lockIcon = require('../assets/images/register/signup_lock.png')
  const idcard = require('../assets/images/register/idcard.png')
  const calling = require('../assets/images/register/calling.png')
  const clock = require('../assets/images/register/clock.png')
  const DateTime = require('../assets/images/register/DateTime.png')
  const check = require('../assets/images/register/check.png')

  const [openModal, setOpenModal] = useState(false)
  const [AppName, setAppName] = useState('')
  const [AppLastname, setAppLastname] = useState('')
  const [AppCid, setAppCid] = useState('')
  const [AppTele, setAppTele] = useState('')
  const [Fulltime, setFulltime] = useState('')
  const [TimeSlot, setTimeSlot] = useState('')
  const [Typedent, setTypedent] = useState('')
  const [Namedent, setNamedent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef()
  const [imageUri, setImageUri] = useState('')
  const [refreshCount, setRefreshCount] = useState(0)

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return Promise.all([
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          ),
          PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission,
        )
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        )
      }
    }

    const hasPermission = await getCheckPermissionPromise()
    if (hasPermission) {
      return true
    }
    const getRequestPermissionPromise = () => {
      if (Platform.Version >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          statuses =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED,
        )
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ).then(status => status === PermissionsAndroid.RESULTS.GRANTED)
      }
    }

    return await getRequestPermissionPromise()
  }
  const shareImage = async () => {
    try {
      const uri = await captureRef(ref, {
        format: 'png',
        quality: 0.7,
      })

      if (Platform.OS === 'android') {
        const granted = await hasAndroidPermission()
        if (!granted) {
          return
        }
      }

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo')
      if (image) {
        Alert.alert(
          '',
          'คุณบันทึกภาพสำเร็จ',
          [{ text: 'ตกลง', onPress: () => {} }],
          { cancelable: false },
        )
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const getname = async () => {
    try {
      const asccessName = await AsyncStorage.getItem('AppNames')
      const asccessLastname = await AsyncStorage.getItem('AppLastnames')
      const asccessCid = await AsyncStorage.getItem('AppCids')
      const asccessTele = await AsyncStorage.getItem('AppTeles')
      const asccessFulltime = await AsyncStorage.getItem('Fulltime')
      const asccessTimeSlot = await AsyncStorage.getItem('TimeSlot')
      const asccessTypedent = await AsyncStorage.getItem('Typedent')
      const asccessNamedent = await AsyncStorage.getItem('Namedent')

      await AsyncStorage.setItem(
        '@last_visited',
        moment().format('LT').toString(),
      )

      setAppName(asccessName)
      setAppLastname(asccessLastname)
      setAppCid(asccessCid)
      setAppTele(asccessTele)
      setFulltime(asccessFulltime)
      setTimeSlot(asccessTimeSlot)
      setTypedent(asccessTypedent)
      setNamedent(asccessNamedent)
    } catch (error) {}
    setIsLoading(false)
  }

  const refresh = async () => {
    const interval = setInterval(() => {
      if (refreshCount < 5) {
        console// Immediately reload the React Native Bundle
      
      
        setRefreshCount(refreshCount + 1)
      }
    }, 60000) // 60000 milliseconds = 1 minute 

    // Stop refreshing after 5 minutes
    setTimeout(() => {
      RNRestart.restart()
      clearInterval(interval)
    }, 300000) // 300000 milliseconds = 5 minutes

    return () => clearInterval(interval) // Clean up interval on component unmount
  }

  useEffect(() => {
    setOpenModal(true)
    refresh()
    getname()
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    )
    return () => backHandler.remove()
  }, [isLoading])

  function renderModal() {
    return (
      <Modal visible={openModal} animationOutTiming={750} transparent={true}>
        <View style={styles.container}>
          <View style={styles.ModalContainer}>
            <Image
              source={check}
              style={styles.inputIcon}
              resizeMode="contain"
            />
            <Text
              style={{
                color: 'black',
                fontSize: RFValue(12, 580), // second argument is standardScreenHeight(optional),
                padding: '50',
              }}>
              บันทึกข้อมูลสำเร็จ!!
            </Text>

            <View style={styles.TextContainer}>
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <Text style={styles.TextModalCancel}>ปิด</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
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
                <View style={styles.headerContainer}>
                  <View style={styles.headerIconView}>
                    {renderModal()}
                    <ViewShot
                      options={{
                        fileName: 'myscreenshot',
                        fotmat: 'jpg',
                        quality: 0.9,
                      }}
                      ref={ref}>
                      <View style={styles.ViewContainerState}>
                        <Text
                          style={{
                            color: 'white',
                            //fontWeight: 'bold',
                            fontSize: RFValue(12, 580),// second argument is standardScreenHeight(optional),
                          }}>
                          คลินิกทันตกรรม (ชั้น2) 
                        </Text>
                        <Text
                          style={{
                            color: 'white',
                            //fontWeight: 'bold',
                            fontSize: RFValue(12, 580),
                          }}>
                        โรงพยาบาลม่วงสามสิบ
                        </Text>
                      </View>
                      <View style={styles.ViewContainer}>
                        {
                          <Text style={styles.StyleText}>
                            รายละเอียดการจองคิว
                          </Text>
                        }

                        <View style={styles.TextContainer}>
                          <Text style={styles.StyleText}>นัดแผนก</Text>
                        </View>

                        <View style={styles.TextContainer}>
                          <Text style={styles.DatailText}>{Namedent}</Text>
                        </View>

                        <View style={styles.TextContainer}>
                          <Text style={styles.StyleText}>ชื่อ - นามสกุล</Text>
                        </View>

                        <View style={styles.TextContainer}>
                          <Text style={styles.DatailText}>
                            {AppName} {AppLastname}
                          </Text>
                        </View>

                        <View style={styles.TextContainer}>
                          <Text style={styles.StyleText}>
                            บัตรประจำตัวประชาชน
                          </Text>
                        </View>
                        <View style={styles.TextContainer}>
                          <Text style={styles.DatailText}>{AppCid}</Text>
                        </View>

                        <View style={styles.TextContainer}>
                          <Text style={styles.StyleText}>
                            วันที่{' '}
                            {moment(Fulltime)
                              .add(543, 'year')
                              .format('DD-MM-YYYY')}{' '}
                          </Text>
                        </View>
                        <View style={styles.TextContainer}>
                          <Text style={styles.StyleText}>
                            เวลา {TimeSlot} {} น.
                          </Text>
                        </View>
                        <View style={styles.TextContainer}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 15,
                            }}>
                            หมายเหตุ กรุณา * ยืนยันตัวตนก่อนเวลานัดอย่างน้อย 10 - 20 นาที
                            หากมาสายกว่าเวลานัด 10 นาทีจะไม่ได้รับบริการ
                          </Text>
                        </View>
                      </View>
                    </ViewShot>
                    <View style={styles.ViewSave}>
                      <TouchableOpacity onPress={shareImage}>
                        <Text
                          style={{
                            fontSize: 20,
                            marginTop: 10,
                            color: 'white',
                            backgroundColor: 'skyblue',
                            borderRadius: 5,
                            padding: 10,
                          }}>
                          บันทึกหลักฐานการจองคิว
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  background: {
    width,
    height,
  },
  inputsContainer: {
    flex: 3,
    marginTop: 150,
  },
  footerContainer: {
    flex: 1,
    alignSelf: 'center',
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

  inputs: {
    width: 50,
    paddingVertical: 15,
  },
  TextContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCCCCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    marginTop: 10,
  },
  ViewContainer: {
    padding: 10,
    paddingHorizontal: 25,
    marginLeft: 30,
    width: '85%',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#00994C',
    backgroundColor: 'white',
    marginTop: 10,
  },
  ViewContainerState: {
    borderColor: 'transparent',

    padding: 10,
    paddingHorizontal: 25,
    marginLeft: 30,
    width: '85%',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
    backgroundColor: '#00994C',
    marginTop: 10,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    marginBottom: 20,
    width: 100,
    height: 100,
  },
  StyleText: {
    color:'#0a3a66',
    fontSize: RFValue(12, 580),// second argument is standardScreenHeight(optional),
  },
  DatailText: {
    fontSize: RFValue(12, 580),
    color: 'black',
  },
  ViewConfirm: {
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#0a3a66',
    fontSize: RFValue(12, 580),
  },
  horizontal: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ModalContainer: {
    backgroundColor: 'white',
    width: 420,
   
    height: 300,
    fontsize: 20,
    marginTop: 250,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
  },

  TextModalCancel: {
    marginTop: 15,
    borderRadius: 5,
    padding: 5,
    alignSelf: 'flex-end',
    backgroundColor: 'skyblue',
    color: 'white',
    fontSize: RFValue(12, 580),
  },
  ViewSave: {
    justifyContent: 'center',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
