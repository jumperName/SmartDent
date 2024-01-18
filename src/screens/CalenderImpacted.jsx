import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  Fragment,
  Alert,
  Modal,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { Calendar, CalendarUtils } from 'react-native-calendars'
import { LocaleConfig } from 'react-native-calendars'
import React, { useState, useRef, useCallback, useEffect } from 'react'
import moment from 'moment'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import APIClient, { host } from '../../lib/react-native-api-client'

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

const { width, height } = Dimensions.get('screen')

const CalenderImpacted = ({
  theme,
  navigation,
  setDate,
  initDate = new Date(),
  minimumDate = new Date(),
  disabledDaysIndexes = [5, 6, 7],
  WorkdDaysIndexes = [1, 2, 3, 4, 5],
}) => {
  const background = require('../assets/images/register/background.png')
  const backIcon = require('../assets/images/register/back.png')
  const [openModal, setOpenModal] = useState(false)
  const [Datetime, setDatetime] = useState('')
  const [Fulltime, setFulltime] = useState('')
  const [TimeSlot, setTimeSlot] = useState('')
  const [selected, setSelected] = useState('')
  const [DisableDates, setDisableDates] = useState([])
  const [Lastmonth, setLastmonth] = useState({})
  const [Dayseven, setdayseven] = useState({})
  const [Getcount, setGetcount] = useState([])
  const [GetHolidays, setGetHolidays] = useState([])
  const [GetFullDate, setGetFullDate] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [MarkHolidays, setMarkHolidays] = useState([])
  const [Dayoffs, setDayoffs] = useState([])

  // สร้างฟังก์ชันกลับไปหน้า TypeDent
  const onGoBackPress = () => {
    navigation.goBack()
  }

  const panelRef = useRef(0)
  // And don't forget to disabled the "first" dates on init :
  useEffect(() => {
    fetchFulldate(
      initDate.getMonth()+1,
      initDate.getFullYear(),
    )
    getDisabledDays(
      initDate.getMonth(),
      initDate.getFullYear(),
      disabledDaysIndexes,
    )
   
  }, [isLoading])

  const fetchFulldate = async (month, year) => {    
      
    const response=await  fetch(`${host}/get_holidays`)
    const data=await response.json();
    setGetHolidays(data)

    
    const response2=await  fetch(`${host}/get_fulldatedent2/${year}/MONTH/${month}`)
    const data2=await response2.json();
    setGetFullDate(data2)
     

   const response3 = await  fetch(`${host}/get_dayoffdent2/${year}/MONTH/${month}`)
    const data3=await response3.json();
    setDayoffs(data3)
   // console.log(data3)
        setIsLoading(false)
  }


  const setSelectSlot = async item => {
    setTimeSlot(item)
    // console.log(item)

    try {
      AsyncStorage.setItem('Fulltime', Fulltime)
      AsyncStorage.setItem('TimeSlot', item)
    } catch (error) {
      console.log(error)
    }

    setOpenModal(false)
    navigation.navigate('ConfirmApp', Fulltime)
  }

  function renderModal() {
    return (
      <Modal visible={openModal} animationType="slide" transparent={true}>
        <SafeAreaView>
          <View style={styles.AppointContainer}>
            <View style={styles.containeModal}>
              <Text style={styles.TextAppoint}>วันที่ {Datetime}</Text>
              <Text style={{ fontSize: 20 }}>
                {} : {}
              </Text>
              <Text style={styles.DayTime}>ว่างให้ใช้บริการจองคิว</Text>
            </View>
            <View style={styles.containeModal}>
              <Text style={styles.TextAppoint}>กรุณาเลือกเวลาจองคิว</Text>
            </View>
            <View style={styles.containeModal}>
            <FlatList           
                
                data={['13:00']}
                renderItem={({ item, index }) => {
                  return (                   
                    <TouchableOpacity
                      style={styles.timeSlot}
                      onPress={() => {
                        setSelectSlot(item)
                      }}>
                      <Text style={{ color: '#0736BE',  fontSize: RFPercentage(2.5) }}>
                        {item} {} {}น.
                      </Text>
                    </TouchableOpacity>
                  
                
                  )
                }}
              />
            </View>
            <View style={styles.containeModal}>
              <TouchableOpacity onPress={() => setOpenModal(false)}>
                <Text style={{ color: 'red', fontSize: 20 }}>ยกเลิก</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    )
  }

  const getDisabledDays = (month, year, daysIndexes) => {
    let pivotDay = moment()
    const lastDayOfMonth = moment().add(14, 'days')
    const addDayseven = moment(pivotDay).add(7, 'days')

    const AgainPM = moment().format('YYYY-MM-DD, HH:mm')
    const TreePM = moment().format('YYYY-MM-DD, 15:00')
    setLastmonth(lastDayOfMonth)
    setdayseven(addDayseven)

   //  console.log('addDay', addDayseven)
  // console.log('lastDayOfMonth', lastDayOfMonth)
    // console.log('AgainPM', AgainPM)
    // console.log('TreePM', TreePM)

    let disabledDates = {}

    const Fulldisabled = {
      disabled: true,
      disableTouchEvent: true,
      selected: true,
      selectedColor: '#FF8000',
    }
    const disabledProps = { disabled: true, disableTouchEvent: true }

    let allDayOfMonthChecked = false

    while (!allDayOfMonthChecked) {
      if (!pivotDay.isBefore(lastDayOfMonth)) {
        allDayOfMonthChecked = true

        // if (AgainPM > TreePM) {
        //    disabledDates[moment().add(1, 'days').format('YYYY-MM-DD')] =
        //   disabledProps //ปิดพรุ่งนี้ บ่าย 3
        // }
      }

      daysIndexes.forEach(day => {
        const copy = moment(pivotDay)
        disabledDates[copy.day(day).format('YYYY-MM-DD')] = disabledProps //ปิด เสาร์ - อาทิตย์
        //console.log(copy)
      })
      
      disabledDates[moment(initDate).format('YYYY-MM-DD')] = disabledProps //ปิด today

      GetHolidays.map(item => {
        disabledDates[moment(item.H_DATE).format('YYYY-MM-DD')] = disabledProps //ปิด วันหยุด    
      })

      Dayoffs.map(item => {
        disabledDates[moment(item.d_date).format('YYYY-MM-DD')] = disabledProps //Dayoff     
      })

      GetFullDate.map(item => {
        disabledDates[moment(item.f_date).format('YYYY-MM-DD')] = Fulldisabled //ปิดเต็ม  1 คนต่อวัน
     
      })

  
      pivotDay.add(7, 'days')
    }
   


    setDisableDates(disabledDates)

    return disabledDates
 
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
                  </View>
                </View>
                <View style={styles.containerSelect}>
                  <Text style={styles.TextSelect}>เลือกวันจองคิว</Text>

                  <View></View>
                </View>

                <Calendar
                  theme={{
                    textDayFontFamily: 'monospace',
                    textMonthFontFamily: 'monospace',
                    textDayHeaderFontFamily: 'monospace',
                    textSectionTitleColor: 'black',
                    textSectionTitleDisabledColor: 'black',
                    selectedDayBackgroundColor: 'black',
                    selectedDayTextColor: 'white',
                   // monthTextColor: 'blue',
                    indicatorColor: 'green',
                    textMonthFontWeight: 'bold',

                    dayTextColor: '#3292FF',
                    selectedColor: 'blue',
                    'stylesheet.calendar.header': {
                      dayTextAtIndex0: {
                        color: 'red',
                      },
                      dayTextAtIndex6: {
                        color: 'red',
                      },
                      day: {
                        marginTop: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      },
                    },
                  }}
                  hideExtraDays={true}
                  //  hideArrows={true}
                  //hideExtraDays={true}
                  style={{
                    height: 350,
                    marginTop: 15,
                    dayTextColor: '#2d4150',
                  }}
                  markedDates={DisableDates}
                  minDate={Dayseven.toString()}
                  maxDate={Lastmonth.toString()}
                  onDayPress={day => {  
                    setDatetime(day.day)
                    setFulltime(day.dateString)

                    setOpenModal(true)
                  }}
                  enableSwipeMonths={true}
                  disabledDaysIndexes={disabledDaysIndexes}

                  //  onMonthChange={date => {
                  //       getDisabledDays( date.month - 1,   date.year, disabledDaysIndexes  )
                  //  }}
                />

                {renderModal()}

                <View style={styles.containerMark}>
                  <Text style={styles.TextMark}>รายละเอียดสัญลักษณ์</Text>
                  <Text>{Getcount.day_name}</Text>
                </View>

                <View style={styles.containerday}>
                    <Text style={styles.Markday3}> {' \u25CF'}</Text>
                    <Text style={{ color: '#C3C1C1', fontSize: 18 }}>ไม่สามารถนัดได้</Text>
                  </View>
  
                  <View>
                    <View style={styles.containerday}>
                      <Text style={styles.Markday1}> {' \u25CF'}</Text>
                      <Text style={{ color: '#FF8000', fontSize: 18 }}>วันนัดเต็ม</Text>
                    </View>
                    <View style={styles.containerday}>
                      <Text style={styles.Markday2}> {' \u25CF'}</Text>
                      <Text style={{ color: '#3292FF', fontSize: 18 }}>
                        วันที่สามารถจองคิวได้
                      </Text>
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
export default CalenderImpacted

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  TextAppoint: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#330066',
    fontSize: RFPercentage(2),
  },
  TextClose: {
    fontSize: RFPercentage(2.5),
    marginTop: 20,
    borderRadius: 10,
    width: 150,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  DayTime: {
    // justifyContent: 'center',
    color: 'black',
    fontSize: RFPercentage(2.5),

  },
  AppointContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '80%',
    marginTop: 170,
    borderRadius: 30,
    alignSelf: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  Appointday: {
    fontWeight: 'bold',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center', // ignore this - we'll come back to it
    flexDirection: 'row',
    alignSelf: 'flex-end',
    //  alignSelf: 'flex-start',
    flexWrap: 'wrap',
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
  containerSelect: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerMark: {
    marginTop: 15,

    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextMark: {
    color: '#0a3a66',
    fontSize: RFPercentage(3),
  },
  TextSelect: {
    color: '#0a3a66',
    fontSize: RFPercentage(3),

    alignItems: 'center',
    justifyContent: 'center',
  },
  Markday1: {
    color: '#FF8000',
    fontSize: RFPercentage(3),

    alignItems: 'center', // ignore this - we'll come back to it
  },

  Markday2: {
    color: '#3292FF',
    fontSize: RFPercentage(3),

    alignItems: 'center', // ignore this - we'll come back to it
  },
  Markday3: {
    color: '#C3C1C1',
    fontSize: RFPercentage(3),

    alignItems: 'center', // ignore this - we'll come back to it
  },
  containerday: {
    alignItems: 'center', // ignore this - we'll come back to it
    flexDirection: 'row',
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
  },
  containeModal: {
   padding: 10,
   alignSelf: 'center',
   justifyContent: 'center',
   alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    marginLeft:20,
    marginTop: 10,
    width: '40%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    margin: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
