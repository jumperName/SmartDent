import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card, Title, Paragraph, Button } from 'react-native-paper'
import moment from 'moment'
import APIClient, { host } from '../../lib/react-native-api-client'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import LinearGradient from 'react-native-linear-gradient'
import { CheckBox } from 'react-native-elements'
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
} from 'react-native'

const { width, height } = Dimensions.get('screen')

const ConfirmApp = props => {
  const backIcon = require('../assets/images/register/back.png')
  const background = require('../assets/images/register/background.png')
  const personIcon = require('../assets/images/register/signup_person.png')
  const lockIcon = require('../assets/images/register/signup_lock.png')
  const idcard = require('../assets/images/register/idcard.png')
  const calling = require('../assets/images/register/calling.png')
  const clock = require('../assets/images/register/clock.png')
  const DateTime = require('../assets/images/register/DateTime.png')

  const [openModal, setOpenModal] = useState(false)
  const [AppName, setAppName] = useState('')
  const [AppLastname, setAppLastname] = useState('')
  const [AppCid, setAppCid] = useState('')
  const [AppTele, setAppTele] = useState('')
  const [Fulltime, setFulltime] = useState('')
  const [TimeSlot, setTimeSlot] = useState('')
  const [Typedent, setTypedent] = useState('')
  const [Namedent, setNamedent] = useState('')
  const [FreeDateDent, setFreeDateDent] = useState('loading...')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIndex, setIndex] = React.useState(false)
  const [AppLine, setAppLine] = useState('')

  // สร้างฟังก์ชันกลับไปหน้า Login
  const onGoBackPress = () => {
    props.navigation.goBack()
  }

  const handleConfirm = async () => {
    const response = await fetch(`${host}/input_appoint`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        cid: AppCid,
        app_date: Fulltime,
        app_time: TimeSlot,
        firstname: AppName,
        lastname: AppLastname,
        tel: AppTele,
        dental_t: Typedent,
        app_line: AppLine,
      }),
    })
    const data = await response.json()
    if (data.status === 'ok') {
      props.navigation.navigate('Detail')
      setOpenModal(false)
      console.log('ok')
    } else {
      console.log('error')
    }
  }

  const getname = async () => {
    if (Typedent == 1) {
      fetch(`${host}/get_freedatedent1/${Fulltime}`)
        .then(response => response.json())
        .then(data => {
          setFreeDateDent(data[0])
          console.log('FreeDateDent1', data)
          setFreeDateDent(data)
          setIsLoading(false)
        })
        .catch(error => console.error(error))
    }
    if (Typedent == 2) {
      fetch(`${host}/get_freedatedent2/${Fulltime}`)
        .then(response => response.json())
        .then(data => {
          setFreeDateDent(data[0])
          console.log('FreeDateDent2', data)
          setFreeDateDent(data)
          setIsLoading(false)
        })
        .catch(error => console.error(error))
    }

    try {
      const asccessName = await AsyncStorage.getItem('AppNames')
      const asccessLastname = await AsyncStorage.getItem('AppLastnames')
      const asccessCid = await AsyncStorage.getItem('AppCids')
      const asccessTele = await AsyncStorage.getItem('AppTeles')
      const asccessTimeSlot = await AsyncStorage.getItem('TimeSlot')
      const asccessNamedent = await AsyncStorage.getItem('Namedent')
      const asccessFulltime = await AsyncStorage.getItem('Fulltime')
      const asccessTypedent = await AsyncStorage.getItem('Typedent')
      const asccessAppLine = await AsyncStorage.getItem('AppLine')
      setAppName(asccessName)
      setAppLastname(asccessLastname)
      setAppCid(asccessCid)
      setAppTele(asccessTele)
      setTimeSlot(asccessTimeSlot)
      setNamedent(asccessNamedent)
      setTypedent(asccessTypedent)
      setFulltime(asccessFulltime)
      setAppLine(asccessAppLine)
    } catch (error) {}
    setIsLoading(false)
  }

  useEffect(() => {
    getname()
  }, [isLoading])

  function renderModal() {
    return (
      <Modal
        visible={openModal}
        animationIn="slideInLeft"
        animationOutTiming={750}
        animationType="slide"
        transparent={true}>
        <View style={styles.container}>
          <View style={styles.ModalContainer}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: RFValue(12, 580),// second argument is standardScreenHeight(optional),
                padding: '50',
              }}>
              คำเตือน!!
            </Text>
            <Text style={{   color: 'black',  fontSize: RFValue(12, 580),  marginTop: 10 }}>
              ทางเจ้าหน้าที่จะโทรยืนยันข้อมูลการจองคิวอีกครั้ง
            </Text>
            <Text style={{    color: 'black', fontSize: RFValue(12, 580), marginTop: 10 }}>
              เมื่อยืนยันข้อมูลการจองคิวแล้วท่านจะไม่สามารถแก้ไขข้อมูลการจองคิวได้
            </Text>

            <View style={styles.TextContainerOK}>
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <Text style={styles.TextModal}>ยกเลิก</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  handleConfirm()
                }}>
                <Text style={styles.TextModalCancel}>ตกลง</Text>
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
                <TouchableOpacity
                  style={styles.headerBackButtonView}
                  onPress={onGoBackPress}>
                  <Image
                    source={backIcon}
                    style={styles.backButtonIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {renderModal()}

                <View style={styles.ViewContainer}>
                  {<Text style={styles.StyleText}> ข้อมูลการจองคิว</Text>}
                  <View style={styles.TextContainer}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={personIcon}
                        style={styles.inputIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.StyleText}>: {AppName}</Text>
                    <Text style={styles.StyleText}>
                      {'    '}
                      {AppLastname}{' '}
                    </Text>
                  </View>

                  <View style={styles.TextContainer}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={idcard}
                        style={styles.inputIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.StyleText}>: {AppCid}</Text>
                  </View>

                  <View style={styles.TextContainer}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={calling}
                        style={styles.inputIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.StyleText}>: {AppTele} </Text>
                  </View>

                  <View style={styles.TextContainer}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={DateTime}
                        style={styles.inputIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.StyleText}>
                      : วันที่:{' '}
                      {moment(Fulltime).add(543, 'year').format('DD-MM-YYYY')}{' '}
                    </Text>
                  </View>
                  <View style={styles.TextContainer}>
                    <View style={styles.iconContainer}>
                      <Image
                        source={clock}
                        style={styles.inputIcon}
                        resizeMode="contain"
                      />
                    </View>
                    <Text style={styles.StyleText}>
                      : เวลา: {TimeSlot} {} น.
                    </Text>
                  </View>
                  <View style={styles.TextContainer}>
                    <Text style={styles.StyleText}>
                      นัดแผนก: {Namedent} {}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <LinearGradient
              colors={['#FFCCFF', '#CC99FF', 'white']}
              style={styles.ViewContainer}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}>
              <View>
                <Text style={{ color: 'white', fontSize: 20 }}>
                  จำนวนคิวที่ว่าง {FreeDateDent}
                </Text>
              </View>
            </LinearGradient>

            <View style={styles.footerContainer}>
              <TouchableOpacity onPress={() => setOpenModal(true)}>
                <View style={styles.ViewConfirm}>
                  <Text style={styles.buttonText}>ยืนยันการจองคิว</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
       )}
       </View>
  )
}

export default ConfirmApp

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
  footerContainer: {
    flex: 2,
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
    marginTop: 25,
  },
  TextContainerOK: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ViewContainer: {
    padding: 10,
    paddingHorizontal: 25,
    marginLeft: 30,
    width: '85%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'white',
    marginTop: 20,
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
  StyleText: {
    color:'black',
    fontSize: RFValue(12, 580),
  },
  ViewConfirm: {
    
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
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
    padding: 30,
    marginTop: 250,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 0.5,
    borderColor: 'gray',
  },
  TextModal: {
    marginTop: 20,
    color: 'white',
    borderRadius: 10,
    paddingLeft: 20,
    padding: 12,
    borderWidth: 3,
    backgroundColor: '#B266FF',
    fontSize: RFValue(12, 580),
    borderColor: '#B266FF',
  },
  TextModalCancel: {
    marginTop: 20,
    marginLeft: 70,
    color: 'black',
    borderRadius: 10,
    paddingLeft: 20,
    padding: 12,
    borderWidth: 3,
    borderColor: '#B266FF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: RFValue(12, 580),
  },
})
