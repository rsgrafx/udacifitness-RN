import React from 'react'
import {Platform, StyleSheet} from  'react-native'

import {white, purple} from '../utils/colors'
import androidStyles from './android'
import iosStyles from './ios'

let styles = StyleSheet.create({
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  dateItem: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 10 : 2,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.26)',
    shadowOffset: {
      width: 0,
      height: 3,
    }
  },
  reset: {
    textAlign: 'center',
    color: purple
  },
  dateHelper: {
    color: purple,
    fontSize: 25
  },
  sliderStyle: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
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
  },
  row: {},
  metricCounter: {
    width: 85,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

if (Platform.OS === 'ios') {
   styles = {...styles, ...iosStyles}
} else {
  styles = {...styles, ...androidStyles}
}

export default styles


