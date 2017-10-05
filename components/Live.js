import React, {Component} from 'react'
import {View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native'

import {Location, Permissions} from 'expo'
import {calculateDirection} from '../utils/helpers'

import {Foundation} from '@expo/vector-icons'
import {purple, white} from '../utils/colors'
import styles from '../styles/LiveStyle'

const renderActivity = () => {
  return(<ActivityIndicator style={{marginTop: 20}} />)
}

class Live extends Component {
  state = {
    coords: {},
    status: 'granted',
    direction: '',
    bounceValue: new Animated.Value(1)
  }

  askPermission = () => {
    Permissions.askAsync(Permissions.LOCATION)
      .then(({status}) => {
        if (status === 'granted') {
          return this.setLocation()
        }
        this.setState(() => ({status}))
      })
  }

  setLocation = () => {
    Location.watchPositionAsync({
      enableHighAccuracy: true,
      timeInterval: 1,
      distanceInterval: 1
    },
    ({coords}) => {
      const newDirection = calculateDirection(coords.heading)
      const {direction, bounceValue} = this.state

      if (newDirection !== direction) {
        Animated.sequence([
          Animated.timing(bounceValue, {duration: 300, toValue: 1.08}),
          Animated.spring(bounceValue, {toValue: 1, friction: 4})
        ]).start()
      }

      this.setState(() => ({
        coords,
        status: 'granted',
        direction: newDirection
      }))
    })
  }

  componentDidMount () {
    Permissions.getAsync(Permissions.LOCATION)
      .then(({status}) => {
        if (status === 'granted') {
          return this.setLocation()
        }
        this.setState(() => ({status}))
      })
      .catch(
        (error) => this.setState(
          () => ({status: 'undetermined'})
        )
      )
  }

  render() {
    const { coords, status, direction, bounceValue } = this.state

    if (status === null) {
      return renderActivity()
    }

    if (status === 'denied') {
      return(
      <View style={styles.center}>
        <Foundation name='alert' size={50} />
        <Text>You denied this app the ability to know your location. You can fix this by visiting your settings and enabling location services for this app.</Text>
      </View>
      )
    }

    if (status === 'undetermined') {
      return(
      <View style={styles.center}>
        <Foundation name='alert' size={50} />
        <Text>You need to enable location services for this app</Text>
        <TouchableOpacity onPress={this.askPermission} style={styles.button }>
          <Text style={styles.buttonText}>Enable Location Services</Text>
        </TouchableOpacity>
      </View>
      )
    }

    return(
      <View style={styles.container}>
        <View style={styles.directionContainer}>
          <Text style={styles.header}>
            You are heading:
          </Text>
          <Animated.Text
            style={[styles.direction, {transform: [{scale: bounceValue}]} ]}>
            {direction}
          </Animated.Text>
        </View>
        <View style={styles.metricContainer}>
          <View style={styles.metric}>
            <Text style={[styles.header, {color: white}]}>
              Altitude
            </Text>
            <Text style={[styles.header, {color: white}]}>
              {Math.round(coords.altitude * 3.2808) } Feet
            </Text>
          </View>
          <View style={[styles.metric, {justifyContent: 'center'}]}>
            <Text style={[styles.header, {color: white}]}>
              Speed
            </Text>
            <Text style={[styles.header, {color: white}]}>
              {(coords.speed * 2.2369).toFixed(1)} MPH
            </Text>
          </View>
        </View>
      </View>
    )

  }
}

export default Live