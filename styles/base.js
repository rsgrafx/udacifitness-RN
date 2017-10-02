import React from 'react'
import {Platform, StyleSheet} from  'react-native'

import {white, purple} from '../utils/colors'
import androidStyles from './android'
import iosStyles from './ios'

let styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  }
})

if (Platform.OS === 'ios') {
   styles = {...styles, ...iosStyles}
} else {
  styles = {...styles, ...androidStyles}
}

export default styles


