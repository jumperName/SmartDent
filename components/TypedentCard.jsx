import React, { useEffect, useState } from 'react'
import { Button, Card, Title, Paragraph, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'

const TypedentCard = props => {
  const [Typedent, setTypedent] = useState('')
  const [Namedent, setNamedent] = useState('')
  //console.log(props.getTypeDent.dental_t)
  useEffect(() => {
    setTypedent(props.getTypeDent.dental_t)
    setNamedent(props.getTypeDent.dental_name)
  })
  const click = async () => {
    try {
      AsyncStorage.setItem('Typedent', Typedent.toString())
      AsyncStorage.setItem('Namedent', Namedent)

      console.log('ok')
    } catch (error) {
      console.log(error)
    }
    if (Typedent === 1) {
      props.navigation.navigate('CheckboxExtract')
      console.log(Typedent)
    }
    if (Typedent === 2) {
      console.log(Typedent)
      props.navigation.navigate('CheckboxImpacted')
    }
  }

  return (
    <View style={styles.container}>
      <Card>
        <Button
          contentStyle={{
            width: RFPercentage(30),
            alignItems: 'center',
            paddingVertical:RFPercentage(5),
          }}
          onPress={click}>
          <Text style={{ fontSize: 18 }}>
            {' '}
            {props.getTypeDent.dental_name}
          </Text>
        </Button>
      </Card>
    </View>
  )
}

export default TypedentCard

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
})
