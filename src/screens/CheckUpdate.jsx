import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import VersionCheck from 'react-native-version-check';



const CheckUpdate =   () => {

   
  return (
    <View>
    <Text>{React.version}</Text>
    </View>
  )
}

export default CheckUpdate