import React, {Component} from  'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import MetricCard from  './MetricCard'
import styles from '../styles/base'

class EntryDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const {entryId} = navigation.state.params

    const year = entryId.slice(0, 4)
    const month = entryId.slice(5,7)
    const day = entryId.slice(8)

    return { title: `${year}/${month}/${day}`}

  }
  render() {
    const {metrics} = this.props
    return(
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
      </View>
    )
  }
}

const mapStateToProps = (state, {navigation}) => {
  const {entryId} = navigation.state.params
  return {
    entryId,
    metrics: state[entryId]
  }
}
export default connect(mapStateToProps)(EntryDetail)