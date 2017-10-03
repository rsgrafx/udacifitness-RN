import React from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {TabNavigator} from 'react-navigation'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {Constants} from 'expo'

import History from './components/History'
import AddEntry from './components/AddEntry'
import reducer from  './reducers'
import {purple, white} from './utils/colors'

const isIOS = Platform.OS === 'ios'

const CustomStatusBar  = ({backgroundColor, ...props}) => {
  return(
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
},
{ navigationOptions: {
  header: null
  },
  tabBarOptions: {
  activeTintColor: isIOS ? purple : white,
  style: {
    height: 56,
    backgroundColor: isIOS ? white : purple,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0, height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 3
  }
}})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={purple} barStyle='light-content' />
          <Tabs />
        </View>
      </Provider>
    );
  }
}