import React from 'react';
import {View} from 'react-native';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import History from './components/History'
import reducer from  './reducers'


export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{height: 20}}/>
          <History />
        </View>
      </Provider>
    );
  }
}