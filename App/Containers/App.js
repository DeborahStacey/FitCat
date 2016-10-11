import React, { Component } from 'react'
import { Platform, Linking } from 'react-native'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import DebugSettings from '../Config/DebugSettings'
import { Actions as NavigationActions } from 'react-native-router-flux'
import '../I18n/I18n'

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = !DebugSettings.yellowBox
}

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentDidMount () {
    if (Platform.OS === 'ios') {
      // Event listeners only work on iOS apparently
      Linking.addEventListener('url', this.handleDeepLink)
    } else {
      Linking.getInitialURL().then(url => {
        if (url) {
          const route = url.replace(/.*?:\/\//g, '')
          console.log(route)

          // TODO
          NavigationActions.deviceInfo()
        }
      })
    }
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleDeepLink)
  }

  handleDeepLink (e) {
    const route = e.url.replace(/.*?:\/\//g, '')
    console.log(route)

    // TODO
    NavigationActions.deviceInfo()
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
