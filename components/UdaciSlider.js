import React, { Component } from  'react'
import {View, Text, Slider} from 'react-native'

 const UdaciSlider = ({max, unit, step, onChange, value}) => {
  return(
    <View>
      <Slider
        value={value}
        minimumValue={0}
        maximumValue={max}
        step={step}
        onValueChange={onChange}
      />
      <View>
        <Text>{value} : {unit}</Text>
      </View>
    </View>
    )
}

export default UdaciSlider