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
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import React, { useEffect, useState } from 'react'
import { CheckBox } from 'react-native-elements'
import { ConnectionInternet } from '../../lib/ConnectionInternet'
import LinearGradient from 'react-native-linear-gradient'

const CheckboxImpacted = ({ navigation }) => {
  const [selectedIndex, setIndex] = React.useState(false)
  const [selectedIndex2, setIndex2] = React.useState(false)
  const [selectedIndex3, setIndex3] = React.useState(false)
  const [selectedIndex4, setIndex4] = React.useState(false)
  const [selectedIndex5, setIndex5] = React.useState(false)

  const backIcon = require('../assets/images/register/back.png')
  const background = require('../assets/images/register/background.png')

  useEffect(() => {})

  const onGoBackPress = () => {
    navigation.goBack()
  }

  const click = () => {
    if (
      selectedIndex === false ||
      selectedIndex2 === false ||
      selectedIndex3 === false ||
      selectedIndex4 === false ||
      selectedIndex5 === false
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
    }
    if (selectedIndex4 === 0) {
      Alert.alert(
        'ไม่สามารถจองคิวออนไลน์ได้',
        'กรุณาติดต่อที่คลินิกทันตกรรมโรงพยาบาลม่วงสามสิบ หรือ โทร.066-1105571 เฉพาะในเวลาราชการ จันทร์ - ศุกร์ 8.30-15.00 น.',
        [{ text: 'ตกลง', onPress: () => navigation.navigate('InputRegister') }],
      )
      return
    }
    if (selectedIndex5 === 1) {
      Alert.alert(
        'ไม่สามารถจองคิวออนไลน์ได้',
        'กรุณาติดต่อที่คลินิกทันตกรรมโรงพยาบาลม่วงสามสิบ หรือ โทร.066-1105571 เฉพาะในเวลาราชการ จันทร์ - ศุกร์ 8.30-15.00 น.',
        [{ text: 'ตกลง', onPress: () => navigation.navigate('InputRegister') }],
      )
      return
    } else {
      navigation.navigate('CalenderImpacted')

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
              <View style={styles.containerCheckT}>
                <Text style={styles.TextboxT}>แบบสอบถาม</Text>
                <Text style={styles.Textbox}>
                  *ถ้าไม่ผ่านเงื่อนไขคุณจะไม่สามารถจองคิวได้
                </Text>
              </View>
              <View style={styles.containerCheck}>
                <Text style={styles.Textbox}>
                  1.คุณเคยมาโรงพยาบาลม่วงสามสิบหรือไม่ ?
                </Text>
                <View style={styles.checkbox}>
                  <CheckBox
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
                    title={<Text style={styles.Textbox}>เคย</Text>}
                    checked={selectedIndex === 0}
                    onPress={() => setIndex(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <CheckBox
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
                    title={<Text style={styles.Textbox}>ไม่เคย</Text>}
                    checked={selectedIndex === 1}
                    onPress={() => setIndex(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                </View>

                <Text style={styles.Textbox}>
                  {' '}
                  2.คุณอายุน้อยกว่า 20 ปีหรือไม่ ?
                </Text>
                <View style={styles.checkbox}>
                  <CheckBox
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
                    title={<Text style={styles.Textbox}>ใช่</Text>}
                    checked={selectedIndex2 === 0}
                    onPress={() => setIndex2(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <CheckBox
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
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
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
                    title={<Text style={styles.Textbox}>ใช่</Text>}
                    checked={selectedIndex3 === 0}
                    onPress={() => setIndex3(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <CheckBox
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
                    title={<Text style={styles.Textbox}>ไม่ใช่</Text>}
                    checked={selectedIndex3 === 1}
                    onPress={() => setIndex3(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                </View>

                <Text style={styles.Textbox}>
                  {' '}
                  4.ปัจจุบันคุณกำลังติดเครื่องมือจัดฟันหรือไม่ ?
                </Text>
                <View style={styles.checkbox}>
                  <CheckBox
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
                    title={<Text style={styles.Textbox}>ใช่</Text>}
                    checked={selectedIndex4 === 0}
                    onPress={() => setIndex4(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <CheckBox
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
                    title={<Text style={styles.Textbox}>ไม่ใช่</Text>}
                    checked={selectedIndex4 === 1}
                    onPress={() => setIndex4(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                </View>

                <Text style={styles.Textbox}>
                  {' '}
                  5.คุณมี Line application ที่สามารถติดต่อได้หรือไม่ ?
                </Text>
                <View style={styles.checkbox}>
                  <CheckBox
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
                    title={<Text style={styles.Textbox}>มี</Text>}
                    checked={selectedIndex5 === 0}
                    onPress={() => setIndex5(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <CheckBox
                    containerStyle={{
                      marginLeft: 30,
                      backgroundColor: 'transparent',
                      border: 'transparent',
                    }}
                    title={<Text style={styles.Textbox}>ไม่มี</Text>}
                    checked={selectedIndex5 === 1}
                    onPress={() => setIndex5(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                </View>
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

export default CheckboxImpacted

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },

  containerCheck: {
    padding: 15,
    borderRadius: 10,
    width: '90%',

    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5EE',
    marginTop: '1.5%',
  },
  containerCheckT: {
    padding: 10,
    borderRadius: 20,
    width: '90%',
    // maxheight: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5EE',
    marginTop: '5%',
  },

  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: '3%',
    marginLeft: 40,
  },
  Textbox: {
    color: 'black',
    fontSize: RFValue(12, 580),
  },
  TextboxT: {
    color: 'black',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    fontSize: RFValue(16, 580),
  },
  buttonstyle: {
    paddingTop: 20,
    width: 190,
    marginLeft: 60,
  },
  headerIconView: {
    marginTop: 10,
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
    flex: 1,
    alignSelf: 'flex-end',
  },
  nextButton: {
    borderRadius: 50,
    width: 150,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
  },
})
