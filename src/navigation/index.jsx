import React from 'react'
import { Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import InputRegister from '../screens/InputRegister'
import Login from '../screens/Login'
import MainCalender from '../screens/MainCalender'
import CalenderImpacted from '../screens/CalenderImpacted'
import Profile from '../screens/Profile'
import TypeDent from '../screens/TypeDent'
import ReportExtract from '../screens/bottomtab/ReportExtract'
import ReportImpacted from '../screens/bottomtab/ReportImpacted'
import CheckboxImpacted from '../screens/CheckboxImpacted'
import CheckboxExtract from '../screens/CheckboxExtract'
import CrudHoliday from '../screens/CrudHoliday'  
import CrudDayoff from '../screens/CrudDayoff'
import CheckUpdate from '../screens/CheckUpdate'
import ConfirmApp from '../screens/ConfirmApp'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabNavigator from './BottomTabNavigator';  
import Detail from '../screens/Detail'
import ConnectionInternet from '../../lib/ConnectionInternet';

 //import DrawerNavigator from './DrawerNavigator';
const Stack = createNativeStackNavigator()


const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="InputRegister" screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainCalender" component={MainCalender} />  
        <Stack.Screen name="CalenderImpacted" component={CalenderImpacted} />    
       <Stack.Screen name="ConnectionInternet" component={ConnectionInternet} />
       <Stack.Screen name="InputRegister" component={InputRegister} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="TypeDent" component={TypeDent} />
        <Stack.Screen name="CheckboxExtract" component={CheckboxExtract} />
        <Stack.Screen name="CheckboxImpacted" component={CheckboxImpacted} /> 
        <Stack.Screen name="ConfirmApp" component={ConfirmApp} />
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
        <Stack.Screen name="CrudHoliday" component={CrudHoliday} /> 
        <Stack.Screen name="ReportExtract" component={ReportExtract} />
        <Stack.Screen name="ReportImpacted" component={ReportImpacted} />
        <Stack.Screen name="CrudDayoff" component={CrudDayoff} />
        <Stack.Screen name="CheckUpdate" component={CheckUpdate} />    
         <Stack.Screen name="Detail" component={Detail} return true/>         
  
        {/* <Stack.Screen name="DrawerNavigator" component={CrudHoliday} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation