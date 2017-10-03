import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {receiveEntries, addEntry} from '../actions'
import {timeToString, getDailyReminderValue} from '../utils/helpers'
import {fetchCalendarResults} from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'
import DateHeader from './DateHeader'
import MetricCard from './MetricCard'
import styles from '../styles/base'

import {AppLoading} from 'expo'

class History extends React.Component {
  state = {ready: false}
  componentDidMount() {
    const {dispatch} = this.props
    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({entries}) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()] : getDailyReminderValue()
          }))
        }
      }).then(
        () => this.setState(
          () => ({ready: true})
        )
      )
  }

  renderItem = ({today, ...metrics}, formattedDate, key) => (
    <View style={styles.dateItem} >
      {today
      ? <View>
          <DateHeader date={formattedDate} />
          <Text style={styles.noDataText}>
            {today}
          </Text>
        </View>
      : <TouchableOpacity onPress={() => console.log("pressed")} >
          <MetricCard date={formattedDate} metrics={metrics} />
        </TouchableOpacity>
      }
    </View>
  )

  renderEmptyDate(formattedDate) {
    return(
      <View style={styles.dateItem}>
        <DateHeader date={formattedDate} />
        <Text style={styles.noDataText}>
          You didn't log any data on this day.
        </Text>
      </View>
    )
  }

  render() {
    const {ready} = this.state
    const {entries} = this.props
    if (ready === false) {
      return <AppLoading />
    }
    return(
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        />
    )
  }
}

function mapStateToProps (entries) {
  return {entries}
}
export default connect(mapStateToProps)(History)