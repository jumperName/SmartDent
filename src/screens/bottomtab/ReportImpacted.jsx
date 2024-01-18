import React, { useState, useEffect } from 'react'
import ReportDental from '../../../components/ReportDental'
import { Calendar, CalendarUtils } from 'react-native-calendars'
import { LocaleConfig } from 'react-native-calendars'
import AsyncStorage from '@react-native-async-storage/async-storage'
import APIClient,{  host } from '../../../lib/react-native-api-client'
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
  Modal,
} from 'react-native'
import moment from 'moment'

const DateTime = require('../assets/images/register/calendarsb.png')

LocaleConfig.locales['th'] = {
  monthNames: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน	',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤษภาคม',
    'ธันวาคม',
  ],
  monthNames: [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน	',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤษภาคม',
    'ธันวาคม',
  ],
  monthNamesShort: [
    'ม.ค.',
    'ก.พ.',
    'ม.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย',
    'ธ.ค.',
  ],
  dayNames: [
    'อาทิตย์',
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัสบดี',
    'ศุกร์',
    'เสาร์',
  ],
  dayNamesShort: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
  today: 'วันนี้',
}
LocaleConfig.defaultLocale = 'th'

const ReportImpacted = ({navigation ,initDate = new Date()}) => {
   const today = moment().format('YYYY-MM-DD')
  const [NameAppoint, setNameAppoint] = useState([])
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
  const [startDate , setstartDate ] = useState(today)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})

  const fetchUser = async () => {
    const accessToken = await AsyncStorage.getItem('@token')
    const response = await fetch(`${host}/authen`, {
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

  const handlePressDay = async () => {
    // fetch('http://172.20.10.3:3333/get_holidays')
    fetch(`${host}/get_impacted/${startDate}`)
      .then(res => res.json())
      .then(
        result => {
          setNameAppoint(result)
         // console.log('GetHolidays', NameAppoint)
         setIsLoading(false)
        },        
        error => {
          console.log(error)
        },
      )     
  }

  const get_alldatedent = async (month, year) => {
    fetch(`${host}/get_alldatedent2/${year}/MONTH/${month}`)
    .then(res => res.json())
    .then(
      result => {
        setNameAppoint(result)
      //  console.log('NameAppoint', NameAppoint)
      //  console.log('initDate.getFullYear()', initDate.getFullYear())
        setIsLoading(false)
      },
      error => {
        console.log(error)
      },
    )
}


  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker)
  }

  // สร้างฟังก์ชันกลับไปหน้า inputRegister
  const onGoBackPress = () => {
    navigation.goBack()
  }

  return (

    <View>
    { isLoading ? 
     <Text>Loading...</Text>
     : 

    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
          <View style={{ width: "100%", paddingHorizontal: 22, marginTop: 20 }}>
          
            <Text style={{ fontSize: 25 ,color:'#006666' }}>รายชื่อผ่าฟันคุด</Text>
            
              <TouchableOpacity
                style={styles.inputBtn}
                onPress={handleOnPressStartDate}
              >
                <Text>{moment(startDate).add(543,'year').format('DD-MM-YYYY')}</Text>
              </TouchableOpacity>
      

            <TouchableOpacity  
             onPress={() => handlePressDay(startDate)}
              style={styles.submitBtn}
            >
              <Text style={{ fontSize: 20, color: "white" }}>ตกลง</Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity
                      onPress={() => get_alldatedent(initDate.getMonth() + 1,initDate.getFullYear())}
                    style={styles.submitBtn2}>
                    <Text style={{ fontSize: 20, color: 'white' }}>
                      แสดงทั้งหมด / เดือน
                    </Text>
                  </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={openStartDatePicker}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Calendar
                    onDayPress={day => {
                      setstartDate(day.dateString)
                      console.log(day)
                      handleOnPressStartDate(false)
                    }}
                  />
                  <TouchableOpacity onPress={handleOnPressStartDate}>
                    <Text style={{ color: 'white' }}>ออก</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
    
            { isLoading ? 
                <Text>Loading...</Text>              
                : 
            NameAppoint.map((getAppoint,index) => (
              <ReportDental
                index={index+1}
                navigation={navigation}
                key={getAppoint.app_id}
                getAppoint={getAppoint}
              />
            ))}
          
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
       }
       </View>

  )
}
export default ReportImpacted

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  view_time: {
    flexDirection: 'row',
  },
  submitBtn: {
    backgroundColor: "#006666",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },

  submitBtn2: {
    backgroundColor: "red",
     width:200,
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
    marginLeft:20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputBtn: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#222",
    height: 50,
    paddingLeft: 8,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 14,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#006666",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 15,
    width: "65%",
    shadowColor: "#006666",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
})
