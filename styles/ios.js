import React from 'react'
import {StyleSheet} from 'react-native'
import {white, purple} from '../utils/colors'

const iosStyles = StyleSheet.create({
  submitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 10,
    marginRight: 10
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

export default iosStyles