import React from 'react'
import {StyleSheet} from 'react-native'
import {white, purple} from '../utils/colors'

const androidStyles = StyleSheet.create({
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end'
  },
  btnText: {
    color: 'yellow',
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: 'red'
  },
  btn: {
    margin: 5,
    backgroundColor: purple,
    padding: 10,
    borderRadius: 2
  }
})

export default androidStyles
