import { Linking } from 'react-native'
import { default as config } from '../../config.js'

export default {

  /**
   * Launches a browser to authenticate with FitBit. After authorization, the app will
   * be redirected to wherever redirect_uri says so, which we pick up over in App.js
   * before processing in parseFitbitAuthResponse below.
   */
  authorizeFitbitAccount: () => {
    let fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=token` +
      `&client_id=${config.fitbit_app_id}` +
      `&redirect_uri=${config.fitbit_callback_uri}` +
      `&scope=${config.fitbit_scope}` +
      `&expires_in=${config.fitbit_expiration}` +
      `&state=${config.fitbit_state}`

    Linking.openURL(fitbitAuthUrl).catch(err => console.err('An error occurred', err))
  },

  parseFitbitAuthResponse: (responseData) => {
    console.info(responseData)
  }

}
