import React from 'react'
import {Text} from 'react-native'
import styles from '../styles/base'

export default function DateHeader ({date}) {
  return(<Text style={styles.dateHelper}>{date}</Text>)
}