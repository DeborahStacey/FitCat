import React, { Component } from 'react'
import { Platform, Linking } from 'react-native'
import RootContainer from './RootContainer'
import DebugSettings from '../Config/DebugSettings'
import SafariView from 'react-native-safari-view'
import { default as OAuthManager } from '../Services/OAuthManager'
import '../I18n/I18n'

if (__DEV__) {
  // If ReactNative's yellow box warnings are too much, it is possible to turn
  // it off, but the healthier approach is to fix the warnings.  =)
  console.disableYellowBox = !DebugSettings.yellowBox
}

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentDidMount () {
    if (Platform.OS === 'ios') {
      // Event listeners only work on iOS apparently
      Linking.addEventListener('url', this.handleDeepLinkIOS.bind(this))
    } else {
      // TODO: Handle promise rejection where url = null (i.e. launching the app normally)
      Linking.getInitialURL().then(url => {
        if (this.parseDeepLinkRoute(url) === 'oauth-callback') {
          OAuthManager.parseFitbitAuthResponse(url)
        }
      })
    }
  }

  componentWillUnmount () {
    Linking.removeEventListener('url', this.handleDeepLinkIOS)
  }

  handleDeepLinkIOS (e) {
    // TODO: Handle promise rejection where e.url = null (i.e. launching the app normally)
    if (this.parseDeepLinkRoute(e.url) === 'oauth-callback') {
      if (SafariView.isAvailable()) {
        SafariView.dismiss()
      }

      OAuthManager.parseFitbitAuthResponse(e.url)
    }
  }

  /**
   * Strips out the scheme from the url returned with from a deep link
   * and returns the identifier before the first hash.
   *
   * Example: "fitcat://oauth-callback#access-token..." => "oauth-callback"
   */
  parseDeepLinkRoute (url) {
    return url.replace(/.*?:\/\//g, '').split('#')[0]
  }

  render () {
    return (
      <RootContainer />
    )
  }
}

export default App
