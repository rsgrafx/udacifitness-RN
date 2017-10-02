import React, { Component } from  'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {FontAwesome, Entypo} from '@expo/vector-icons'
import {gray, purple} from '../utils/colors'

import styles from '../styles/base'

 const UdaciStepper = ({max, unit, st3eop, value, onIncrement, onDecrement}) => {
  return(
    <View style={styles.row}>
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={[styles.btn, styles.btnLeft]}
        onPress={onDecrement}>
        <FontAwesome
          name='minus'
          size={30}
          color={purple} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.btnRight]}
        onPress={onIncrement}>
        <FontAwesome
          name='plus'
          size={30}
          color={purple} />
      </TouchableOpacity>
      </View>
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
    )
}

export default UdaciStepper