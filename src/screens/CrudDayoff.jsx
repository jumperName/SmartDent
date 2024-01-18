import {
    Image,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Modal,
    TextInput,
  } from 'react-native'
  import React, { useEffect, useState } from 'react'
  import moment from 'moment'
  import { Calendar, LocaleConfig } from 'react-native-calendars'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import APIClient,{  host } from '../../lib/react-native-api-client'
  import { Dropdown } from 'react-native-element-dropdown';

  const DateTime = require('../assets/images/register/calendarsb.png')
  
  LocaleConfig.locales['th'] = {
    monthNames: [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
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
  }
  
  LocaleConfig.defaultLocale = 'th'
  
  const CrudDayoff = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [Dayoff, setDayoff] = useState([])
    const [visible, setViisble] = useState(false)
    const [DayoffName, setDayoffName] = useState('')
    const [DayoffDate, setDayoffDate] = useState('')
    const [DayoffDateSave, setDayoffDateSave] = useState('')
    const [hideId, setHideId] = useState(null)
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
    const [user, setUser] = useState({})
    const [TypeDents, setTypeDents] = useState([])
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

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
        setIsLoading(false)
  
      }
      if (data.status === 'error') {
        navigation.navigate('Login')
  
        setIsLoading(false)
        console.log('login')
      
      }
    }

    const getType = async () => {
        let TypeArray = [];
        fetch(`${host}/get_type`)
          .then(res => res.json())
          .then(
            result => {
             
              setIsLoading(false)
               console.log(JSON.stringify(result[0]))
            var count = Object.keys(result).length;
            for(var i =0 ; i<count;i++ ){
               TypeArray.push({
                value: result[i].dental_t,
                label: result[i].dental_name,
               })
            }
               setTypeDents(TypeArray)
            },
    
            error => {
              console.log(error)
            },
          )
    
      }

    useEffect(() => {
        getType()
      fetchUser()
      getListDayoff()
    }, [isLoading])
  
    const handleOnPressStartDate = () => {
      setOpenStartDatePicker(!openStartDatePicker)
    }
  
    const handleVisibleModal = () => {
      setViisble(!visible)
      setHideId(null)
      setDayoffName('')
      setDayoffDate('')
    }
  
    const getListDayoff = async () => {
     
      fetch(`${host}/get_dayoff`)
        .then(res => res.json())
        .then(
          result => {
            setDayoff(result)
            //console.log('setDayoff', result)
            setIsLoading(false)
          },
          error => {
            console.log(error)
          },
        )
    }
  
    const handelSave = async () => {
      if (hideId == null) {
        const response = await  fetch(`${host}/input_Dayoff`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                d_date: DayoffDateSave,
                d_name: DayoffName,
                dental_t: value,
            }),
          },
        )
          .then(res => {
            getListDayoff()
            setDayoffName('')
            setDayoffDate('')
            setViisble(false)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        const response = await fetch(`${host}/updateDayoff/${hideId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                d_date: DayoffDateSave,
                d_name: DayoffName,
                dental_t: value,
            }),
          },   
  
        )
          .then(res => {
            getListDayoff()
            setDayoffName('')
            setDayoffDate('')
            setViisble(false)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  
    const hadleRemove = item => {
      fetch(`${host}/deleteDayoff/${item}`, {
        method: 'DELETE',
      })
        .then(res => {
          return res.json()
        })
        .then(res => {
            getListDayoff()
        })
        .catch(err => {
          console.log(err)
        })
    }
    const handleEdit = item => {
      setViisble(true)
      setValue(item.dental_t)
      setHideId(item.d_id)
      setDayoffName(item.d_name)
      setDayoffDateSave(item.d_date)   
      setDayoffDate(moment(item.d_date).add(543,'year').format('DD-MM-YYYY'))
    }
    
    const onChangeName = value => {
      setDayoffName(value)
    }
  
    const onChangeDate = value => {
      onPress = { handleOnPressStartDate }
      setDayoffDate(value)
    }
  
    return (
  
      <View>
      { isLoading ? 
       <Text>Loading...</Text>
       : 
  
      <SafeAreaView>
           <ScrollView>
        <View style={styles.container}>
          <View style={styles.header_container}>
            <Text style={styles.txtMain}>
              {' '}
              รายการวันหยุด {Dayoff.length} วัน{' '}
            </Text>
            <TouchableOpacity
              onPress={handleVisibleModal}
              style={styles.btnNewContainer}>
              <Text style={styles.textButton}>เพิ่มวันหยุด</Text>
            </TouchableOpacity>
          </View>
          <Modal animationType="slide" visible={visible}>
            <SafeAreaView>
              <View style={styles.form}>
                <TouchableOpacity onPress={handleVisibleModal}>
                  <Text style={styles.txtClose}>ออก</Text>
                </TouchableOpacity>
  
                <TextInput
                  placeholderTextColor="#000" 
                  value={DayoffName}
                  style={styles.text_input}
                  placeholder="ชื่อการประชุม / อื่นๆ"
                  // onChangeText={onChangeName}
                  onChangeText={text => {
                    setDayoffName(text)
                  }}
                />
                <View style={styles.view_time}>
                  <TextInput
                   placeholderTextColor="#000" 
                    value={DayoffDate}
                    style={styles.text_time}
                    placeholder="เวลา"
                    onChangeText={text => {
                      setDayoffDate(text)
                    }}
                  />
               
             
                  <TouchableOpacity
                    style={styles.inputBtn}
                    onPress={handleOnPressStartDate}>
                    <Image
                      source={DateTime}
                      style={styles.inputIcon}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <View>
            
               <Dropdown   
                   style={[styles.dropdown, isFocus && { borderColor: 'blue'}]}
               search         
               placeholderStyle={styles.placeholderStyle}
               itemTextStyle={styles.itemTextStyle}
               labelField="label"
               color="black" 
               valueField="value"             
               data={TypeDents}
               placeholder={!isFocus ? 'เลือกแผนก' : '...'}
               onFocus={() => setIsFocus(true)}
               onBlur={() => setIsFocus(false)}
               onChange={item => {
                setValue(item.value);
                setIsFocus(false);
              }}
               />
          
               </View>

                <TouchableOpacity
                  onPress={handelSave}
                  style={styles.btnNewContainer}>
                  <Text style={styles.textButton}>
                    {hideId == null ? 'บันทึก' : 'แก้ไข'}
                  </Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Modal>
  
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Calendar 
                  onDayPress={day => {
                    setDayoffDateSave(day.dateString)
                    setDayoffDate(moment(day.dateString).add(543,'year').format('DD-MM-YYYY'))
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
  
          <ScrollView>
            {Dayoff.map((item, index) => {
              return (
                <View style={styles.item} key={item.d_id}>
                  <View>
                    <Text style={styles.textNormal}>
                      {index + 1}. {item.d_name}
                    </Text>
                    <Text style={styles.txtName}>
                    วันที่ : {moment(item.d_date).add(543,'year').format('DD-MM-YYYY')}
                    </Text>
                    <Text style={styles.txtName}>
                      {item.dental_name}
                    </Text>            
                  </View>
                
                  <View>
                    <TouchableOpacity onPress={() => hadleRemove(item.d_id)}>
                      <Text style={styles.txtDelete}>ลบ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      key={item.d_id}
                      onPress={() => handleEdit(item)}>
                      <Text style={styles.txtEdit}>แก้ไข</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
        </ScrollView>
      </SafeAreaView>
         }
         </View>
    )
  }
  
  export default CrudDayoff
  
  const styles = StyleSheet.create({
    container: {
      marginBottom: 200,
    },
    header_container: {
      backgroundColor: '#eeeeee',
    },
    form: {
      padding: 15,
    },
    text_input: {
      color:'black',
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      marginTop: 10,
    },
    text_time: {
      color:'black',
      width: '70%',
      padding: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 10,
      marginTop: 10,
    },
    txtMain: {
      color:'black',
      fontSize: 26                      ,
      fontWeight: 'bold',
      padding: 10,
    },
    item: {
      justifyContent: 'space-between',
      paddingVertical: 15,
      borderBottomWidth: 1,
      color: '#888',
      padding: 20,
      flexDirection: 'row',
      marginBottom: 5,
    },
    txtName: {
      color:'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
    textNormal: {
      fontSize: 16,
      color: '#444',
    },
    txtDelete: {
       color:'black',
       borderColor: 'yellow' ,
       backgroundColor: 'yellow',
      borderWidth: 1,
      width:50,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:10,
      textAlign:'center'
    },
    txtEdit: {
      color:'white',
    marginTop:5,
    backgroundColor: 'blue',
      borderColor: 'blue' ,
      borderWidth: 1,
      width:50,
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius:10,
      textAlign:'center'
    },
    txtClose: {
      color:'black',
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      textAlign: 'right',
    },
    btnNewContainer: {
      padding: 10,
      backgroundColor: '#006666',
    },
    textButton: {
      textAlign: 'center',
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    centeredView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: '#080516',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 20,
      padding: 15,
     // width: '80%',
      shadowColor: '#000',
    
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    view_time: {
     
      flexDirection: 'row',
    },
    inputIcon: {
    
      marginTop:10,
      width: 50,
      height: 40,
    },
       dropdown: {
       
      
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom:10,
        marginTop:10,
      },
      placeholderStyle: {       
       color  :'black',
      },
      itemTextStyle: {
        color  :'black',
      },
  })
  