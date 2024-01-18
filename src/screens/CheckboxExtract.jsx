import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native'

const { width, height } = Dimensions.get('screen')
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { CheckBox } from 'react-native-elements'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {  ConnectionInternet } from '../../lib/ConnectionInternet';
import LinearGradient from 'react-native-linear-gradient'

const CheckboxExtract = ({ navigation }) => {
  const [selectedIndex, setIndex] = React.useState(false)
  const [selectedIndex2, setIndex2] = React.useState(false)
  const [selectedIndex3, setIndex3] = React.useState(false)
  const [GetHolidays, setGetHolidays] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const backIcon = require('../assets/images/register/back.png')

  useEffect(() => {
});


  const onGoBackPress = () => {
    navigation.goBack()
  }
 


  const click = () => {
    if (
      selectedIndex === false ||
      selectedIndex2 === false ||
      selectedIndex3 === false
    ) {
      Alert.alert('กรุณาลงข้อมูลให้ครบ', '', [
        { text: 'ตกลง', onPress: () => console.log('OK Pressed') },
      ])
      return
    }
    if (selectedIndex === 1) {
      Alert.alert(
        'ไม่สามารถจองคิวออนไลน์ได้',
        'กรุณาติดต่อที่คลินิกทันตกรรมโรงพยาบาลม่วงสามสิบ หรือ โทร.066-1105571 เฉพาะในเวลาราชการ จันทร์ - ศุกร์ 8.30-15.00 น.',
        [{ text: 'ตกลง', onPress: () => navigation.navigate('InputRegister') }],
      )
      return
    }
    if (selectedIndex2 === 0) {
      Alert.alert(
        'ไม่สามารถจองคิวออนไลน์ได้',
        'กรุณาติดต่อที่คลินิกทันตกรรมโรงพยาบาลม่วงสามสิบ หรือ โทร.066-1105571 เฉพาะในเวลาราชการ จันทร์ - ศุกร์ 8.30-15.00 น.',
        [{ text: 'ตกลง', onPress: () => navigation.navigate('InputRegister') }],
      )
      return
    }
    if (selectedIndex3 === 0) {
      Alert.alert(
        'ไม่สามารถจองคิวออนไลน์ได้',
        'กรุณาติดต่อที่คลินิกทันตกรรมโรงพยาบาลม่วงสามสิบ หรือ โทร.066-1105571 เฉพาะในเวลาราชการ จันทร์ - ศุกร์ 8.30-15.00 น.',
        [{ text: 'ตกลง', onPress: () => navigation.navigate('InputRegister') }],
      )
      return
    } else {
      navigation.navigate('MainCalender') 
     
      return
    }
  }

  return (

    <LinearGradient
    colors={['#FFCCFF', '#CC99FF', '#FFCCFF']}
    style={styles.container}
    start={{ x: 0, y: 0.5 }}
    end={{ x: 1, y: 0.5 }}>
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>      
           
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
              <View style={styles.containerCheckT}>
                <Text style={styles.TextboxT}>แบบสอบถาม</Text>
                <Text style={styles.Textbox}>
                  *ถ้าไม่ผ่านเงื่อนไขคุณจะไม่สามารถจองคิวได้
                </Text>
              </View>

              <View style={styles.containerCheck}>
                <Text style={styles.Textbox}>
                  {' '}
                  1.คุณเคยมาโรงพยาบาลม่วงสามสิบหรือไม่ ?
                </Text>
                <View style={styles.checkbox}>
                <CheckBox
                    containerStyle={{ marginLeft:30,backgroundColor: 'transparent',border:'transparent' }}
                    title={<Text style={styles.Textbox}>เคย</Text>}
                 
                    checked={selectedIndex === 0}
                    onPress={() => setIndex(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <CheckBox
                    containerStyle={{ marginLeft:30,backgroundColor: 'transparent',border:'transparent' }}
                    title={<Text style={styles.Textbox}>ไม่เคย</Text>}
                    checked={selectedIndex === 1}
                    onPress={() => setIndex(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    />
                </View>

                <Text style={styles.Textbox}> 2.คุณอายุน้อยกว่า 20 ปีหรือไม่ ?</Text>
                <View style={styles.checkbox}>
                <CheckBox
                    containerStyle={{ marginLeft:30,backgroundColor: 'transparent',border:'transparent' }}
                    title={<Text style={styles.Textbox}>ใช่</Text>}
                 
                    checked={selectedIndex2 === 0}
                    onPress={() => setIndex2(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <CheckBox
                    containerStyle={{ marginLeft:30,backgroundColor: 'transparent',border:'transparent' }}
                    title={<Text style={styles.Textbox}>ไม่ใช่</Text>}
                    checked={selectedIndex2 === 1}
                    onPress={() => setIndex2(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    />
                </View>

                <Text style={styles.Textbox}>
                  {' '}
                  3.ปัจจุบันคุณมีโรคประจำตัว/กำลังกินยาประจำหรือไม่ ?
                </Text>
                <View style={styles.checkbox}>
                <CheckBox
                    containerStyle={{ marginLeft:30,backgroundColor: 'transparent',border:'transparent' }}
                    title={<Text style={styles.Textbox}>ใช่</Text>}
                 
                    checked={selectedIndex3 === 0}
                    onPress={() => setIndex3(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <CheckBox
                    containerStyle={{ marginLeft:30,backgroundColor: 'transparent',border:'transparent' }}
                    title={<Text style={styles.Textbox}>ไม่ใช่</Text>}
                    checked={selectedIndex3 === 1}
                    onPress={() => setIndex3(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    />
                </View>
              </View>
         
            <View style={styles.footerContainer}>
              <TouchableOpacity onPress={click}>
                <View style={styles.nextButton}>
                  <Text style={styles.buttonText}>ถัดไป</Text>
                </View>
              </TouchableOpacity>
            </View>
        
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default CheckboxExtract

const styles = StyleSheet.create({
  container: {
    flex: 1,
 
  },

  containerCheck: {
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5EE',
    marginTop: '2%',
  },
  containerCheckT: {
    padding: 30,
    borderRadius: 20,
    width: '90%',
    // maxheight: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5EE',
    marginTop: '2%',
  },
  checkbox: {
    color:'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '3%',
    marginLeft: 40,
  },
  TextboxT: {
    color:'black',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    fontSize: RFValue(16, 580),
  },
  Textbox: {
    color:'black',
    marginLeft: 20,
    marginTop: 5,
    fontSize: RFValue(15, 580),  
  },
 
  buttonstyle: {
    paddingTop: 20,
    width: 190,
    marginLeft: 60,
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
  footerContainer: {
    marginTop: 40,
  
    alignSelf: 'flex-end',
  },
  nextButton: {
    borderRadius: 50,
    width: 150,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: RFValue(12, 580),
  },
})
