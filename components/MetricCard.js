import React from 'react'
import {View, StyleSheet, Text} from 'react-native'

import DateHeader from './DateHeader'
import {getMetricsMetaInfo} from '../utils/helpers'

export default function MetricCard ({date, metrics}) {
  return(
    <View>
      {date && <DateHeader date={date} />}
      {Object.keys(metrics).map((metric) => {
        const {getIcon, displayName, unit, backgroundColor} = getMetricsMetaInfo(metric)
        return(
          <View style={mStyle.metric} key={metric}>
            {getIcon()}
            <View>
              <Text style={{fontSize: 20}}>
                {displayName}
              </Text>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const mStyle = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12
  }
})