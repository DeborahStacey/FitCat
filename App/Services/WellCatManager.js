import { AsyncStorage } from 'react-native'
import I18n from 'react-native-i18n'
import { default as AppConfig } from '../Config/AppConfig'
import { default as StorageKeys } from '../Config/StorageKeys'

module.exports = {

  login: (email, password) => {
    let wellcatLoginUrl = `${AppConfig.WELLCAT_BASE}/user/login`

    return fetch(wellcatLoginUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`
      })
    }).then((response) => {
      if (response.ok) {
        return { code: 1, content: '' }
      }
      var body = response._bodyText
      var bodyObj = JSON.parse(body)
      var message = bodyObj.error
      return { code: 0, content: message }
    }).catch((error) => {
      return { code: -1, content: error }
    })
  },

  fetchCatsList: () => {
    let wellcatUrl = `${AppConfig.WELLCAT_BASE}/pet/pets`

    return fetch(wellcatUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json()).then((responseJson) => {
      if (responseJson.length !== 0) {
        let catsList = []
        catsList[I18n.t('personal_cats')] = responseJson.personal
        catsList[I18n.t('shared_cats')] = responseJson.shared

        return catsList
      }
      return {}
    })
  },

  // TODO
  addCat: async (catId) => {
    try {
      await AsyncStorage.setItem(StorageKeys.CAT_ID, catId.toString())
    } catch (error) {
      console.error('Error saving to AsyncStorage', error)
    }
  }
}
