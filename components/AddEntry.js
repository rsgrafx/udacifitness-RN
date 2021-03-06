import React, { Component  } from 'react'
import {View, Text, TouchableOpacity, Platform} from 'react-native'
import  {connect} from 'react-redux'
import styles from '../styles/base'
import {NavigationActions} from 'react-navigation'


import {
  getMetricsMetaInfo,
  timeToString,
  getDailyReminderValue
} from  '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './DateHeader'
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton'
import {submitEntry, removeEntry} from '../utils/api'
import {addEntry} from '../actions'

function SubmitBtn ({onPress}) {
  return(
    <TouchableOpacity
      onPress={onPress}
      style={styles.submitBtn}>
      <Text
        style={styles.btnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0
  }

  increment = (metric) => {
    const {max, step} = getMetricsMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step
      return {...state,
        [metric]: count > max
        ? max
        : count
      }
    })
  }

  decrement = (metric) => {
    const {max, step} = getMetricsMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] - getMetricsMetaInfo(metric).step
      return {
        ...state,
        [metric]: count < 0
        ? 0
        : count
      }
    })
  }

  slide  = (metric, value) => {
    this.setState(() => ({[metric]: value}))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.setState({
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
      })

      this.props.dispatch(addEntry({
      [key]: entry
    }))
    // Navigate to Home
    submitEntry({key, entry})
    this.toHome()
  }

  reset = () => {
    const key = timeToString()

    this.props.dispatch(addEntry({
      [key]: getDailyReminderValue()
    }))
    // Rout to Home
    removeEntry(key)
    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry'
    }))
  }
  render() {
    const metaInfo = getMetricsMetaInfo()
    if (this.props.alreadyLogged) {
      return (<View style={styles.center}>
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
          size={100}
          />
          <Text>You already logged your information for today</Text>
          <TextButton
            style={{padding: 10}}
            onPress={this.reset}>
            Reset
          </TextButton>
      </View>)
    }
    return(
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()} />
        {Object.keys(metaInfo).map((key) => {
          const {getIcon, type, ...rest} = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider'
              ? <UdaciSlider
                  value={value}
                  onChange={(value) => this.slide(key, value)}
                  {...rest}
                  />
              : <UdaciStepper
                  value={value}
                  onIncrement={() => this.increment(key) }
                  onDecrement={() => this.decrement(key) }
                  {...rest}
                />}
            </View>)
        })
       }
       <SubmitBtn onPress={this.submit}/>
      </View>)
  }
}

function mapStateToProps (state) {
  const key = timeToString()
  return {
    alreadyLogged: state[key] && (typeof state[key].today === 'undefined')
  }
}

export default connect(mapStateToProps)(AddEntry)