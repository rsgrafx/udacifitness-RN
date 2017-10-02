import React, { Component } from  'react'
import {View, Text, Slider} from 'react-native'
import styles from '../styles/base'
import {gray} from '../utils/colors'

 const UdaciSlider = ({max, unit, step, onChange, value}) => {
  return(
    <View style={styles.row}>
      <Slider
        style={{flex: 1}}
        value={value}
        minimumValue={0}
        maximumValue={max}
        step={step}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
    )
}

export default UdaciSlider