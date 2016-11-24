import { AsyncStorage } from 'react-native'
import I18n from 'react-native-i18n'
import { default as AppConfig } from '../Config/AppConfig'
import Moment from 'moment'
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

  signUp: (fName, lName, email, password, street, unit, city, pCode, locationId) => {
    let wellcatSignupUrl = `${AppConfig.WELLCAT_BASE}/user/register`

    return fetch(wellcatSignupUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        firstName: `${fName}`,
        lastName: `${lName}`,
        address: {
          street: `${street}`,
          unit: `${unit}`,
          city: `${city}`,
          postalCode: `${pCode}`,
          locationID: locationId
        }
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

  getCountries: () => {
    let wellcatCountriesUrl = `${AppConfig.WELLCAT_BASE}/address/countries`

    return fetch(wellcatCountriesUrl, {
      method: 'GET'
    }).then((response) => {
      var body = response._bodyText
      var bodyObj = JSON.parse(body)
      if (response.ok) {
        return { code: 1, content: bodyObj.countries }
      }
      return { code: 0, content: bodyObj.error }
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

  getActiveCat: () => {
    let wellcatGetPetsUrl = `${AppConfig.WELLCAT_BASE}/fitcat/view/10`

    return fetch(wellcatGetPetsUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        return JSON.parse(response._bodyText)
      }
    }).catch((error) => {
      return { code: -1, content: error }
    })
  },

  updateWeight: () => {
    let wellcatUpdateWeightUrl = `${AppConfig.WELLCAT_BASE}/fitcat/weight`

    return fetch(wellcatUpdateWeightUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'petID': 10,
        'weight': 11.6,
        'date': Moment().format('YYYY[-]MM[-]DD')
      })
    }).then((response) => {
      console.log(response)
      if (response.ok) {
        console.log(response)
        return
      }
    }).catch((error) => {
      console.log(error)
      return { code: -1, content: error }
    })
  },

  addCat: async (cat) => {
    let wellcatUrl = `${AppConfig.WELLCAT_BASE}/fitcat/register`

    return fetch(wellcatUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        petID: cat.petid
      })
    }).then((response) => {
      if (response.ok) {
        try {
          AsyncStorage.setItem(StorageKeys.CAT_ID, cat.petid.toString())
          AsyncStorage.setItem(StorageKeys.CAT_NAME, cat.name.toString())
        } catch (error) {
          console.error('Error saving to AsyncStorage', error)
        }
      } else {
        console.error(response)
      }
    }).catch((error) => {
      console.error(error)
    })
  }
}
