import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import {receiveEntries, addEntry} from '../actions'
import {timeToString, getDailyReminderValues} from '../utils/helpers'
import {fetchCalendarResults} from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'

class History extends Component {
  componentDidMount() {
    const {dispatch} = this.props
    fetchCalendarResults()
      .then((entries) => dispatch(receiveEntries(entries)))
      .then(({entries}) => {
        if (!entries[timeToString()]) {
          dispatch(addEntry({
            [timeToString()] : getDailyReminderValues()
          }))
        }
      })
  }

  renderItem = ({today, ...metrics}, formattedDate, key) => (
    <View>
      {today
      ? <Text>{JSON.stringify(today)} </Text>
      : <Text>{JSON.stringify(metrics)}</Text>}
    </View>
  )

  renderEmptyDate = (formattedDate) => {
    return(
      <View>
        <Text>{JSON.stringify(this.props)}</Text>
        <Text>No Data for this day</Text>
      </View>
    )
  }

  render() {
    const {entries} = this.props
    return(
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        />
    )
  }
}


export default connect(entries => ({entries}))(History)