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
  },
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
  },
  btnLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  btnRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
})

export default iosStyles