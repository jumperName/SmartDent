import React from 'react'
import { Button, Card, Title, Paragraph } from 'react-native-paper'
import { StyleSheet, Image } from 'react-native'
import moment from 'moment'

const ReportDental = props => {
  const backIcon = require('../src/assets/images/register/back.png')
  const background = require('../src/assets/images/register/background.png')
  const personIcon = require('../src/assets/images/register/signup_person.png')
  const lockIcon = require('../src/assets/images/register/signup_lock.png')
  const idcard = require('../src/assets/images/register/idcard.png')
  const calling = require('../src/assets/images/register/calling.png')
  const clock = require('../src/assets/images/register/clock.png')
  const DateTime = require('../src/assets/images/register/DateTime.png')
  const line = require('../src/assets/images/register/line.png')

  return (
    <Card style={styles.ContentCard}>

       <Card.Content>
        <Title style={styles.containerCard ,{color: 'black'}}>
         ลำดับ {props.index}
        </Title>
      </Card.Content>
      <Card.Content>
        <Title style={styles.containerCard}>
          <Image
            source={personIcon}
            style={styles.inputIcon}
            resizeMode="contain"
          />
            <Card.Content style={styles.ParagraphStyle}>
              <Paragraph style={{ fontSize: 18, color:'black' }}>
          {''}{props.getAppoint.firstname}   {props.getAppoint.lastname}
          </Paragraph>
          </Card.Content>
        </Title>
      </Card.Content>

     <Card.Content style={styles.ParagraphStyle}>
      <Paragraph style={{ fontSize: 18, color:'black' }}>
          <Image
            source={idcard}
            style={styles.inputIcon}
            resizeMode="contain"
          />
            {' '}{props.getAppoint.cid} 
        </Paragraph>
      </Card.Content>
      <Card.Content style={styles.ParagraphStyle}>
      <Paragraph style={{ fontSize: 18, color:'black' }}>
          <Image
            source={calling}
            style={styles.inputIcon}
            resizeMode="contain"
          />
             {' '}{props.getAppoint.tel}
        </Paragraph>
      </Card.Content>

      <Card.Content style={styles.ParagraphStyle}>   
      <Paragraph style={{ fontSize: 18, color:'green' }}>
      **นัดจองคิวทำฟันวันที่ :           
           {' '}{moment(props.getAppoint.app_date)
            .add(543, 'year')
            .format('DD-MM-YYYY')} **
        </Paragraph>
      </Card.Content>

      <Card.Content style={styles.ParagraphStyle}>
      <Paragraph style={{ fontSize: 18, color:'black' }}>
          <Image source={clock} style={styles.inputIcon} resizeMode="contain" />
          {' '} {props.getAppoint.app_time}
        </Paragraph>
      </Card.Content>

            
      <Card.Content style={styles.ParagraphStyle}>
        <Paragraph style={{ fontSize: 18, color:'black' }}>
          <Image source={line} style={styles.inputIcon} resizeMode="contain" />
          {' '} {props.getAppoint.app_line}
        </Paragraph>
      </Card.Content>

      <Card.Content style={styles.ParagraphStyle}>   
      <Paragraph style={{ fontSize: 17, color:'red' }}>
      จองคิวผ่าน Mobile Application วันที่           
           {' '}{moment(props.getAppoint.timestamp)
            .add(543, 'year')
            .format('DD-MM-YYYY')} 
        </Paragraph>
      </Card.Content>
      
    </Card>
  )
}

export default ReportDental

const styles = StyleSheet.create({
  containerCard: {
  flex:1,
  },
  ContentCard: {
    backgroundColor: 'white',
   
  },
  inputIcon: {    
    width: 25,
    height: 25,
  },
  ParagraphStyle:{
    padding:2,
    marginTop:5,
    fontSize: 15,
     color:'black'
  }
})
