import { AsyncStorage, Platform } from 'react-native'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { default as AppConfig } from '../Config/AppConfig'
import { default as StorageKeys } from '../Config/StorageKeys'
import { default as Helpers } from './Helpers'

import { parse as qsparse } from 'querystringify'

module.exports = {

  /**
   * Launches a browser to authenticate with FitBit. After authorization, the app will
   * be redirected to wherever redirect_uri says so, which we pick up over in App.js
   * before processing in parseFitbitAuthResponse below.
   */
  authorizeFitbitAccount: () => {
    let fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=token` +
      `&client_id=${AppConfig.FITBIT_APP_ID}` +
      `&redirect_uri=${AppConfig.FITBIT_CALLBACK_URI}` +
      `&scope=${AppConfig.FITBIT_SCOPE}` +
      `&expires_in=${AppConfig.FITBIT_EXPIRATION}` +
      `&state=${AppConfig.FITBIT_STATE}`

    if (Platform.OS === 'ios') {
      Helpers.openLinkSafariView(fitbitAuthUrl)
    } else if (Platform.OS === 'android') {
      Helpers.openLinkChromeTabs(fitbitAuthUrl)
    } else {
      Helpers.openLinkExternally(fitbitAuthUrl)
    }
  },

  /**
   * Parses the data returned from FitBit upon app authentication and saves it to storage.
   * Called as part of the callback FitBit returned the application to.
   */
  parseFitbitAuthResponse: async (responseData) => {
    // TODO: Maybe improve how getting the query string is handled
    let queryString = responseData.replace(/.*?:\/\/oauth-callback#/g, '')

    // Create an object containing the key-value pairs for the query string
    // Keys are: access_token, user_id, scope, state, token_type, expires_in
    let qsParts = qsparse(queryString)

    try {
      await AsyncStorage.setItem(StorageKeys.FITBIT_ACCESS_TOKEN, qsParts.access_token)
      await AsyncStorage.setItem(StorageKeys.FITBIT_USER_ID, qsParts.user_id)

      NavigationActions.refresh({fitbitupdate: true})
    } catch (error) {
      console.error('Error saving to AsyncStorage', error)
    }
  }

}
