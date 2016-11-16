import { AsyncStorage } from 'react-native'
import { default as StorageKeys } from '../Config/StorageKeys'

module.exports = {
  fetchDeviceData: async () => {
    let accessToken = await AsyncStorage.getItem(StorageKeys.FITBIT_ACCESS_TOKEN)

    return fetch(`https://api.fitbit.com/1/user/-/devices.json`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.length !== 0) {
        return responseJson
      }
      return {}
    })
  }
}
